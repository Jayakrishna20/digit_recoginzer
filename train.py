import pandas as pd
import numpy as np
import pickle
from model_utils import gradient_descent


def train_model():
    print("Loading data...")
    data = pd.read_csv("data/train.csv")
    data = np.array(data)
    m, n = data.shape
    np.random.shuffle(data)

    # Split into dev and training sets
    # Taking first 1000 for dev (validation)
    data_dev = data[0:1000].T
    X_dev = data_dev[1:n]
    X_dev = X_dev / 255.0

    data_train = data[1000:m].T
    Y_train = data_train[0]
    X_train = data_train[1:n]
    X_train = X_train / 255.0

    print(f"Training on {X_train.shape[1]} examples...")

    # Train the model
    # Matches notebook parameters: alpha=0.10, iterations=500
    W1, b1, W2, b2 = gradient_descent(X_train, Y_train, 0.10, 500)

    print("Training complete.")

    # Save the model
    model_data = {"W1": W1, "b1": b1, "W2": W2, "b2": b2}

    with open("model.pkl", "wb") as f:
        pickle.dump(model_data, f)

    print("Model saved to model.pkl")


if __name__ == "__main__":
    train_model()
