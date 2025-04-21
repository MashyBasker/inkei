import streamlit as st

def chatMessage(message, is_user=False):
    if is_user:
        st.chat_message("user").write(message)
    else:
        st.chat_message("assistant").write(message)