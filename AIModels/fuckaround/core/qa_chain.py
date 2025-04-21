from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv

load_dotenv()

def get_qa_chain():
    llm = ChatGoogleGenerativeAI(
        temperature=0.4,
        model="gemini-1.5-pro",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    prompt = PromptTemplate(
        input_variables = ["context", "question"],
        template = 
        """
You are an AI Scrum Master. Given the product context below, answer the user's question or estimate story points:

Context:
{context}

User Question:
{question}
""")
    
    return LLMChain(llm=llm, prompt=prompt)

