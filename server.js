
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// POST endpoint for export
app.post("/api/export", (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ 
      success: false, 
      message: "Text field is required" 
    });
  }
  
  res.json({
    success: true,
    message: "Data exported successfully",
    data: text
  });
});

// Server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📱 Preview available at: https://${process.env.REPL_SLUG || 'your-repl'}.${process.env.REPL_OWNER || 'username'}.replit.dev`);
});
