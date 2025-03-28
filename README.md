
MERN Blog Application

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) blog application where users can create, read, update, and delete blog posts. Users can also like/dislike blogs, comment on them, and upload images or videos.

---

Backend (Node.js + Express.js)
- RESTful API: Handles CRUD operations for blogs, comments, and user authentication.
- File Uploads: Supports image, video, and PDF uploads using Multer.
- Authentication: JWT-based authentication for secure user sessions.
- Database: MongoDB for storing blogs, users, and comments.

---

Technologies Used

Frontend
- React: JavaScript library for building the user interface.
- Chakra UI: Component library for styling and responsiveness.
- Axios: For making HTTP requests to the backend.
- React Router: For client-side routing.

Backend
- Node.js: JavaScript runtime for the backend.
- Express.js: Web framework for building the REST API.
- MongoDB: NoSQL database for storing data.
- Mongoose: ODM (Object Data Modeling) library for MongoDB.
- Multer: Middleware for handling file uploads.
- JWT (JSON Web Tokens): For user authentication and authorization.

Other Tools
- Postman: For testing API endpoints.
- Vite: Frontend build tool for fast development.

---

Setup Instructions

Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- Git (optional)

Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-blog-app.git
   cd mern-blog-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

---

Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `frontend` directory and add the following:
   ```env
   VITE_API_URL=http://localhost:5001
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.
---

Folder Structure

Backend
```
backend/
├── config/            # Database and environment configuration
├── controllers/       # Logic for handling routes
├── middleware/        # Custom middleware (e.g., authentication)
├── models/            # MongoDB models (e.g., Blog, User, Comment)
├── routes/            # API routes
├── utils/             # Utility functions (e.g., error handling)
├── app.js             # Main application file
├── server.js          # Server setup
```

Frontend
```
frontend/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Application pages
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions (e.g., API configuration)
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Entry point
```
