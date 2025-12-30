const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clear-btn");
const predictBtn = document.getElementById("predict-btn");
const resultArea = document.getElementById("result-area");
const predictionEl = document.getElementById("prediction");
const confidenceFill = document.getElementById("confidence-fill");
const confidenceText = document.getElementById("confidence-text");

let isDrawing = false;

// Initialize canvas
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "white";
ctx.lineWidth = 15;
ctx.lineCap = "round";
ctx.lineJoin = "round";

// Drawing events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Touch support
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener("touchend", () => {
  const mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
});

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

// Clear canvas
clearBtn.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  resultArea.classList.add("hidden");
});

// Predict
predictBtn.addEventListener("click", async () => {
  // We need to resize the canvas data to 28x28
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = 28;
  tempCanvas.height = 28;
  const tempCtx = tempCanvas.getContext("2d");

  // Draw the main canvas onto the smalled canvas
  tempCtx.drawImage(canvas, 0, 0, 28, 28);

  // Get pixel data
  const imageData = tempCtx.getImageData(0, 0, 28, 28);
  const data = imageData.data;
  const pixels = [];

  // Convert RGBA to Grayscale (just take Red channel or average)
  // Since we drew white on black, we want the intensity.
  for (let i = 0; i < data.length; i += 4) {
    // R=data[i], G=data[i+1], B=data[i+2], A=data[i+3]
    // Simple grayscale: (R+G+B)/3
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    pixels.push(avg);
  }

  try {
    predictBtn.textContent = "Processing...";
    predictBtn.disabled = true;

    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pixels: pixels }),
    });

    const result = await response.json();

    if (response.ok) {
      showResult(result);
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during prediction.");
  } finally {
    predictBtn.textContent = "Predict";
    predictBtn.disabled = false;
  }
});

function showResult(result) {
  resultArea.classList.remove("hidden");
  predictionEl.textContent = result.prediction;

  // Find the probability of the predicted digit
  const confidence = result.probabilities[result.prediction];
  const percentage = Math.round(confidence * 100);

  confidenceFill.style.width = `${percentage}%`;
  confidenceText.textContent = `${percentage}% Confidence`;
}
