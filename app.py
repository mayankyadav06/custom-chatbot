from flask import Flask, request, jsonify
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from flask_cors import CORS
import numpy as np
import itertools  
import re
import chromadb

# Initialize the HuggingFaceEmbeddings model
model = HuggingFaceEmbeddings(model_name='all-MPNet-base-v2')

# Initialize the ChromaDB through Langchain
persistent_client = chromadb.PersistentClient("ChromaDB")
langchain_chroma = Chroma(
    client=persistent_client,
    collection_name="course_collection")

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    # Get the user's message from the request data
    data = request.get_json()
    user_message = data['message'].lower()

    # Check if the user's message is a greeting
    if re.match(r'hi+|hey+|hello+', user_message):
        return jsonify({'response': 'Hello! I am a edu-bot and I can provide information about various courses offered. Please enter the name of a technology you are interested in.'})

    # Check if the user's message is asking for contact info
    if re.match(r'contact|support|info|help', user_message):
        return jsonify({'response': 'For any information and enrolling, please contact our support team at support@xyzedu.com.'})

    # Convert the user's message into an embedding
    user_message_embedding = model.embed_query(texts=[user_message])

    # Concatenate the user message embedding with itself to match the dimensionality of the course embeddings
    query_embedding = np.concatenate([user_message_embedding, user_message_embedding]).tolist()

    # Query the collection with the embedding
    results = langchain_chroma._collection.query(query_embeddings=[query_embedding], n_results=2)

    # Flatten the list of lists 
    response = list(itertools.chain(*results['metadatas']))  

    # Return the response as JSON
    return jsonify({'response': response})

@app.route('/start', methods=['GET'])
def start():
    # Return starting message for chat
    return jsonify({'response': 'Hello and welcome to the XYZ Education!'})

if __name__ == '__main__':
    app.run(debug=True)
