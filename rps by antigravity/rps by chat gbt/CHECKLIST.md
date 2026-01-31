# ✅ CHECKLIST - Setup & Testing Sistem RPS

Gunakan checklist ini untuk memastikan semua berjalan dengan baik!

---

## 📦 PERSIAPAN AWAL

### Prasyarat
- [ ] Node.js sudah terinstall (versi 16+)
- [ ] npm sudah terinstall
- [ ] Text editor sudah siap (VS Code/Notepad++/dll)
- [ ] Akun OpenAI sudah dibuat
- [ ] OpenAI API Key sudah didapat
- [ ] File proyek sudah di-extract

**Cek versi:**
```bash
node --version
npm --version
```

---

## 🔧 SETUP BACKEND

### 1. Navigasi ke Folder Backend
- [ ] Buka terminal/command prompt
- [ ] Masuk ke folder: `cd backend`

### 2. Install Dependencies
- [ ] Jalankan: `npm install`
- [ ] Tunggu sampai selesai (1-2 menit)
- [ ] Pastikan tidak ada error merah

### 3. Konfigurasi Environment
- [ ] Copy file: `copy .env.example .env` (Windows)
  atau: `cp .env.example .env` (Mac/Linux)
- [ ] Buka file `.env` dengan text editor
- [ ] Isi `OPENAI_API_KEY=` dengan API key kamu
- [ ] Pastikan `PORT=5000` tetap 5000
- [ ] Save file `.env`

### 4. Test Backend
- [ ] Jalankan: `npm start`
- [ ] Lihat pesan: "🚀 Server RPS berjalan di http://localhost:5000"
- [ ] Buka browser: http://localhost:5000
- [ ] Pastikan muncul JSON response (bukan error)
- [ ] **JANGAN TUTUP TERMINAL INI!**

**✅ Backend Success!**

---

## ⚛️ SETUP FRONTEND

### 1. Buka Terminal Baru
- [ ] Buka terminal/command prompt BARU
- [ ] **Jangan tutup terminal backend!**

### 2. Navigasi ke Folder Frontend
- [ ] Masuk ke folder: `cd frontend`

### 3. Install Dependencies
- [ ] Jalankan: `npm install`
- [ ] Tunggu sampai selesai (1-2 menit)
- [ ] Pastikan tidak ada error merah

### 4. Jalankan Frontend
- [ ] Jalankan: `npm run dev`
- [ ] Lihat pesan dengan URL lokal (biasanya port 3000)
- [ ] Browser akan terbuka otomatis
- [ ] Atau buka manual: http://localhost:3000

**✅ Frontend Success!**

---

## 🧪 TESTING APLIKASI

### Test Case 1: Form Input
- [ ] Form input terlihat dengan jelas
- [ ] Semua field bisa diklik dan diketik
- [ ] Placeholder text terlihat
- [ ] Tombol "Generate RPS" terlihat

### Test Case 2: Generate RPS Sederhana
- [ ] Isi field "Nama Mata Kuliah": `Pemrograman Web`
- [ ] Isi field "Kode Mata Kuliah": `IF101`
- [ ] Isi field "Semester": `3`
- [ ] Isi field "SKS": `3`
- [ ] Klik tombol "Generate RPS dengan AI"
- [ ] Loading indicator muncul
- [ ] Tunggu 10-30 detik
- [ ] Preview RPS muncul

### Test Case 3: Download Files
- [ ] Tombol "Download JSON" terlihat dan bisa diklik
- [ ] Klik "Download JSON" → file JSON terdownload
- [ ] Buka file JSON dengan text editor → isinya ada
- [ ] Tombol "Download DOCX" terlihat dan bisa diklik
- [ ] Klik "Download DOCX" → file Word terdownload
- [ ] Buka file DOCX dengan Microsoft Word → isinya ada dan terformat

### Test Case 4: Generate RPS Lengkap
- [ ] Klik tombol "Buat RPS Baru"
- [ ] Form input muncul kembali
- [ ] Isi SEMUA field form dengan data lengkap
- [ ] Generate ulang
- [ ] Hasil lebih lengkap dari test case 2
- [ ] Download dan cek file

### Test Case 5: Error Handling
- [ ] Kosongkan semua field
- [ ] Klik "Generate RPS"
- [ ] Error message muncul: "Data mata kuliah tidak lengkap"
- [ ] Tidak ada crash

**✅ Testing Complete!**

---

## 🔍 VERIFIKASI BACKEND

### Cek File Output
- [ ] Buka folder: `backend/outputs/`
- [ ] Ada file JSON: `rps_IF101_[timestamp].json`
- [ ] Ada file DOCX: `rps_IF101_[timestamp].docx`
- [ ] Buka file JSON → format JSON valid
- [ ] Buka file DOCX → dokumen terformat rapi

