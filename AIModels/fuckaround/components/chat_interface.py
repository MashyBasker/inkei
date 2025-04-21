import streamlit as st

def chatMessage(message, is_user=False):
    if is_user:
        st.chatMessage("user").write(message)
    else:
        st.chatMessage("assistant").write(message)