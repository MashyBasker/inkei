import os
from pathlib import Path
from typing import Tuple

from langchain_core.documents import Document
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate   
from langchain_core.runnables import RunnableLambda

from dotenv import load_dotenv
import PIL.Image

# Load environment variables
load_dotenv()

# Fetch Google API key from environment
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Supported image formats
SUPPORTED_IMAGE_FORMATS = [".jpg", ".jpeg", ".png"]

def is_image_supported(file) -> bool:
    """Check if the file extension is supported."""
    ext = Path(file.name).suffix.lower()  # e.g., ".png"
    return ext in SUPPORTED_IMAGE_FORMATS  # Check if the file extension is in the list of supported formats


def save_image(file) -> str:
    """Save the uploaded image file to the specified directory."""
    os.makedirs("data/uploaded_data", exist_ok=True)
    file_path = os.path.join("data/uploaded_data", file.name)
    with open(file_path, "wb") as fil:
        fil.write(file.getbuffer())  # Write the file content to the disk
    return file_path  # Return the path to the saved file


def load_image(file_path: str) -> PIL.Image.Image:
    """Load and return the image from the saved file path."""
    return PIL.Image.open(file_path)  # Use PIL to open the image


def get_image_analysis_chain():
    """Create and return an image analysis chain using Gemini AI."""
    llm = ChatGoogleGenerativeAI(
        temperature=0.4,
        model="gemini-pro-vision",  # Specify the model for image processing
        google_api_key=GOOGLE_API_KEY  # Set the Google API key
    )

    # Create the prompt for the image analysis task
    prompt = ChatPromptTemplate(""" 
        You are an AI Product Manager (Scrum Master). Analyze the system architecture image and generate product insights. 
        Extract possible components, responsibilities, and suggest story points for each part if applicable.

        Image Context: {{image}}  # Correct the placeholder format with double curly braces
    """)

    # Return the complete image analysis chain (prompt + model)
    return prompt | llm | RunnableLambda(lambda x: x["image"])  # Pass the image as the input to the model

def analyze_image(image):
    # Ensure the image is passed as input correctly
    chain = get_image_analysis_chain()
    result = chain.invoke({"image": image})  # Pass the image as a dictionary
    return result  # Return the result from the chain
