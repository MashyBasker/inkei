import streamlit as st
import os
from core.file_handler import isSupported, saveFile, readFileContent
from core.qa_chain import get_qa_chain
from core.text_parser import getTaskParserChain
from components.chat_interface import chatMessage
from core.model_selector import select_model
from core.github_handler import (
    extract_owner_repo, fetch_all_files, combine_context
)

st.set_page_config(page_title="AI Scrum Master", layout="centered")

# Session state for GitHub URL
if "github_provided" not in st.session_state:
    st.session_state.github_provided = False
if "repo_url" not in st.session_state:
    st.session_state.repo_url = ""

# Ask for GitHub URL before anything else
if not st.session_state.github_provided:
    with st.container():
        st.markdown("### 🚀 Before we start...")
        st.info("Please provide a **public GitHub repository URL** to give the AI some context.")

        repo_url_input = st.text_input("GitHub Repository URL", placeholder="e.g. https://github.com/username/repo")

        if st.button("Submit Repository"):
            if repo_url_input.startswith("https://github.com/"):
                owner, repo = extract_owner_repo(repo_url_input)
                if owner and repo:
                    with st.spinner("Fetching repository content..."):
                        files = fetch_all_files(owner, repo)
                        context_text = combine_context(files)
                        st.session_state.github_provided = True
                        st.session_state.repo_url = repo_url_input
                        st.session_state.repo_context = context_text
                        st.success("Repository content loaded!")
                else:
                    st.error("Could not parse GitHub URL.")
            else:
                st.error("Invalid GitHub URL format. Please include https://github.com/...")

    # Stop rendering the rest of the app until repo is submitted
    st.stop()

# === MAIN APP ===

st.title("AI Scrum Master")
st.write(f"🧠 Context from: `{st.session_state.repo_url}`")
st.write("Upload your product backlog and ask questions about it.")

context=""
qa_chain = get_qa_chain()
parser_chain = getTaskParserChain()

uploaded_file = st.file_uploader("📄 Upload your product backlog", type=["txt", "md"])

if uploaded_file:
    if not isSupported(uploaded_file):
        st.error("Unsupported file type. Only .txt or .md allowed.")
    else:
        file_path = saveFile(uploaded_file)
        context = readFileContent(file_path)
        st.success("File uploaded successfully!")
        st.text_area("📃 Document Preview:", context, height=100, disabled=True)

        if st.button("🔍 Analyze Tasks"):
            with st.spinner("Parsing and analyzing tasks..."):
                result = parser_chain.run(tasks=context)
                st.markdown(result)

        if st.button("📋 Check list of models"):
            st.text_area("Available Models", select_model(), height=200)
qa_context = context if uploaded_file else st.session_state.get("repo_context", "")
if prompt := st.chat_input("Ask anything about your product or backlog:"):
    chatMessage(prompt, is_user=True)
    with st.spinner("Thinking..."):
        result = qa_chain.run({
    "context": qa_context,
    "question": prompt
})

        chatMessage(result)
