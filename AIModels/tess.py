from PIL import Image
import pytesseract
import os

# Optional: Set the path manually if you're on Windows
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def run_ocr(image_path):
    if not os.path.exists(image_path):
        print(f"Image not found: {image_path}")
        return

    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        print("✅ OCR Result:\n")
        print(text.strip())
    except Exception as e:
        print("❌ Failed to extract text:", e)

# Run the test
run_ocr("input/testimage1.jpg")  # update path if needed
