/**
 * APP.JSX - Komponen Utama Aplikasi
 * 
 * File ini adalah komponen utama yang mengatur tampilan keseluruhan
 * Menggunakan state untuk manage data form dan hasil RPS
 */

import { useState } from 'react'
import RPSForm from './components/RPSForm'
import RPSResult from './components/RPSResult'
import './styles/App.css'

function App() {
  // State untuk menyimpan hasil generate RPS
  const [rpsResult, setRpsResult] = useState(null)
  
  // State untuk loading indicator
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Fungsi yang dipanggil saat RPS berhasil digenerate
   * @param {Object} result - Hasil dari backend
   */
  const handleRPSGenerated = (result) => {
    setRpsResult(result)
    setIsLoading(false)
  }

  /**
   * Fungsi untuk reset dan buat RPS baru
   */
  const handleNewRPS = () => {
    setRpsResult(null)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>🎓 Sistem Rencana Pembelajaran Semester</h1>
        <p>Generator RPS dengan bantuan AI</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Tampilkan form jika belum ada hasil */}
        {!rpsResult && (
          <RPSForm 
            onRPSGenerated={handleRPSGenerated}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {/* Tampilkan hasil jika sudah ada */}
        {rpsResult && (
          <RPSResult 
            result={rpsResult}
            onNewRPS={handleNewRPS}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 Sistem RPS - Projek Kuliah</p>
      </footer>
    </div>
  )
}

export default App
