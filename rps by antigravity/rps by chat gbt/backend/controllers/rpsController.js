/**
 * RPS CONTROLLER
 * 
 * File ini berisi logika bisnis untuk setiap endpoint
 * Controller adalah "otak" yang memproses request dan memberikan response
 */

const aiService = require('../services/aiService');
const docxService = require('../services/docxService');
const fs = require('fs').promises;
const path = require('path');

/**
 * Generate DOCX tanpa AI
 */
exports.generateDOCXOnly = async (req, res) => {
  try {
    console.log('📝 Menerima request generate DOCX (tanpa AI)...');
    
    // Ambil data dari request body
    const rpsData = req.body;
    
    // Validasi data
    if (!rpsData.namaMataKuliah || !rpsData.kodeMataKuliah) {
      return res.status(400).json({
        success: false,
        message: 'Data mata kuliah tidak lengkap'
      });
    }
    
    // Format data RPS tanpa AI
    const formattedRPS = {
      identitasMataKuliah: {
        namaMataKuliah: rpsData.namaMataKuliah,
        kodeMataKuliah: rpsData.kodeMataKuliah,
        semester: rpsData.semester,
        sks: rpsData.sks,
        programStudi: rpsData.programStudi,
        dosenPengampu: rpsData.dosenPengampu
      },
      deskripsiMataKuliah: rpsData.deskripsiMataKuliah || '',
      capaianPembelajaran: {
        cplProdi: rpsData.cplProdi || [],
        cpmk: rpsData.cpmk || [],
        subCpmk: rpsData.subCpmk || []
      },
      bahanKajian: rpsData.bahanKajian || [],
      metodePembelajaran: rpsData.metodePembelajaran || [],
      mediaDanSumber: rpsData.mediaDanSumber || [],
      sistemPenilaian: rpsData.sistemPenilaian || {},
      rencanaPertemuan: rpsData.rencanaPertemuan || [],
      generatedAt: new Date().toISOString()
    };
    
    // Generate DOCX
    const timestamp = Date.now();
    const docxFilename = `rps_${rpsData.kodeMataKuliah}_${timestamp}.docx`;
    const docxPath = path.join(__dirname, '../outputs', docxFilename);
    
    await docxService.generateDOCX(formattedRPS, docxPath);
    
    console.log('✅ File DOCX berhasil dibuat (tanpa AI)');
    
    // Kirim response
    res.json({
      success: true,
      message: 'DOCX berhasil dibuat',
      filename: docxFilename
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal generate DOCX: ' + error.message
    });
  }
};

/**
 * Generate RPS menggunakan AI
 */
exports.generateRPS = async (req, res) => {
  try {
    console.log('📝 Menerima request generate RPS...');
    
    // Ambil data dari request body (dikirim dari frontend)
    const rpsData = req.body;
    
    // Validasi data
    if (!rpsData.namaMataKuliah || !rpsData.kodeMataKuliah) {
      return res.status(400).json({
        success: false,
        message: 'Data mata kuliah tidak lengkap'
      });
    }
    
    console.log('🤖 Memproses dengan AI...');
    
    // Panggil AI Service untuk generate konten RPS
    const generatedRPS = await aiService.generateRPSContent(rpsData);
    
    console.log('✅ RPS berhasil digenerate!');
    
    // Simpan sebagai JSON
    const timestamp = Date.now();
    const jsonFilename = `rps_${rpsData.kodeMataKuliah}_${timestamp}.json`;
    const jsonPath = path.join(__dirname, '../outputs', jsonFilename);
    
    await fs.writeFile(jsonPath, JSON.stringify(generatedRPS, null, 2));
    
    // Generate DOCX
    const docxFilename = `rps_${rpsData.kodeMataKuliah}_${timestamp}.docx`;
    const docxPath = path.join(__dirname, '../outputs', docxFilename);
    
    await docxService.generateDOCX(generatedRPS, docxPath);
    
    console.log('💾 File JSON dan DOCX tersimpan');
    
    // Kirim response ke frontend
    res.json({
      success: true,
      message: 'RPS berhasil digenerate',
      data: generatedRPS,
      files: {
        json: jsonFilename,
        docx: docxFilename
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal generate RPS: ' + error.message
    });
  }
};

/**
 * Download file JSON
 */
exports.downloadJSON = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../outputs', filename);
    
    // Cek apakah file ada
    await fs.access(filePath);
    
    // Kirim file ke client
    res.download(filePath, filename);
    
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'File tidak ditemukan'
    });
  }
};

/**
 * Download file DOCX
 */
exports.downloadDOCX = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../outputs', filename);
    
    // Cek apakah file ada
    await fs.access(filePath);
    
    // Kirim file ke client
    res.download(filePath, filename);
    
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'File tidak ditemukan'
    });
  }
};
