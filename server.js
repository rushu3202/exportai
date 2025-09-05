import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Simple mock AI response (replace with OpenAI API call later)
    const aiResponse = `AI Agent: You said "${message}"`;

    res.json({ reply: aiResponse });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Export Assistant Backend is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
