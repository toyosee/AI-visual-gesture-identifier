const startBtn = document.getElementById("startButton");
const gesture = document.getElementById("gesture");
const video = document.getElementById("video");
const computerResult = document.getElementById("gameResult");

// URL of the trained model
const modelUrl = "https://teachablemachine.withgoogle.com/models/jod6uXpu-O/model.json";
let userChoice = "";

// Create Image Classifier
let classifier = ml5.imageClassifier(modelUrl, modelLoaded);

// Function to indicate the model has loaded and start the video
function modelLoaded() {
    console.log("Model Loaded");
    startVideo();
}

// Start the video stream
async function startVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
    classifyGesture();
}

// Classify the gesture
function classifyGesture() {
    classifier.classify(video, (results) => {
        userChoice = results[0].label;
        gesture.innerHTML = `You are holding up: <strong>${userChoice}</strong> fingers`;
        classifyGesture();
    });
}

// Event listener for the start button
startBtn.addEventListener("click", () => {
    identifyGesture(userChoice);
});

// Function to handle the result of the gesture classification
// This function uses a switch case to map gesture seen to number count
function identifyGesture(userChoice) {
    let result = "";

    switch (userChoice) {
        case "One":
            result = "I can see 1";
            break;
        case "Two":
            result = "I can see 2";
            break;
        case "Three":
            result = "I can see 3";
            break;
        case "Four":
            result = "I can see 4";
            break;
        case "Five":
            result = "I can see 5";
            break;
        default:
            result = "I am unable to identify your gesture at this time. Train me.";
    }
    // Showing result in console
    console.log(result)

    computerResult.innerText = result;
}
