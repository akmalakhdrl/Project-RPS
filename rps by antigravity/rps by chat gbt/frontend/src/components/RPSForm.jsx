/**
 * RPSFORM.JSX - Komponen Form Input RPS
 * 
 * Komponen ini menampilkan form untuk input data RPS
 * Dengan 3 opsi: Simpan JSON, Download DOCX, Generate AI
 */

import { useState } from 'react'
import { generateRPS } from '../services/api'
import '../styles/RPSForm.css'

function RPSForm({ onRPSGenerated, isLoading, setIsLoading }) {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    namaMataKuliah: '',
    kodeMataKuliah: '',
    semester: '',
    sks: '',
    programStudi: '',
    dosenPengampu: '',
    deskripsiMataKuliah: '',
    cplProdi: '',
    cpmk: '',
    subCpmk: '',
    bahanKajian: '',
    metodePembelajaran: '',
    mediaDanSumber: '',
  })

  // State untuk error message
  const [error, setError] = useState('')

  /**
   * Handle perubahan input
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * Validasi form sebelum submit
   */
  const validateForm = () => {
    if (!formData.namaMataKuliah || !formData.kodeMataKuliah) {
      setError('Nama dan Kode Mata Kuliah wajib diisi!')
      return false
    }
    setError('')
    return true
  }

  /**
   * Format data form menjadi struktur RPS
   */
  const formatFormData = () => {
    return {
      ...formData,
      cplProdi: formData.cplProdi ? formData.cplProdi.split(',').map(s => s.trim()) : [],
      cpmk: formData.cpmk ? formData.cpmk.split(',').map(s => s.trim()) : [],
      bahanKajian: formData.bahanKajian ? formData.bahanKajian.split(',').map(s => s.trim()) : [],
      metodePembelajaran: formData.metodePembelajaran ? formData.metodePembelajaran.split(',').map(s => s.trim()) : [],
      mediaDanSumber: formData.mediaDanSumber ? formData.mediaDanSumber.split(',').map(s => s.trim()) : [],
    }
  }

  /**
   * Simpan langsung ke JSON (tanpa AI)
   */
  const handleSaveJSON = () => {
    if (!validateForm()) return

    const data = formatFormData()
    const rpsData = {
      identitasMataKuliah: {
        namaMataKuliah: data.namaMataKuliah,
        kodeMataKuliah: data.kodeMataKuliah,
        semester: data.semester,
        sks: data.sks,
        programStudi: data.programStudi,
        dosenPengampu: data.dosenPengampu
      },
      deskripsiMataKuliah: data.deskripsiMataKuliah,
      capaianPembelajaran: {
        cplProdi: data.cplProdi,
        cpmk: data.cpmk,
        subCpmk: []
      },
      bahanKajian: data.bahanKajian,
      metodePembelajaran: data.metodePembelajaran,
      mediaDanSumber: data.mediaDanSumber,
      sistemPenilaian: {},
      rencanaPertemuan: [],
      generatedAt: new Date().toISOString(),
      mode: 'manual'
    }

    // Download JSON
    const jsonStr = JSON.stringify(rpsData, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rps_${data.kodeMataKuliah}_${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    alert('✅ File JSON berhasil disimpan!')
  }

  /**
   * Generate DOCX langsung (tanpa AI)
   */
  const handleGenerateDOCX = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setError('')

    try {
      const data = formatFormData()

      // Kirim ke backend untuk generate DOCX saja
      const response = await fetch('http://127.0.0.1:5000/api/rps/generate-docx-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Gagal generate DOCX')
      }

      const result = await response.json()

      // Download DOCX
      const downloadUrl = `http://127.0.0.1:5000/api/rps/download/docx/${result.filename}`
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = result.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      alert('✅ File DOCX berhasil dibuat dan didownload!')

    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Generate dengan AI
   */
  const handleGenerateWithAI = async (e) => {
    if (e) e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError('')

    try {
      const dataToSend = formatFormData()

      // Panggil API
      const result = await generateRPS(dataToSend)

      // Kirim hasil ke parent component
      onRPSGenerated(result)

    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="rps-form-container">
      <h2>📝 Form Input RPS</h2>
      <p className="form-description">
        Isi data mata kuliah di bawah ini. Kamu bisa isi sebagian saja,
        lalu pilih simpan JSON/DOCX, atau lengkapi otomatis dengan AI.
      </p>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <form className="rps-form">
        {/* Identitas Mata Kuliah */}
        <section className="form-section">
          <h3>Identitas Mata Kuliah</h3>

          <div className="form-group">
            <label>Nama Mata Kuliah *</label>
            <input
              type="text"
              name="namaMataKuliah"
              value={formData.namaMataKuliah}
              onChange={handleChange}
              placeholder="Contoh: Pemrograman Web"
              required
            />
          </div>

          <div className="form-group">
            <label>Kode Mata Kuliah *</label>
            <input
              type="text"
              name="kodeMataKuliah"
              value={formData.kodeMataKuliah}
              onChange={handleChange}
              placeholder="Contoh: IF101"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Semester</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Contoh: 3"
              />
            </div>

            <div className="form-group">
              <label>SKS</label>
              <input
                type="text"
                name="sks"
                value={formData.sks}
                onChange={handleChange}
                placeholder="Contoh: 3"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Program Studi</label>
            <input
              type="text"
              name="programStudi"
              value={formData.programStudi}
              onChange={handleChange}
              placeholder="Contoh: Teknik Informatika"
            />
          </div>

          <div className="form-group">
            <label>Dosen Pengampu</label>
            <input
              type="text"
              name="dosenPengampu"
              value={formData.dosenPengampu}
              onChange={handleChange}
              placeholder="Contoh: Dr. John Doe, M.Kom"
            />
          </div>
        </section>

        {/* Deskripsi & Capaian */}
        <section className="form-section">
          <h3>Deskripsi & Capaian Pembelajaran</h3>

          <div className="form-group">
            <label>Deskripsi Mata Kuliah</label>
            <textarea
              name="deskripsiMataKuliah"
              value={formData.deskripsiMataKuliah}
              onChange={handleChange}
              placeholder="Jelaskan secara singkat tentang mata kuliah ini..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>CPL Prodi</label>
            <input
              type="text"
              name="cplProdi"
              value={formData.cplProdi}
              onChange={handleChange}
              placeholder="Pisahkan dengan koma. Contoh: CPL1, CPL2, CPL3"
            />
            <small>Masukkan Capaian Pembelajaran Lulusan, pisahkan dengan koma</small>
          </div>

          <div className="form-group">
            <label>CPMK</label>
            <input
              type="text"
              name="cpmk"
              value={formData.cpmk}
              onChange={handleChange}
              placeholder="Pisahkan dengan koma. Contoh: CPMK1, CPMK2"
            />
            <small>Masukkan Capaian Pembelajaran Mata Kuliah, pisahkan dengan koma</small>
          </div>
        </section>

        {/* Pembelajaran */}
        <section className="form-section">
          <h3>Metode & Sumber Pembelajaran</h3>

          <div className="form-group">
            <label>Bahan Kajian / Materi</label>
            <input
              type="text"
              name="bahanKajian"
              value={formData.bahanKajian}
              onChange={handleChange}
              placeholder="Pisahkan dengan koma. Contoh: HTML, CSS, JavaScript"
            />
          </div>

          <div className="form-group">
            <label>Metode Pembelajaran</label>
            <input
              type="text"
              name="metodePembelajaran"
              value={formData.metodePembelajaran}
              onChange={handleChange}
              placeholder="Pisahkan dengan koma. Contoh: Ceramah, Praktikum, Diskusi"
            />
          </div>

          <div className="form-group">
            <label>Media & Sumber Belajar</label>
            <input
              type="text"
              name="mediaDanSumber"
              value={formData.mediaDanSumber}
              onChange={handleChange}
              placeholder="Pisahkan dengan koma. Contoh: PPT, Video, Buku"
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="form-actions">
          <h3 className="actions-title">📥 Simpan atau Generate RPS</h3>
          <p className="actions-subtitle">Pilih salah satu opsi di bawah ini:</p>

          <div className="action-buttons-grid">
            {/* Tombol Simpan JSON */}
            <button
              type="button"
              onClick={handleSaveJSON}
              className="btn-action btn-json"
              disabled={isLoading}
            >
              <span className="btn-icon">💾</span>
              <div className="btn-text">
                <strong>Simpan JSON</strong>
                <small>Simpan data form tanpa AI</small>
              </div>
            </button>

            {/* Tombol Generate DOCX */}
            <button
              type="button"
              onClick={handleGenerateDOCX}
              className="btn-action btn-docx"
              disabled={isLoading}
            >
              <span className="btn-icon">📝</span>
              <div className="btn-text">
                <strong>Download DOCX</strong>
                <small>Buat file Word tanpa AI</small>
              </div>
            </button>

            {/* Tombol Generate dengan AI */}
            <button
              type="button"
              onClick={handleGenerateWithAI}
              className="btn-action btn-ai"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <div className="btn-text">
                    <strong>Generating...</strong>
                    <small>Mohon tunggu</small>
                  </div>
                </>
              ) : (
                <>
                  <span className="btn-icon">🤖</span>
                  <div className="btn-text">
                    <strong>Generate dengan AI</strong>
                    <small>Lengkapi RPS otomatis</small>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="loading-message">
            ⏳ Sedang memproses, mohon tunggu...
          </div>
        )}
      </form>
    </div>
  )
}

export default RPSForm
