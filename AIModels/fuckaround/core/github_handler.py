import re
import requests

def extract_owner_repo(github_url: str):
    match = re.match(r"https://github\.com/([^/]+)/([^/]+)", github_url)
    if match: 
        return match.group(1), match.group(2)
    return None, None

def list_repo_files(owner, repo, path=""):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return []

def fetch_file_from_repo(owner, repo, path):
    raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/main/{path}" 
    response = requests.get(raw_url)
    if response.status_code == 200:
        return response.text
    return None

def fetch_all_files(owner, repo, extensions=[".md", ".txt", ".py"], path=""):
    collected_files = []
    contents = list_repo_files(owner, repo, path)

    for item in contents:
        if item["type"] == "file" and any(item["name"].endswith(ext) for ext in extensions):
            file_content = fetch_file_from_repo(owner, repo, item["path"])
            if file_content:
                collected_files.append((item["path"], file_content))

        elif item["type"] == "dir":
            collected_files.extend(fetch_all_files(owner, repo, extensions, item["path"]))

    return collected_files

def combine_context(file_tuples):
    return "\n\n".join(f"# {name}\n{content}" for name, content in file_tuples)
