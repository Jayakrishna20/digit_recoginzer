# Handwritten Digit Recognizer

A web-based application that recognizes handwritten digits drawn by the user. The underlying model is a Neural Network implemented from scratch using **NumPy**, without relying on high-level deep learning frameworks like TensorFlow or PyTorch for the core logic. The application is served using **Flask**.

## 🔴 Live Demo

**[Click here to view the live project](https://digit-recognizer-id62.onrender.com)**

## ✨ Features

- **Draw on Canvas:** Interactive HTML5 canvas for drawing digits.
- **Real-time Prediction:** Instant recognition of the drawn digit.
- **From-Scratch Implementation:** The neural network (forward propagation, backpropagation, gradient descent) is built using raw mathematics and NumPy.

## 🛠️ Technologies Used

- **Python**
- **Flask** (Web Framework)
- **NumPy** (Math & Matrix Operations)
- **HTML/CSS/JavaScript** (Frontend)

## 🚀 How to Run Locally

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/digit-recognizer.git
    cd digit-recognizer
    ```

2.  **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Application**
    ```bash
    python app.py
    ```
    The app will start at `http://127.0.0.1:5000/`.

## 📊 Dataset

The data used for training this model is from the [Digit Recognizer Kaggle Competition](https://www.kaggle.com/competitions/digit-recognizer/data).

## 🧠 Training the Model

The model is pre-trained and saved as `model.pkl`. If you wish to retrain it:

1.  Ensure you have `pandas` installed (it is required for training but not for the web app):
    ```bash
    pip install pandas
    ```
2.  Run the training script:
    ```bash
    python train.py
    ```
    This will load the data, train the neural network, and update `model.pkl`.

## 📂 Project Structure

- `app.py`: Flask application entry point.
- `model_utils.py`: Core neural network functions (ReLU, Softmax, Forward/Back Prop).
- `train.py`: Script to train the model.
- `static/`: CSS and JavaScript files.
- `templates/`: HTML templates.
