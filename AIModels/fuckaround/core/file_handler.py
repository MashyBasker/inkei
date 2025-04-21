import os
from pathlib import Path
from typing import Tuple

SUPPORTED_FORMATS = [".txt", ".md"]
UPLOAD_DIR = "data/uploaded_data"

def isSupported(file) -> bool:
    ext = Path(file.name).suffix
    return ext in SUPPORTED_FORMATS

def saveFile(file) -> str:
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, file.name)
    with open(file_path, "wb") as fil:
        fil.write(file.getbuffer())
    return file_path

def readFileContent(path:str) -> str:
    with open(path, "r", encoding="utf-8") as fil:
        return fil.read()
    