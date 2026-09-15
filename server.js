const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Allow this app to be embedded in an iframe on other origins (e.g. ThingsBoard)
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Demo chat endpoint - returns a canned response instead of calling a real AI
app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const reply = `This is a demo response. You said: "${message.trim()}"`;

  // simulate a bit of latency like a real AI call
  setTimeout(() => {
    res.json({ reply, timestamp: new Date().toISOString() });
  }, 500);
});

app.listen(PORT, () => {
  console.log(`Chat iframe server running at http://localhost:${PORT}`);
  console.log(`Embed with: <iframe src="http://localhost:${PORT}"></iframe>`);
});
