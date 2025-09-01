import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// Export endpoint
app.post("/api/export", (req, res) => {
  const { text } = req.body;
  res.json({
    success: true,
    message: "Data exported successfully",
    data: text,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
