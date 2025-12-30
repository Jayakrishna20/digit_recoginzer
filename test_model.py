import numpy as np
import pickle
from model_utils import forward_prop, get_predictions

def test_inference():
    print("Testing model inference...")
    
    # Load model
    try:
        with open("model.pkl", "rb") as f:
            model_data = pickle.load(f)
            W1 = model_data["W1"]
            b1 = model_data["b1"]
            W2 = model_data["W2"]
            b2 = model_data["b2"]
        print("Model loaded.")
    except Exception as e:
        print(f"Failed to load model: {e}")
        return

    # Create dummy input (784, 1)
    X = np.random.rand(784, 1)
    
    # Run forward prop
    try:
        Z1, A1, Z2, A2 = forward_prop(W1, b1, W2, b2, X)
        pred = get_predictions(A2)
        print(f"Prediction for random input: {pred[0]}")
        print(f"Output probabilities shape: {A2.shape}")
        print("Inference test passed.")
    except Exception as e:
        print(f"Inference failed: {e}")

if __name__ == "__main__":
    test_inference()
