const video2 = document.getElementsByClassName('input_video2')[0];
const out2 = document.getElementsByClassName('output2')[0];
const controlsElement2 = document.getElementsByClassName('control2')[0];
const canvasCtx = out2.getContext('2d');


const solutionOptions = {
  selfieMode: true,
  enableFaceGeometry: false,
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
};

const fpsControl = new FPS();
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
  spinner.style.display = 'none';
};

// Initial value for the Normalized Focal Length
const focalLengthSlider = document.getElementById('focalLengthSlider');
const focalLengthOutput = document.getElementById('focalLengthOutput');
let normalizedFocalLength = 1.3;
focalLengthSlider.addEventListener('input', (event) => {
  // Update the Normalized Focal Length value
  normalizedFocalLength = parseFloat(event.target.value);
  // Update the output display
  focalLengthOutput.textContent = normalizedFocalLength.toFixed(1);
});

function onResultsFaceMesh(results) {
  document.body.classList.add('loaded');
  fpsControl.tick();
  var width = results.image.width;
  var height = results.image.height;
  var irisLeftMinX = -1;
  var irisLeftMaxX = -1;
  var irisRightMinX = -1;
  var irisRightMaxX = -1;
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, out2.width, out2.height);
  canvasCtx.drawImage(
      results.image, 0, 0, out2.width, out2.height);
      
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {

      for (const point of FACEMESH_LEFT_IRIS) {
        var point0 = landmarks[point[0]];
        if (irisLeftMinX == -1 || point0.x * width < irisLeftMinX) {
          irisLeftMinX = point0.x * width;
        }
        if (irisLeftMaxX == -1 || point0.x * width > irisLeftMaxX) {
          irisLeftMaxX = point0.x * width;
        }
      }

      for (const point of FACEMESH_RIGHT_IRIS) {
        var point0 = landmarks[point[0]];
        if (irisRightMinX == -1 || point0.x * width < irisRightMinX) {
          irisRightMinX = point0.x * width;
        }
        if (irisRightMaxX == -1 || point0.x * width > irisRightMaxX) {
          irisRightMaxX = point0.x * width;
        }
      }
      // drawConnectors(
      //     canvasCtx, landmarks, FACEMESH_TESSELATION,
      //     {color: '#C0C0C070', lineWidth: 1});
      // drawConnectors(
      //     canvasCtx, landmarks, FACEMESH_RIGHT_EYE,
      //     {color: '#FF3030'});
      // drawConnectors(
      //     canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW,
      //     {color: '#FF3030'});
      // drawConnectors(
      //     canvasCtx, landmarks, FACEMESH_LEFT_EYE,
      //     {color: '#30FF30'});
      // drawConnectors(
      //     canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW,
      //     {color: '#30FF30'});
      // drawConnectors(
      //     canvasCtx, landmarks, FACEMESH_FACE_OVAL,
      //     {color: '#E0E0E0'});
      // drawConnectors(
      //     canvasCtx, landmarks, FACEMESH_LIPS,
      //     {color: '#E0E0E0'});
      drawConnectors(
            canvasCtx,
            landmarks,
            FACEMESH_LEFT_IRIS,
            { color: "#000000", lineWidth: 1 }
          );
      drawConnectors(
            canvasCtx,
            landmarks,
            FACEMESH_RIGHT_IRIS,
            { color: "#000000", lineWidth: 1 }
          );

    }
  }

  var Leftdx = irisLeftMaxX - irisLeftMinX;
  var Rightdx = irisRightMaxX - irisRightMinX;
  console.log(Leftdx,Rightdx)
  var dX = 11.7;

  // Logitech HD Pro C922	Norm focal
  // var normalizedFocaleX = 1.3 for c920 ; or 1.4 for c922
  // var fx = Math.min(width, height) * normalizedFocaleX;
  // var dZ = (fx * (dX / dx)) / 10.0;

  var fx = Math.min(width, height) * normalizedFocalLength;
  var leftdZ = (fx * (dX / Leftdx)) / 10.0;
  var rightdZ = (fx * (dX / Rightdx)) / 10.0;

  var dZ = (leftdZ+rightdZ) / 2
  dZ = dZ.toFixed(2);

  canvasCtx.fillStyle = "red";
  canvasCtx.font = "30px Arial";
  canvasCtx.fillText(dZ + " cm", width * 0.75, 50);
  canvasCtx.restore();
}

const faceMesh = new FaceMesh({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`;
}});
faceMesh.setOptions(solutionOptions);
faceMesh.onResults(onResultsFaceMesh);

const camera = new Camera(video2, {
  onFrame: async () => {
    await faceMesh.send({image: video2});
  },
  width: 400,
  height: 400
});
camera.start();

new ControlPanel(controlsElement2, {
      selfieMode: true,
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })
    .add([
      new StaticText({title: 'MediaPipe Face Mesh'}),
      fpsControl,
      new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
      new Slider({
        title: 'Max Number of Faces',
        field: 'maxNumFaces',
        range: [1, 4],
        step: 1
      }),
      new Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
      }),
      new Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
      }),
    ])
    .on(options => {
      video2.classList.toggle('selfie', options.selfieMode);
      faceMesh.setOptions(options);
    });