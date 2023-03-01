const { GestureDescription, Finger, FingerCurl } = window.fp

const ScrollDownGesture = new GestureDescription('scroll-down') // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up') // 🖐
const HangLooseGesture = new GestureDescription('hang-loose') //🤙


// Scroll Down
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
  ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}


// ScrollUp
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0)
}


//HangLoose
//-----------------------------------------------------------------------------
//thumb: NoCurl
//Pinky: NoCurl
//All other fingers: half with lower confidence and full curl with high confidence

HangLooseGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
HangLooseGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  HangLooseGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
  HangLooseGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}



const knownGestures = [
  ScrollDownGesture,
  ScrollUpGesture,
  HangLooseGesture
]

const gestureStrings = {
  'scroll-up': '🖐',
  'scroll-down': '✊️',
  'hang-loose': '🤙'
}

export {
  knownGestures,
  gestureStrings
}