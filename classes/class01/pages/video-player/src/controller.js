export default class Controller {
    #view
    #camera
    #service
    #worker
    #blinkCounter = 0

    constructor({ view, service, worker, camera }) {
        this.#view = view
        this.#camera = camera
        this.#worker = this.#configureWorker(worker)

        this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
    }

    static async initialize(deps) {
        const controller = new Controller(deps)
        controller.log("not yet detecting eye!")
        return controller.init()
    }

    #configureWorker(worker) {
        let ready = false

        worker.onmessage = ({ data }) => {
            if ('READY' === data) {
                console.log("worker is ready")
                this.#view.enableButton()
                ready = true
                return;
            }

            this.#blinkCounter += 1
            this.#view.togglePlayVideo()

        }

        return {
            send(msg) {
                if (!ready) return;
                worker.postMessage(msg)
            }
        }
    }


    async init() {
        console.log('init')
    }

    loop() {
        const video = this.#camera.video
        const img = this.#view.getVideoFrame(video)

        this.#worker.send(img)
        this.log("detecting eye blink...")

        setTimeout(() => this.loop(), 100);
    }

    log(text) {
        const times = `                 - blinked times: ${this.#blinkCounter}`
        this.#view.log(`status: ${text}`.concat(times))
    }

    onBtnStart() {
        this.log("Initializing detection...")
        this.#blinkCounter = 0
        this.loop()
    }
}