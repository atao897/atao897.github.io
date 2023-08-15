var distance;
var screenWidth;
var screenHeight;

function measureDistance(){
RemoteCalibrator.init({ id: 'session_022' })
RemoteCalibrator.measureDistance({}, data => {
  console.log(`The viewing distance is ${data.value}cm.`)
  distance = data.value
})
}

function getScreenSize(){
    RemoteCalibrator.init({ id: 'session_022' })
    RemoteCalibrator.screenSize({}, data => {
      console.log(`ScreenWidth: ${data.value.screenWidthCm}cm.`)
      console.log(`ScreenHeight: ${data.value.screenHeightCm}cm.`)
      screenWidth = data.value.screenWidthCm
      screenHeight = data.value.screenHeightCm
    })
}

function moveStim(){
  
}
