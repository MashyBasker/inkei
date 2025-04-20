from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load your GEMINI_API_KEY from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Authenticate with the Gemini API
genai.configure(api_key=api_key)

# List all available models and their generation methods
for model in genai.list_models():
    print(f"Model Name: {model.name}")
    print(f"Supported Methods: {model.supported_generation_methods}")
    print(f"Description: {model.description}")
    print("-" * 50)
