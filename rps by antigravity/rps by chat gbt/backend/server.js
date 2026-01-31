/**
 * SERVER.JS - File Utama Backend
 * 
 * File ini adalah jantung dari backend aplikasi RPS
 * Fungsinya:
 * 1. Menjalankan server Express
 * 2. Mengatur middleware (CORS, JSON parser)
 * 3. Mendefinisikan route/endpoint API
 */

// Import library yang dibutuhkan
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Membaca file .env

// Import routes
const rpsRoutes = require('./routes/rpsRoutes');

// Inisialisasi Express app
const app = express();

// Middleware
app.use(cors()); // Mengizinkan request dari frontend (berbeda domain/port)
app.use(express.json()); // Membaca data JSON dari request body

// Routes
app.use('/api/rps', rpsRoutes); // Semua endpoint RPS dimulai dengan /api/rps

// Route untuk testing server
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend RPS berjalan dengan baik!',
    endpoints: {
      generate: 'POST /api/rps/generate',
      downloadJSON: 'GET /api/rps/download/json/:filename',
      downloadDOCX: 'GET /api/rps/download/docx/:filename'
    }
  });
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server RPS berjalan di http://localhost:${PORT}`);
  console.log(`📝 Endpoint API: http://localhost:${PORT}/api/rps`);
});
