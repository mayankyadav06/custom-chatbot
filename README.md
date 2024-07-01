# Custom Chatbot using Langchain

## Project Description
This project involves creating a custom chatbot using Langchain. The chatbot extracts data from a website, creates embeddings using Langchain's HuggingFaceEmbeddings, and stores the data in a vector store. The chatbot also includes a Flask RESTful API to handle conversations.

## Technologies Used
- Python
- Langchain
- HuggingFace
- Flask
- React
- ChromaDB (Vector-Store)

## Steps to Run the Project
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using pip:
   ```
   pip install -r requirements.txt
   ```
4. Run the preprocessing notebook to extract data, create embeddings, and store the data:
   ```
   preprocessing.ipynb
   ```
5. Start the Flask server:
   ```
   python app.py
   ```
6. In a new terminal window, navigate to the frontend directory and install the necessary dependencies:
   ```
   cd bot-frontend
   npm install
   ```
7. Start the React application:
   ```
   npm start
   ```

## Project Documentation
The project consists of two main parts: the backend (preprocessing notebook and server script) and the frontend (React application).

### Backend
The `preprocessing.ipynb` script handles data extraction, embedding creation, and data storage. It uses the `UnstructuredURLLoader` from Langchain to load content from the specified URLs. The content is then processed and structured into a list of dictionaries, each representing a course. The `HuggingFaceEmbeddings` model from Langchain is used to generate embeddings for the course titles and descriptions. These embeddings are then stored in a `ChromaDB` collection using the Chroma client from Langchain.

The `app.py` script sets up a Flask RESTful API to handle chat conversations. It uses the HuggingFaceEmbeddings model to convert user messages into embeddings, which are then used to query the ChromaDB collection for relevant courses.

### bot-frontend
The `bot-frontend` is a React application that provides a chat interface for the user. It uses Axios to send GET and POST requests to the Flask server. The user's messages and the server's responses are displayed in the chat interface, with auto-scrolling to the latest messages.

Please refer to the comments in the code for more detailed explanations of each part.
![image](https://github.com/mayankyadav06/custom-chatbot/assets/140626220/46b6b92a-43f1-4c6f-a85f-136127681157)

