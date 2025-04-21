from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os


def getTaskParserChain():
    prompt = PromptTemplate(
        input_variables=["context", "question"],
        template="""

You are an AI assistant. Read the input and convert it into a markdown-based sprint/task breakdown.

❗ RULES:
- Output must be in Markdown only.
- No comments, preambles, or summaries.
- Explain which story points are assigned based on task complexity and weightage.
- Each subtask must have some acceptance criteria for it.
- Every task must contain a table in this format:

- Task: [Task Name]

  | Subtask | Explanation | Story Points | Estimated Time (hrs) | Acceptance Criteria |
  |---------|-------------|--------------|----------------------|---------------------|
  | [Subtask Name] | [Why it's needed] | [1-8] | [hours] | [Criteria when subtask is deemed complete by a company]

Now parse the following content:

{tasks}
"""
    )

    llm = ChatGoogleGenerativeAI(
        temperature=0.4,
        model="gemini-1.5-pro",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    return LLMChain(llm=llm, prompt=prompt)