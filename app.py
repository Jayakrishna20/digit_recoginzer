from flask import Flask, render_template, request, jsonify
import numpy as np
import pickle
from model_utils import forward_prop, get_predictions

app = Flask(__name__)

# Load the model
try:
    with open("model.pkl", "rb") as f:
        model_data = pickle.load(f)
        W1 = model_data["W1"]
        b1 = model_data["b1"]
        W2 = model_data["W2"]
        b2 = model_data["b2"]
    print("Model loaded successfully.")
except FileNotFoundError:
    print("Model file not found. Please run train.py first.")
    W1, b1, W2, b2 = None, None, None, None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if W1 is None:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.json
    if 'pixels' not in data:
        return jsonify({"error": "No pixel data provided"}), 400

    # Frontend should send an array of 784 integers (0-255)
    pixels = np.array(data['pixels']).reshape(784, 1)
    
    # Preprocess: Normalize to 0-1
    # Note: Training data was normalized by dividing by 255.
    # We assume 'pixels' are 0-255 grayscale values where 0 is black and 255 is white?
    # Actually MNIST is white digit on black background usually, or vice versa?
    # Checks notebook: X_dev = X_dev / 255.
    # The notebook visualization shows white digit on black background?
    # Let's assume standard MNIST: 0 is background, 255 is foreground.
    
    X = pixels / 255.0

    # Forward propagation
    _, _, _, A2 = forward_prop(W1, b1, W2, b2, X)
    prediction = get_predictions(A2)
    
    # Get confidence/probabilities
    probs = A2.flatten().tolist()
    
    return jsonify({
        "prediction": int(prediction[0]),
        "probabilities": probs
    })

if __name__ == '__main__':
    app.run(debug=True)
