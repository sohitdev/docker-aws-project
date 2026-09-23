import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

/**
 * GET /
 * @description This endpoint returns a JSON object indicating that the server is running.
 * @returns {Object} - A JSON object with a message and success status.
 */
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "Server is running",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
});

/**
 * GET /health
 * @description This endpoint returns a JSON object indicating the health status of the server.
 * @returns {Object} - A JSON object with a message and success status.
 */
app.get("/health", (req, res) => {
  try {
    res.status(200).json({
      message: "OK",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
