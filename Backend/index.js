import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import StatusCode from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import Post from "./models/Post.js";
import ContactMessage from "./models/ContactMessage.js";

dotenv.config();
const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY;
const uploadMiddleware = multer({ dest: "uploads/" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      `Node.js Express Server Running At Port No : ${process.env.port}`
    );
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.post("/register", async (req, res) => {
  console.log("/register Route");
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.send(user);
  } catch (err) {
    res.status(StatusCode.BAD_REQUEST).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const passCorrect = bcrypt.compareSync(password, user.password);
  if (passCorrect) {
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: user._id,
        username,
      });
    });
  } else {
    res.status(StatusCode.BAD_REQUEST).json("Wrong Credentials!");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(403).json({ error: "Token is invalid" });
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(post);
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["username"]);
  res.json(post);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await Post.findByIdAndUpdate(id, {
  title,
  summary,
  content,
  cover: newPath || postDoc.cover,
});


    res.json(postDoc);
  });
});

app.delete("/post/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json("Unauthorized");

    try {
      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json("Post not found");
      }

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(403).json("You are not the author");
      }

      if (postDoc.cover && fs.existsSync(postDoc.cover)) {
        fs.unlinkSync(postDoc.cover);
      }

      await Post.findByIdAndDelete(id);
      res.json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
      console.error("Error deleting post:", err);
      res.status(500).json("Internal server error");
    }
  });
});

app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });
    res.status(201).json({ success: true, message: "Message sent!", data: newMessage });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});
