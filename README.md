# 📝 MERN Stack Blogging Web App

This is a full-stack **blogging platform** built using the **MERN stack** — MongoDB, Express.js, React.js, and Node.js. It allows users to register, log in securely, and perform full CRUD operations on blog posts.

## 🚀 Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Create, Edit, and Delete Blog Posts
- ✅ View All Blogs on Home Page
- ✅ Responsive and Clean UI using React
- ✅ RESTful APIs using Express.js
- ✅ MongoDB integration for persistent storage
- ✅ Secure route handling and protected pages

## 🛠️ Tech Stack

| Frontend   | Backend       | Database  | Authentication |
|------------|---------------|-----------|----------------|
| React.js   | Node.js       | MongoDB   | JWT (JSON Web Token) |
| Axios      | Express.js    | Mongoose  | bcrypt.js |

## 📁 Pages & Routes

- `/register` – User registration form  
- `/login` – User login form  
- `/` – Home page displaying all blogs  
- `/create` – Create a new blog post  
- `/edit/:id` – Edit an existing blog post  
- `/logout` – Logout the current user  

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yashrathod2002/blog-web-app.git
   cd blog-web-app
   ```

2. **Install dependencies for both frontend & backend:**

   ```bash
   # In one terminal (backend):
   cd backend
   npm install

   # In another terminal (frontend):
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in your backend folder:

   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**
   ```bash
   # Backend
   npm start

   # Frontend (in another terminal)
   npm start
   ```

5. Open `http://localhost:3000` in your browser ✨

## 👨‍💻 Author

- [Yash Rathod](https://github.com/yashrathod2002)
- Diploma in Advanced Computing (CDAC)

## 📌 License

This project is open-source and free to use.
