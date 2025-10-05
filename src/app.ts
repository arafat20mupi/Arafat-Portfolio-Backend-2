import compression from "compression";
import cors from "cors";
import express from "express";
import { userRouter } from "./modules/user/user.routes";
import { blogsRouter } from "./modules/blogs/blogs.route";
import projectRoutes from "./modules/projects/projects.route";
import { authRouter } from "./modules/auth/auth.route";

const app = express();

// Middleware
app.use(cors()); 
app.use(compression());
app.use(express.json()); 
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/auth", authRouter);

// Default route for testing
app.get("/", (_req, res) => {
  res.send("API is running");
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
