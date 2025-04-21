import streamlit as st
import os
from core.file_handler import isSupported, saveFile, readFileContent
from core.qa_chain import get_qa_chain
from core.text_parser import getTaskParserChain
from components.chat_interface import chatMessage
from core.model_selector import select_model



st.set_page_config(page_title = "AI Scrum Master", layout="centered")

st.title("AI Scrum Master")
st.write("Upload your product and ask questions about it.")

qa_chain = get_qa_chain()
parser_chain = getTaskParserChain()

uploaded_file = st.file_uploader("Upload your product backlog", type=["txt", "md"])

if uploaded_file:
    if not isSupported(uploaded_file):
        st.error("unsupported file type. only .txt or .md allowed.")

    else:
        file_path = saveFile(uploaded_file)
        context = readFileContent(file_path)
        st.success("File uploaded successfully!")
        st.text_area("Document Preview:", context, height = 100)

        if st.button("Analyze Tasks"):
            with st.spinner("Parsing and analyzing tasks..."):
                result = parser_chain.run(tasks=context)
                st.markdown(result)
        
        if st.button("Check list of models"):
            st.text_area("Available Models", select_model(), height=200)

if prompt := st.chat_input("ask anything about your product or backlog:"):
    chat_message(prompt, is_user=True)
    with st.spinner("Thinking..."):
        result = qa_chain.run(context=context if uploaded_file else "", question=prompt)
        chat_message(result)


