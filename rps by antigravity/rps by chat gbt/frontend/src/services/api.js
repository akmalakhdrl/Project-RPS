/**
 * API.JS - Service untuk komunikasi dengan Backend
 * 
 * File ini berisi fungsi-fungsi untuk memanggil endpoint backend
 * Menggunakan axios untuk HTTP request
 */

import axios from 'axios'

// Base URL backend
const API_URL = 'http://127.0.0.1:5000/api/rps'

/**
 * Generate RPS menggunakan AI
 * @param {Object} rpsData - Data dari form
 * @returns {Promise} - Response dari backend
 */
export const generateRPS = async (rpsData) => {
  try {
    console.log('📤 Mengirim data ke backend...')

    const response = await axios.post(`${API_URL}/generate`, rpsData)

    console.log('✅ Response diterima:', response.data)

    return response.data

  } catch (error) {
    console.error('❌ Error generate RPS:', error)

    // Throw error dengan pesan yang jelas
    if (error.response) {
      // Error dari backend
      throw new Error(error.response.data.message || 'Gagal generate RPS')
    } else if (error.request) {
      // Tidak ada response dari backend
      throw new Error('Backend tidak merespons. Pastikan backend sudah jalan!')
    } else {
      // Error lainnya
      throw new Error('Terjadi kesalahan: ' + error.message)
    }
  }
}

/**
 * Download file JSON
 * @param {String} filename - Nama file
 */
export const downloadJSON = (filename) => {
  try {
    const url = `${API_URL}/download/json/${filename}`
    console.log('📥 Downloading JSON from:', url)

    // Buat link untuk download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    console.log('✅ JSON download started')
  } catch (error) {
    console.error('❌ Error downloading JSON:', error)
    alert('Gagal download JSON. Coba lagi atau cek console.')
  }
}

/**
 * Download file DOCX
 * @param {String} filename - Nama file
 */
export const downloadDOCX = (filename) => {
  try {
    const url = `${API_URL}/download/docx/${filename}`
    console.log('📥 Downloading DOCX from:', url)

    // Buat link untuk download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    console.log('✅ DOCX download started')
  } catch (error) {
    console.error('❌ Error downloading DOCX:', error)
    alert('Gagal download DOCX. Coba lagi atau cek console.')
  }
}
