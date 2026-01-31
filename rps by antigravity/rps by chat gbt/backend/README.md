# 🔧 BACKEND - Sistem RPS

Backend untuk aplikasi Rencana Pembelajaran Semester (RPS) menggunakan Node.js, Express, dan OpenAI.

## 📁 Struktur Folder

```
backend/
├── server.js              # File utama server
├── package.json           # Daftar dependencies
├── .env.example          # Template konfigurasi
├── routes/               # Definisi endpoint API
│   └── rpsRoutes.js
├── controllers/          # Logika bisnis
│   └── rpsController.js
├── services/             # Service layer
│   ├── aiService.js     # Integrasi OpenAI
│   └── docxService.js   # Generate DOCX
└── outputs/              # Folder file hasil generate
```

## 🚀 Cara Menjalankan Backend

### 1. Install Dependencies

Buka terminal di folder `backend`, lalu jalankan:

```bash
npm install
```

Ini akan menginstall semua library yang dibutuhkan (express, openai, docx, dll).

### 2. Setup API Key OpenAI

1. Copy file `.env.example` menjadi `.env`:
   ```bash
   copy .env.example .env
   ```

2. Buka file `.env` dan isi dengan API Key OpenAI kamu:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
   PORT=5000
   ```

3. Cara dapat API Key OpenAI:
   - Buka https://platform.openai.com/api-keys
   - Login/daftar akun
   - Buat API key baru
   - Copy dan paste ke file .env

### 3. Jalankan Server

```bash
npm start
```

Atau untuk development (auto-restart saat ada perubahan):

```bash
npm run dev
```

Server akan berjalan di: **http://localhost:5000**

## 📡 Endpoint API

### 1. Test Server
- **URL**: `GET http://localhost:5000/`
- **Fungsi**: Cek apakah server berjalan

### 2. Generate RPS
- **URL**: `POST http://localhost:5000/api/rps/generate`
- **Fungsi**: Generate RPS menggunakan AI
- **Body** (JSON):
```json
{
  "namaMataKuliah": "Pemrograman Web",
  "kodeMataKuliah": "IF101",
  "semester": "3",
  "sks": "3",
  "programStudi": "Teknik Informatika",
  "dosenPengampu": "Dr. John Doe",
  "deskripsiMataKuliah": "Mata kuliah tentang...",
  "cplProdi": ["CPL 1", "CPL 2"],
  "cpmk": ["CPMK 1", "CPMK 2"]
}
```

### 3. Download JSON
- **URL**: `GET http://localhost:5000/api/rps/download/json/:filename`
- **Fungsi**: Download file JSON hasil generate

### 4. Download DOCX
- **URL**: `GET http://localhost:5000/api/rps/download/docx/:filename`
- **Fungsi**: Download file Word hasil generate

## 🧠 Penjelasan Alur Kerja

1. **Frontend** kirim data form ke endpoint `/api/rps/generate`
2. **Controller** terima data dan panggil AI Service
3. **AI Service** kirim prompt ke OpenAI dan terima hasil
4. **Controller** simpan hasil ke file JSON dan panggil DOCX Service
5. **DOCX Service** buat file Word dari data RPS
6. **Controller** kirim response ke frontend dengan nama file
7. **Frontend** bisa download file via endpoint download

## 📦 Dependencies

- **express**: Framework web untuk Node.js
- **cors**: Mengizinkan request dari domain berbeda (frontend)
- **dotenv**: Membaca file .env untuk konfigurasi
- **openai**: Library untuk komunikasi dengan OpenAI API
- **docx**: Library untuk membuat file Word (.docx)

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Pastikan sudah run `npm install`

### Error: "OpenAI API key required"
- Cek file `.env` sudah ada dan berisi API key yang valid

### Error: Port already in use
- Ganti PORT di file `.env` ke nomor lain (misal 5001)

### AI response tidak sesuai
- Cek prompt di `services/aiService.js`
- Sesuaikan parameter temperature dan max_tokens

## 📝 Catatan untuk Belajar

### Konsep MVC (Model-View-Controller)
Backend ini menggunakan pola arsitektur yang terorganisir:

- **Routes** = Peta jalan (URL apa saja yang tersedia)
- **Controllers** = Otak (logika apa yang dijalankan)
- **Services** = Pekerja (melakukan tugas spesifik seperti panggil AI)

### Async/Await
Banyak fungsi menggunakan `async/await`:
```javascript
async function contoh() {
  const hasil = await functionYangLama();
  console.log(hasil);
}
```
Ini untuk menunggu proses yang butuh waktu (seperti API call).

### Try-Catch
Digunakan untuk menangani error:
```javascript
try {
  // kode yang mungkin error
} catch (error) {
  // apa yang dilakukan kalau error
}
```

## 🎓 Tips Belajar

1. Mulai dari `server.js` → pahami cara server jalan
2. Lanjut ke `routes` → lihat endpoint apa saja
3. Masuk ke `controllers` → lihat logika bisnis
4. Pelajari `services` → lihat integrasi AI dan DOCX

Selamat belajar! 🚀
