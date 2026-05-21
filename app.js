const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Simple App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .endpoint { 
          background-color: #f9f9f9; 
          padding: 10px; 
          margin: 10px 0;
          border-left: 4px solid #007bff;
        }
        code {
          background-color: #e9ecef;
          padding: 2px 6px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🐳 Welcome to Simple App</h1>
        <p>This is a basic Node.js/Express application!</p>
        
        <h2>Available Endpoints:</h2>
        <div class="endpoint">
          <code>GET /</code> - This page
        </div>
        <div class="endpoint">
          <code>GET /api/hello</code> - Returns a greeting
        </div>
        <div class="endpoint">
          <code>GET /api/info</code> - Returns app information
        </div>
        <div class="endpoint">
          <code>POST /api/message</code> - Send a message (JSON)
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from the app!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'Simple Web App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    uptime: process.uptime()
  });
});

app.post('/api/message', (req, res) => {
  const { text } = req.body;
  res.json({
    received: text,
    echo: `You said: ${text}`,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
