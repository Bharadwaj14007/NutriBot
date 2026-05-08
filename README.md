# NutriBot – AI Diet Planning Chatbot

NutriBot is a full-stack AI-powered web application designed to act as your personal dietitian. It features a responsive, glassmorphism-inspired UI, robust authentication, an AI-powered chatbot, and a smart diet planner.

## Features
- **AI Chatbot**: Intelligent nutrition and diet assistant powered by Google Gemini AI.
- **Smart Diet Planner**: Dynamic daily meal plan generation based on your goals.
- **User Dashboard**: Track your calories, hydration, and goal progress.
- **Authentication**: Secure JWT-based login and registration system.
- **Modern UI**: Built with React, Tailwind CSS v4, Framer Motion, and Recharts, offering a seamless and beautiful interface with dark mode support.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Recharts, Lucide React, Axios, React Router.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), Google Generative AI SDK.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB running locally or a MongoDB Atlas URI.
- Google Gemini API Key.

### 1. Backend Setup
1. Navigate to the \`backend\` directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file in the \`backend\` directory with the following variables:
   \`\`\`
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/nutribot
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   \`\`\`
4. Start the server:
### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/nutribot
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *(Note: Ensure you have nodemon installed or use `node server.js`)*

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

Enjoy planning your diet with NutriBot!

---

# NutriBot (Remote description)
AI Based web application to analyse and plan daily life food diet
