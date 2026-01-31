/**
 * RPSRESULT.JSX - Komponen Tampilan Hasil RPS
 * 
 * Komponen ini menampilkan hasil RPS yang sudah digenerate
 * Menyediakan tombol download JSON dan DOCX
 */

import { downloadJSON, downloadDOCX } from '../services/api'
import '../styles/RPSResult.css'

function RPSResult({ result, onNewRPS }) {
  const { data, files } = result

  /**
   * Handle simpan/download JSON
   */
  const handleDownloadJSON = () => {
    console.log('📥 Downloading JSON:', files.json)
    downloadJSON(files.json)
  }

  /**
   * Handle download DOCX
   */
  const handleDownloadDOCX = () => {
    console.log('📥 Downloading DOCX:', files.docx)
    downloadDOCX(files.docx)
  }

  /**
   * Handle simpan JSON secara manual (alternative method)
   */
  const handleSaveJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rps_${data.identitasMataKuliah?.kodeMataKuliah}_${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rps-result-container">
      <div className="result-header">
        <h2>✅ RPS Berhasil Digenerate!</h2>
        <button onClick={onNewRPS} className="btn-new">
          ➕ Buat RPS Baru
        </button>
      </div>

      {/* Action Buttons - LEBIH JELAS */}
      <div className="download-section">
        <h3>💾 Simpan & Download Hasil RPS</h3>
        <p className="download-info">
          Klik tombol di bawah untuk menyimpan RPS dalam format yang kamu inginkan
        </p>
        
        <div className="download-buttons">
          {/* Tombol Download JSON dari Server */}
          <button onClick={handleDownloadJSON} className="btn-download btn-json">
            <span className="btn-icon">📄</span>
            <div className="btn-content">
              <strong>Download JSON (dari Server)</strong>
              <small>File JSON untuk data terstruktur</small>
            </div>
          </button>

          {/* Tombol Simpan JSON Langsung */}
          <button onClick={handleSaveJSON} className="btn-download btn-json-save">
            <span className="btn-icon">💾</span>
            <div className="btn-content">
              <strong>Simpan JSON (Langsung)</strong>
              <small>Simpan data RPS ke komputer kamu</small>
            </div>
          </button>

          {/* Tombol Download DOCX */}
          <button onClick={handleDownloadDOCX} className="btn-download btn-docx">
            <span className="btn-icon">📝</span>
            <div className="btn-content">
              <strong>Download DOCX (Word)</strong>
              <small>File Word siap cetak & edit</small>
            </div>
          </button>
        </div>

        {/* Info file yang tersedia */}
        {files && (
          <div className="files-info">
            <p><strong>📁 File yang tersedia:</strong></p>
            <ul>
              <li>✅ JSON: {files.json}</li>
              <li>✅ DOCX: {files.docx}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Preview RPS */}
      <div className="rps-preview">
        <h3>👁️ Preview RPS</h3>
        
        {/* Identitas */}
        <section className="preview-section">
          <h4>Identitas Mata Kuliah</h4>
          <div className="info-grid">
            <div className="info-item">
              <strong>Nama:</strong>
              <span>{data.identitasMataKuliah?.namaMataKuliah}</span>
            </div>
            <div className="info-item">
              <strong>Kode:</strong>
              <span>{data.identitasMataKuliah?.kodeMataKuliah}</span>
            </div>
            <div className="info-item">
              <strong>Semester:</strong>
              <span>{data.identitasMataKuliah?.semester}</span>
            </div>
            <div className="info-item">
              <strong>SKS:</strong>
              <span>{data.identitasMataKuliah?.sks}</span>
            </div>
            <div className="info-item">
              <strong>Program Studi:</strong>
              <span>{data.identitasMataKuliah?.programStudi}</span>
            </div>
            <div className="info-item">
              <strong>Dosen:</strong>
              <span>{data.identitasMataKuliah?.dosenPengampu}</span>
            </div>
          </div>
        </section>

        {/* Deskripsi */}
        <section className="preview-section">
          <h4>Deskripsi Mata Kuliah</h4>
          <p className="description">{data.deskripsiMataKuliah}</p>
        </section>

        {/* CPL Prodi */}
        {data.capaianPembelajaran?.cplProdi?.length > 0 && (
          <section className="preview-section">
            <h4>CPL Prodi</h4>
            <ul className="list">
              {data.capaianPembelajaran.cplProdi.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* CPMK */}
        {data.capaianPembelajaran?.cpmk?.length > 0 && (
          <section className="preview-section">
            <h4>CPMK</h4>
            <ul className="list">
              {data.capaianPembelajaran.cpmk.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Sub-CPMK */}
        {data.capaianPembelajaran?.subCpmk?.length > 0 && (
          <section className="preview-section">
            <h4>Sub-CPMK</h4>
            {data.capaianPembelajaran.subCpmk.map((item, index) => (
              <div key={index} className="sub-cpmk">
                <strong>CPMK {item.cpmk}:</strong>
                <ul className="list">
                  {item.sub?.map((subItem, subIndex) => (
                    <li key={subIndex}>{subItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Bahan Kajian */}
        {data.bahanKajian?.length > 0 && (
          <section className="preview-section">
            <h4>Bahan Kajian</h4>
            <ul className="list">
              {data.bahanKajian.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Metode */}
        {data.metodePembelajaran?.length > 0 && (
          <section className="preview-section">
            <h4>Metode Pembelajaran</h4>
            <ul className="list">
              {data.metodePembelajaran.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Media */}
        {data.mediaDanSumber?.length > 0 && (
          <section className="preview-section">
            <h4>Media dan Sumber Belajar</h4>
            <ul className="list">
              {data.mediaDanSumber.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Penilaian */}
        {data.sistemPenilaian && Object.keys(data.sistemPenilaian).length > 0 && (
          <section className="preview-section">
            <h4>Sistem Penilaian</h4>
            <div className="penilaian-grid">
              {Object.entries(data.sistemPenilaian).map(([key, value]) => (
                <div key={key} className="penilaian-item">
                  <span className="penilaian-label">{key}:</span>
                  <span className="penilaian-value">{value}%</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rencana Pertemuan */}
        {data.rencanaPertemuan?.length > 0 && (
          <section className="preview-section">
            <h4>Rencana Pembelajaran Mingguan</h4>
            <div className="pertemuan-list">
              {data.rencanaPertemuan.map((pertemuan, index) => (
                <div key={index} className="pertemuan-item">
                  <div className="pertemuan-header">
                    <strong>Minggu {pertemuan.minggu}</strong>
                    <span className="waktu">{pertemuan.waktu}</span>
                  </div>
                  <div className="pertemuan-content">
                    <p><strong>Materi:</strong> {pertemuan.materi}</p>
                    <p><strong>Metode:</strong> {pertemuan.metode}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer info */}
      <div className="result-footer">
        <p>
          📅 Generated pada: {new Date(data.generatedAt).toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  )
}

export default RPSResult
