
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Root route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// API endpoint for export
app.post("/api/export", (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: "Text field is required" });
  }
  
  res.json({ 
    success: true, 
    message: "Export request received successfully",
    receivedText: text,
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Use PORT from environment (Replit sets this automatically)
const PORT = process.env.PORT || 3000;

// Start server - bind to 0.0.0.0 for Replit
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📱 Preview available at: https://${process.env.REPL_SLUG || 'your-repl'}.${process.env.REPL_OWNER || 'username'}.replit.dev`);
});
