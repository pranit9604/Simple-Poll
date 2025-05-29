# 🗳️ Simple Poll App

A full-stack quiz/poll application built with **React** (frontend) and **Node.js** (backend) that allows users to register, take a questionnaire, and view results including score, rank, and pass/fail status. Includes an admin dashboard for managing questions and viewing submissions.

---

## 🚀 Live Demo

🌐 **Frontend (Netlify):** [Open Live App](https://68305b50f10c4956f09b0b7b--roaring-cuchufli-682b90.netlify.app/)  
📦 **GitHub Repo:** [Simple-Poll on GitHub](https://github.com/pranit9604/Simple-Poll)

---

## 📌 Features

### ✅ Core Requirements (As per Assignment)
- User registration form (name + email)
- Mandatory questions – cannot submit unless all are answered
- Responsive UI (mobile, tablet, desktop)
- Show score, rank, and pass/fail on result page
- View all user results via a separate route (`/results`)

### 🔥 Additional Features Added
- 🔐 Admin login with dashboard
- ➕ Dynamic question add/edit interface
- 📝 Admin support on each question
- 🧪 Frontend unit  tests
- 🕒 Submission timestamps stored
- ⚠️ Enhanced error and loading UI states
- 🔙 Navigation buttons (Back to Registration, Back to Admin Login)

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TypeScript, Yup, Date-fns, Lodash.debounce, (optional: MUI)
- **Backend:** Node.js, Express
- **Database:** (Specify if used – e.g., MongoDB, SQLite, etc.)
- **Hosting:** Netlify (Frontend), Render/Heroku (Backend)

---

## 🧪 Testing

- Unit and integration tests using Jest and React Testing Library

## 📸 Quiz App Screenshots

### 📝 Register Page – With Email Validation
Shows form validation when the email format is incorrect. Improves UX and data accuracy.
![2025-05-30](https://github.com/user-attachments/assets/371b7bdb-bcbb-4953-b69a-fa68f400d354)


---

### ✅ Register Page – Valid Input
When correct email is entered, the user can proceed to the quiz.
![2025-05-30 (2)](https://github.com/user-attachments/assets/4fd41f69-1bb0-46ea-9027-059c314b5525)


---

### 🧠 Quiz Page – Welcome View
Personalized greeting shown with a list of quiz questions in a clean layout.
![2025-05-30 (3)](https://github.com/user-attachments/assets/627663bd-79c9-4763-8a76-a0426bb4f5e2)


---

### 🗳️ Quiz Page – Answer Selection
User selects answers using radio buttons, showing real-time interaction.
![2025-05-30 (4)](https://github.com/user-attachments/assets/f0618a7d-6611-417d-b6ea-6394730c764e)


---

### 📜 Full Quiz Scrolling View
Display of a complete quiz with multiple questions before submission.
![2025-05-30 (5)](https://github.com/user-attachments/assets/38b4440c-a378-4476-b73e-b3bce92ec871)


---

### 🏁 Result Page – Score & Rank
Shows result after quiz submission with name, score, rank, and pass/fail status.
![2025-05-30 (6)](https://github.com/user-attachments/assets/19004f72-0871-467b-b409-d1c0322c5841)


---

### 📊 All Results View – Leaderboard
Displays all users’ quiz attempts, sorted by rank. Highlights top scorer.
![2025-05-30 (7)](https://github.com/user-attachments/assets/5fb251fa-8d18-4447-9a4a-8d6cf318ddc0)


---

### 🥇 Highlighted Top Rank
Top rank row styled with special badge and color for better visibility.
![2025-05-30 (8)](https://github.com/user-attachments/assets/4552b88b-bf60-437d-b7a7-ea1db6f856f9)


---

### 🔁 Registration Reset Page
Blank state when user logs out or starts a new session.
![2025-05-30 (7)](https://github.com/user-attachments/assets/87429f57-1479-4380-b47f-2e9db2f77362)


---

### 🔐 Admin Login
Separate login form for admin with simple design for accessing admin features.
![2025-05-30 (10)](https://github.com/user-attachments/assets/b18cf158-d785-4fe0-98c3-9e6eb5808a93)


## 🔐 Admin Panel Screenshots

### 🔑 Admin Login with Required Field Validation  
Displays HTML5 validation when email input is left blank during login.
![2025-05-30 (11)](https://github.com/user-attachments/assets/edef2009-d5ce-4284-886a-ab05b8104b99)


---

### 🛠️ Admin Dashboard – Add New Question (Blank Form)  
Form to add new quiz questions with inputs for 4 options and correct answer dropdown.
![2025-05-30 (12)](https://github.com/user-attachments/assets/9d9ccafa-afa2-4e35-8678-5a173bcdfcb7)


---

### 🛠️ Admin Dashboard – Question Filled  
Form filled with example data for question and options.
![2025-05-30 (13)](https://github.com/user-attachments/assets/30aa01f0-53c7-4c52-ac3e-ec5ca58a4480)


---

### 📝 Add Question Button Clicked  
Shows UI after entering valid question details with submit action ready.
![2025-05-30 (13)](https://github.com/user-attachments/assets/66351c1d-ff9b-4a84-850a-4912f8c88e66)


---

### 🔁 Register Page with Admin Access Button  
Initial screen for user registration with buttons to:
- Start quiz
- View all results
- Login as admin
![2025-05-30](https://github.com/user-attachments/assets/f1edf266-6126-4df5-b62b-6c4174965d37)

  