### Cek Console Log
- [ ] Terminal backend menunjukkan log request
- [ ] Ada log: "📝 Menerima request generate RPS..."
- [ ] Ada log: "🤖 Memproses dengan AI..."
- [ ] Ada log: "✅ RPS berhasil digenerate!"
- [ ] Tidak ada error merah

**✅ Backend Verified!**

---

## 🎨 VERIFIKASI FRONTEND

### Cek Visual
- [ ] Header berwarna biru dengan gradient
- [ ] Form terlihat rapi dalam card putih
- [ ] Button hover effect bekerja
- [ ] Responsive: coba resize browser → layout adjust
- [ ] No console error di browser DevTools (F12)

### Cek Fungsionalitas
- [ ] Input field bisa di-edit
- [ ] Button disabled saat loading
- [ ] Loading spinner muncul saat generate
- [ ] Smooth transition form → result
- [ ] Back to form button bekerja

**✅ Frontend Verified!**

---

## 📊 CHECKLIST AKHIR

### Code Quality
- [ ] Semua file ada (tidak ada yang hilang)
- [ ] Tidak ada typo di nama file/folder
- [ ] README.md bisa dibuka dan jelas
- [ ] Code terstruktur rapi

### Dokumentasi
- [ ] README.md ada dan lengkap
- [ ] backend/README.md ada
- [ ] frontend/README.md ada
- [ ] QUICK_START.md ada
- [ ] ARSITEKTUR.txt ada
- [ ] Comments di code jelas

### Security
- [ ] File .env TIDAK di-commit ke Git
- [ ] File .gitignore ada di backend & frontend
- [ ] API Key tidak hardcode di code
- [ ] node_modules tidak di-commit

### Deployment Ready
- [ ] Backend bisa jalan standalone
- [ ] Frontend bisa jalan standalone
- [ ] Keduanya bisa komunikasi
- [ ] Semua dependencies terinstall

**✅ Project Complete!**

---

## 🐛 TROUBLESHOOTING CHECKLIST

### Jika Backend Error
- [ ] Cek API Key OpenAI valid
- [ ] Cek saldo OpenAI cukup
- [ ] Cek port 5000 tidak dipakai app lain
- [ ] Cek file .env ada dan format benar
- [ ] Restart backend: Ctrl+C, lalu npm start

### Jika Frontend Error
- [ ] Cek backend sudah jalan
- [ ] Cek URL di api.js: http://localhost:5000
- [ ] Clear browser cache: Ctrl+Shift+R
- [ ] Cek browser console (F12) untuk error
- [ ] Restart frontend: Ctrl+C, lalu npm run dev

### Jika AI Response Lambat
- [ ] Normal, OpenAI kadang lambat (10-60 detik)
- [ ] Cek koneksi internet
- [ ] Coba ulang beberapa kali
- [ ] Cek status OpenAI: https://status.openai.com

### Jika Download Error
- [ ] Cek folder backend/outputs/ ada
- [ ] Cek file ada di outputs/
- [ ] Coba generate ulang
- [ ] Cek permission folder (baca/tulis)

---

## 📝 CATATAN PENTING

1. **Jangan commit file .env ke Git!**
2. **Jangan share API Key ke orang lain!**
3. **Backup code secara berkala**
4. **Test setiap perubahan yang kamu buat**
5. **Baca dokumentasi jika ada yang bingung**

---

## 🎓 UNTUK PRESENTASI/DEMO

### Persiapan Demo
- [ ] Backend & frontend sudah jalan
- [ ] Browser dibuka di tab RPS
- [ ] Data contoh sudah disiapkan
- [ ] File hasil sudah ada (backup)

### Script Demo
1. Jelaskan konsep sistem (5 menit)
2. Show arsitektur diagram (2 menit)
3. Demo live: isi form → generate → download (5 menit)
4. Show code (frontend & backend) (5 menit)
5. Q&A (sisanya)

### Files untuk Ditunjukkan
- [ ] README.md → Overview proyek
- [ ] ARSITEKTUR.txt → Diagram & penjelasan
- [ ] backend/server.js → Entry point backend
- [ ] frontend/src/App.jsx → Entry point frontend
- [ ] File hasil (.json & .docx)

---

## ✨ SELAMAT!

Jika semua checklist ✅, berarti sistem RPS kamu **BERHASIL** dan **SIAP DIGUNAKAN**! 🎉

Semangat untuk projek kuliahnya! 💪🚀

---

**Tips Terakhir:**
- Simpan checklist ini untuk referensi
- Jika ada error, cek troubleshooting section
- Baca dokumentasi untuk detail lebih lanjut
- Jangan ragu untuk eksperimen dengan code!

**Happy Coding! 🎓**
