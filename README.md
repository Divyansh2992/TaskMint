# TaskMint

TaskMint is a full-stack web application for managing agents and distributing tasks efficiently. It features robust user authentication, agent management, and automated task distribution from uploaded lists. Below is a detailed explanation of its features:

## Features

### 1. User Authentication (Login & Signup)
- Secure login and signup forms for users and admins.
- Email and password authentication, with credentials stored securely in MongoDB.
- Uses JSON Web Tokens (JWT) for session management and authentication, stored in cookies for security.
- On successful login, users are redirected to their dashboard; on failure, clear error messages are shown.

### 2. Agent Creation & Management (Admin Only)
- Admins can add new agents with the following details:
  - Name
  - Email
  - Mobile Number (with country code)
  - Password
- Agents are stored in the database and can be managed by the admin.

### 3. Uploading and Distributing Lists (Admin Only)
- Admins can upload task lists in CSV, XLS, or XLSX formats using a simple upload interface.
- The uploaded file must contain the following columns for each task:
  - **FirstName** (Text): The name of the person or entity related to the task.
  - **Phone** (Number): The contact number associated with the task.
  - **Notes** (Text): Any additional information or instructions for the task.
- The system performs strict file validation to ensure only supported formats (CSV, XLS, XLSX) are accepted and that the file structure matches the required columns. If the file is invalid, a clear error message is shown.
- Upon successful upload, the application automatically distributes the tasks as evenly as possible among 5 agents:
  - If the total number of tasks is not divisible by 5, the remaining tasks are assigned one by one to agents in order, ensuring a fair distribution.
  - For example, with 23 tasks, each agent receives 4 tasks, and the first 3 agents receive 1 extra task each (totaling 5, 5, 5, 4, 4).
- All distributed task lists are saved in MongoDB, maintaining a record of which agent is responsible for each task.
- On the frontend dashboard, each agent can view only their assigned tasks, with clear separation and easy navigation. Admins can see the overall distribution and status of all tasks.

### 4. Agent Dashboard
- Agents can log in to view their assigned tasks.
- Agents can mark tasks as done or remove them from their list.
- The dashboard provides a clear overview of all assigned tasks and their statuses.

### 5. Responsive UI
- The frontend is built with React and Bootstrap for a modern, responsive user experience.
- Clean navigation and clear feedback for all user actions.

## Project Structure

```
backend/
  app.js
  controllers/
  middleware/
  models/
  routes/
  uploads/
frontend/
  src/
  public/
  index.html
  ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally on default port

### Backend Setup

1. Navigate to the `backend` directory:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Create a `.env` file with:
   ```
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
4. Start the backend server:
   ```powershell
   node app.js
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend dev server:
   ```powershell
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Sign up as a user.
- Admin users (emails containing "admin") can upload CSV/XLS/XLSX files to assign tasks.
- All users can view and manage their tasks on the dashboard.

## License

MIT

---

*This project was bootstrapped with Vite + React.*
