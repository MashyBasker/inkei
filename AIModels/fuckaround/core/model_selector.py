import streamlit as st
from langchain_google_genai import ChatGoogleGenerativeAI

def select_model():
    model_provider = st.sidebar.selectbox("Gemini", ["Gemini Flash", "Gemini Pro"])

    if model_provider == "Gemini":
        selected_model = st.sidebar.selectbox(
            "Gemini Model",
            ["gemini-1.5-pro", "gemini-1.5-flash"]
        )
        return ChatGoogleGenerativeAI(
            temperature=0.4,
            model=selected_model
        )

   
