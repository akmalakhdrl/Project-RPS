/**
 * RPS ROUTES
 * 
 * File ini mendefinisikan semua endpoint (URL) yang bisa diakses
 * Endpoint ini yang nanti dipanggil dari frontend
 */

const express = require('express');
const router = express.Router();
const rpsController = require('../controllers/rpsController');

/**
 * POST /api/rps/generate
 * Endpoint untuk generate RPS menggunakan AI
 * Body: data RPS dari form frontend
 */
router.post('/generate', rpsController.generateRPS);

/**
 * POST /api/rps/generate-docx-only
 * Endpoint untuk generate DOCX tanpa AI
 * Body: data RPS dari form frontend
 */
router.post('/generate-docx-only', rpsController.generateDOCXOnly);

/**
 * GET /api/rps/download/json/:filename
 * Endpoint untuk download file JSON
 * Params: filename - nama file yang akan didownload
 */
router.get('/download/json/:filename', rpsController.downloadJSON);

/**
 * GET /api/rps/download/docx/:filename
 * Endpoint untuk download file DOCX
 * Params: filename - nama file yang akan didownload
 */
router.get('/download/docx/:filename', rpsController.downloadDOCX);

module.exports = router;
