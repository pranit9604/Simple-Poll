# Simple Poll

A full-stack web application for conducting quizzes, collecting user results, and managing questions via an admin dashboard.

---

## Features

- **User Registration:** Users register with their name and email to participate in the quiz.
- **Quiz Participation:** Users answer a set of multiple-choice questions.
- **Result Calculation:** After submission, users see their score, rank, and pass/fail status.
- **All Results View:** Anyone can view all quiz results, including scores, ranks, and timestamps.
-
-  **Admin Login:** Admins can log in to manage quiz questions.
-
-  **Admin Dashboard:**
  - Add new questions (with four options and a correct answer).
  - Edit or delete existing questions.
  - All changes are reflected immediately for quiz participants.

---

## Folder Structure

```
backend/
  db.js
  index.js
  package.json
  models/
    Admin.js
    Question.js
    Submission.js
  routes/
    admin.js
    question.js
    questions.js
    quiz.js

frontend/
  .gitignore
  package.json
  README.md
  public/
    ...
  src/
    App.js
    index.js
    components/
    constants/
    pages/
    Routes/
    services/
```

---

## Tech Stack

- **Frontend:** React (with React Router)
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **HTTP Requests:** Fetch API and Axios

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
    cd Simple\ Poll
    ```

2. **Install dependencies:**
    - Backend:
      ```sh
      cd backend
      npm install
      ```
    - Frontend:
      ```sh
      cd ../frontend
      npm install
      ```

3. **Configure environment variables:**
    - Set up MongoDB connection in `backend/db.js` or via environment variables.

4. **Run the app locally:**
    - Backend:
      ```sh
      npm start
      ```
    - Frontend (in a new terminal):
      ```sh
      npm start
      ```

---

## Usage

- **User Flow:**
  1. Register with name and email.
  2. Take the quiz (all questions are mandatory).
  3. Submit answers to see your result (score, rank, status).
  4. View all results or return to registration.

- **Admin Flow:**
  1. Log in as admin (name and email).
  2. Add, edit, or delete quiz questions.
  3. Changes are reflected for all users.

---

## API Endpoints

- **User:**
  - `POST /api/submit` — Submit quiz answers.
  - `GET /api/all-results` — Get all quiz results.
  - `GET /api/questions` — Fetch all quiz questions.

- **Admin:**
  - `POST /api/admin/login` — Admin login.
  - `POST /api/questions` — Add a question.
  - `PUT /api/questions/:id` — Edit a question.
  - `DELETE /api/questions/:id` — Delete a question.

---

## Deployment

- **Frontend:** Deploy `frontend` folder to [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
- **Backend:** Deploy `backend` folder to [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://heroku.com).
- Update API URLs in frontend (`src/services/quizService.js` and other files) to point to your deployed backend.

---

## Screenshots


---

## License

MIT

---

## Acknowledgements

- Built with React, Node.js, Express, and MongoDB.
