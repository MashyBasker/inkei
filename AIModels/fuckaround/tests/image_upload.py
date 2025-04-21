import streamlit as st
from PIL import Image
import os

st.title("Test Image Upload")

uploaded_image = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])

if uploaded_image is not None:
    st.success(f"File '{uploaded_image.name}' uploaded successfully!")
    image = Image.open(uploaded_image)
    st.image(image, caption="Uploaded Image", use_column_width=True)

    # Save to disk to verify
    save_path = os.path.join("data", "uploaded_test_image.jpg")
    os.makedirs("data", exist_ok=True)
    with open(save_path, "wb") as f:
        f.write(uploaded_image.getbuffer())
    st.info(f"Saved to {save_path}")
else:
    st.warning("No image uploaded.")
