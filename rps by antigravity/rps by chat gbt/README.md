# 🎓 Sistem Rencana Pembelajaran Semester (RPS)

Aplikasi web untuk menyusun dokumen Rencana Pembelajaran Semester secara otomatis dengan bantuan AI (OpenAI GPT).

## 📋 Deskripsi Proyek

Sistem ini membantu dosen dalam menyusun RPS secara terstruktur dan efisien. Dosen hanya perlu mengisi form dengan data mata kuliah, kemudian AI akan membantu:
- Melengkapi deskripsi mata kuliah
- Generate capaian pembelajaran (CPL, CPMK, Sub-CPMK)
- Menyusun bahan kajian dan metode pembelajaran
- Membuat rencana pembelajaran per minggu (16 pertemuan)
- Generate sistem penilaian

Hasil RPS dapat diunduh dalam format **JSON** dan **DOCX (Microsoft Word)**.

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│            (React + Vite)                        │
│  ┌──────────────┐        ┌──────────────┐       │
│  │   RPSForm    │───────▶│  RPSResult   │       │
│  └──────────────┘        └──────────────┘       │
│          │                       │               │
│          │                       │               │
│          ▼                       ▼               │
│     [API Service]           [Download]           │
└─────────────────────────────────────────────────┘
                    │
                    │ HTTP Request
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│                   BACKEND                        │
│          (Node.js + Express)                     │
│  ┌──────────────────────────────────────────┐   │
│  │            RPS Controller                 │   │
│  └──────────────────────────────────────────┘   │
│          │                       │               │
│          ▼                       ▼               │
│  ┌─────────────┐         ┌─────────────┐        │
│  │ AI Service  │         │ DOCX Service│        │
│  │  (OpenAI)   │         │  (Word Gen) │        │
│  └─────────────┘         └─────────────┘        │
│          │                       │               │
│          ▼                       ▼               │
│     [JSON Output]          [DOCX Output]         │
└─────────────────────────────────────────────────┘
```

## 📁 Struktur Proyek

```
rps by chat gbt/
├── backend/              # Backend (Node.js)
│   ├── server.js        # File utama server
│   ├── package.json     # Dependencies backend
│   ├── .env.example     # Template config
│   ├── routes/          # Endpoint API
│   ├── controllers/     # Logika bisnis
│   ├── services/        # AI & DOCX service
│   ├── outputs/         # File hasil generate
│   └── README.md        # Dokumentasi backend
│
├── frontend/            # Frontend (React)
│   ├── index.html       # HTML utama
│   ├── package.json     # Dependencies frontend
│   ├── vite.config.js   # Config Vite
│   ├── src/
│   │   ├── main.jsx     # Entry point
│   │   ├── App.jsx      # Komponen utama
│   │   ├── components/  # Komponen React
│   │   ├── services/    # API service
│   │   └── styles/      # CSS files
│   └── README.md        # Dokumentasi frontend
│
└── README.md            # File ini
```

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat

Pastikan sudah terinstall:
- **Node.js** (versi 16 atau lebih baru)
- **npm** (biasanya sudah include dengan Node.js)
- **OpenAI API Key** (daftar di https://platform.openai.com)

Cek versi Node.js:
```bash
node --version
npm --version
```

### Langkah 1: Setup Backend

1. **Masuk ke folder backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup API Key OpenAI:**
   - Copy file `.env.example` menjadi `.env`
   - Buka file `.env` dan isi dengan API Key kamu:
     ```
     OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
     PORT=5000
     ```

4. **Jalankan server backend:**
   ```bash
   npm start
   ```
   
   Backend akan jalan di: **http://localhost:5000**

### Langkah 2: Setup Frontend

1. **Buka terminal BARU** (jangan tutup terminal backend)

2. **Masuk ke folder frontend:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Jalankan development server:**
   ```bash
   npm run dev
   ```

   Frontend akan jalan di: **http://localhost:3000**
   Browser akan terbuka otomatis.

### Langkah 3: Mulai Menggunakan

1. Buka browser ke **http://localhost:3000**
2. Isi form dengan data mata kuliah
3. Klik tombol "Generate RPS dengan AI"
4. Tunggu beberapa detik (AI sedang bekerja)
5. Lihat hasilnya dan download file JSON atau DOCX

## ✨ Fitur Utama

- ✅ **Form Input Lengkap** - Input semua data mata kuliah
- ✅ **AI-Powered** - Generate konten RPS otomatis dengan OpenAI
- ✅ **Preview Real-time** - Lihat hasil RPS langsung di browser
- ✅ **Export JSON** - Download data terstruktur untuk integrasi
- ✅ **Export DOCX** - Download dokumen Word siap cetak
- ✅ **Responsive Design** - Bisa diakses dari mobile/tablet
- ✅ **User Friendly** - Interface simpel dan mudah digunakan

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Web framework
- **OpenAI API** - AI untuk generate konten
- **docx** - Library untuk membuat file Word
- **axios** - HTTP client (di frontend)

### Frontend
- **React 18** - Library UI
- **Vite** - Build tool (lebih cepat dari webpack)
- **CSS3** - Styling (tanpa framework CSS)
- **Axios** - Komunikasi dengan backend

## 📖 API Endpoints

### 1. Generate RPS
```
POST /api/rps/generate
Body: {
  namaMataKuliah, kodeMataKuliah, semester, sks,
  programStudi, dosenPengampu, deskripsiMataKuliah,
  cplProdi, cpmk, bahanKajian, metodePembelajaran, mediaDanSumber
}
Response: { success, message, data, files }
```

### 2. Download JSON
```
GET /api/rps/download/json/:filename
Response: File JSON
```

### 3. Download DOCX
```
GET /api/rps/download/docx/:filename
Response: File DOCX
```

## 🔧 Troubleshooting

### Backend tidak bisa jalan
- Cek apakah Node.js sudah terinstall: `node --version`
- Cek apakah dependencies sudah diinstall: `npm install`
- Cek API Key OpenAI di file `.env`

### Frontend tidak connect ke backend
- Pastikan backend sudah jalan di port 5000
- Cek console browser (F12) untuk error
- Cek URL backend di `frontend/src/services/api.js`

### AI response error
- Cek API Key OpenAI valid
- Cek saldo/credit OpenAI cukup
- Cek koneksi internet

### File tidak bisa didownload
- Cek folder `backend/outputs` sudah ada
- Cek permission folder (Windows: read/write access)

## 📚 Dokumentasi Lengkap

Untuk dokumentasi detail, baca:
- **Backend**: `backend/README.md`
- **Frontend**: `frontend/README.md`

## 🎓 Untuk Belajar

### Backend (Node.js)
1. Mulai dari `backend/server.js` - Pahami cara server jalan
2. Lihat `backend/routes/rpsRoutes.js` - Pahami routing
3. Pelajari `backend/controllers/rpsController.js` - Pahami logika bisnis
4. Baca `backend/services/aiService.js` - Pahami integrasi AI

### Frontend (React)
1. Mulai dari `frontend/src/main.jsx` - Entry point
2. Lihat `frontend/src/App.jsx` - Komponen utama
3. Pelajari `frontend/src/components/RPSForm.jsx` - Form handling
4. Baca `frontend/src/services/api.js` - API communication

## 🔐 Keamanan

⚠️ **PENTING untuk Production:**
- Jangan commit file `.env` ke Git
- Simpan API Key dengan aman
- Gunakan HTTPS untuk production
- Tambahkan rate limiting
- Validasi input di server side

## 🚧 Pengembangan Selanjutnya

Ide fitur tambahan:
- [ ] Authentication & login dosen
- [ ] Database untuk simpan RPS
- [ ] Template RPS per universitas
- [ ] Export ke PDF
- [ ] Edit RPS yang sudah dibuat
- [ ] Riwayat RPS
- [ ] Collaboration (multi-dosen)
- [ ] Import dari Excel/CSV

## 📝 Lisensi

Projek ini untuk keperluan **edukasi/kuliah**.

## 👨‍💻 Kontributor

Projek kuliah - Sistem RPS dengan AI

---

## 🆘 Butuh Bantuan?

Jika ada error atau bingung:
1. Baca dokumentasi di folder `backend/` dan `frontend/`
2. Cek console untuk error message
3. Google error message
4. Tanya dosen/teman

**Happy Coding! 🚀**
