<p align="center">
  <a href="" rel="noopener">
 <img src="https://i.postimg.cc/8PGQ0pGL/image.png" alt="Project logo"></a>
</p>
<h3 align="center">Zenith</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-name-orange.svg)](https://aignite2025.com)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> Zenith is a next-generation Work Operating System that integrates artificial intel-
ligence into every layer of the Secure Software Development Life Cycle (SSDLC). Built for engineering teams, it automates planning, task management, communication, code
review, and compliance of all within a unified workspace.
    <br> 
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Dependencies](#limitations)
- [Setting up a local environment](#getting_started)
- [Usage](#usage)
- [Technology Stack](#tech_stack)
- [Authors](#authors)

## 🧐 Problem Statement <a name = "problem_statement"></a>

Modern product and project management processes are complex, involving numerous tasks from UI/UX design to feature implementation and coordination among team members. There's a need to streamline and automate these processes within the Secure Software Development Life Cycle (SSDLC), making project management more efficient and fluid.

Develop an AI-powered Work Operating System as a Software-as-a-Service (SaaS) that provides a common workspace for client company employees. The innovative features of the solution include:

## 💡 Idea / Solution <a name = "idea"></a>

Zenith is a SaaS platform that intelligently integrates team collaboration, code
analysis, and sprint planning with real-time AI support. </br>

### Core Features:

• GitHub Bot: Automatically reviews PRs, detects issues, and suggests optimal fixes or alternatives. </br>
• Real-Time Chat Interface: Role-based, secure messaging embedded within the workspace. </br>
• AI Dashboard: Upload documents or files to extract task context, assign story points, and auto-plan sprints. </br>
• Delta Branch Detection: Identifies branch deviations and reassigns story points accordingly. </br>
• AI Canvas: Breaks high-level tasks into subtasks with estimated durations.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

```
NodeJS - ver. 22.0+
Python - ver. 3.x
```

### Installing

A step by step series of examples that tell you how to get a development env running.

First, copy paste this command into any folder (preferably blank):

```
git clone https://github.com/MashyBasker/inkei.git
```

Then, you need to create a .env file inside your folder where you have cloned the repository. It will contain GEMINI_API_KEY, MONGO_URI, MONGO_CEO_URI, MONGO_SR_URI, MONGO_JR_URI. </br>
Check .env.exampl for help. </br>

Now copy paste the following code inside your Terminal:

```
npm i
npm run dev
cd backend -> npm start
```

You should see https://locahost:5173/ as your frontend server and MongoDB connected and WebSocket server running messages.
</br> Repeat the steps if anything goes wrong.

Now to test the AI pipeline endpoint:

```
cd AIModels -> cd fuckaround
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```
You should see a streamlit server running at localhost:8501
Supported files - .md, .txt, .rtf </br>

## 🎈 Usage <a name="usage"></a>

For any discrepancies, reach out to rudranilchowdhury83@gmail.com :D

## ⛏️ Built With <a name = "tech_stack"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [React](https://react.dev/) - Frontend Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Python](https://www.python.org/) - For AI related tasks

## ✍️ Authors <a name = "authors"></a>

- [MaharshiBasu](https://github.com/MashyBasker)
- [Zephyrus2822](https://github.com/Zephyrus2822)
- [AyashBera](https://github.com/Ayash-Bera)
- [SoubhagyaSadhukhan](https://github.com/levi911)
