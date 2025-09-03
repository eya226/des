# Gothic Backend

This is the backend for the Gothic E-commerce project. It is a Flask application that provides an API for the frontend.

## Setup

1.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

2.  **Activate the virtual environment:**
    -   On Windows:
        ```bash
        .\\venv\\Scripts\\activate
        ```
    -   On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```

3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Create a `.env` file:**
    Copy the `.env.example` file to a new file named `.env` and fill in the required environment variables.
    ```bash
    cp .env.example .env
    ```

5.  **Run the application:**
    ```bash
    flask run
    ```

The application will be running at `http://127.0.0.1:5000`.
