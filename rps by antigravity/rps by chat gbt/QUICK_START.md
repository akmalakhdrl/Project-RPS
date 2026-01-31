# 🚀 Quick Start Guide - Sistem RPS

Panduan singkat untuk menjalankan aplikasi dalam 5 menit!

## 📋 Persiapan

Yang kamu butuhkan:
- ✅ Node.js (download di https://nodejs.org)
- ✅ OpenAI API Key (daftar di https://platform.openai.com)
- ✅ Text editor (VS Code, Notepad++, dll)

## 🎯 Langkah Cepat

### 1️⃣ Setup Backend (3 menit)

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Copy file config
copy .env.example .env
# Mac/Linux: cp .env.example .env

# Buka file .env dengan text editor, isi API Key:
# OPENAI_API_KEY=sk-xxxxxxxx
# PORT=5000

# Jalankan server
npm start
```

✅ Backend jalan di **http://localhost:5000**

---

### 2️⃣ Setup Frontend (2 menit)

**Buka terminal baru** (jangan tutup terminal backend!)

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

✅ Frontend jalan di **http://localhost:3000**
✅ Browser akan terbuka otomatis

---

## 🎉 Selesai!

Sekarang kamu bisa:
1. Isi form RPS
2. Klik "Generate RPS dengan AI"
3. Download hasil (JSON & DOCX)

---

## ⚡ Command Lengkap (Copy-Paste)

### Windows
```bash
# Terminal 1 - Backend
cd backend
npm install
copy .env.example .env
# Edit .env, isi OPENAI_API_KEY
npm start

# Terminal 2 - Frontend (terminal baru)
cd frontend
npm install
npm run dev
```

### Mac/Linux
```bash
# Terminal 1 - Backend
cd backend
npm install
cp .env.example .env
# Edit .env, isi OPENAI_API_KEY
npm start

# Terminal 2 - Frontend (terminal baru)
cd frontend
npm install
npm run dev
```

---

## 🐛 Troubleshooting Cepat

| Problem | Solution |
|---------|----------|
| Command not found: npm | Install Node.js dulu |
| Port already in use | Ganti PORT di .env backend |
| OpenAI API error | Cek API Key valid & ada saldo |
| Cannot connect to backend | Pastikan backend jalan di port 5000 |

---

## 📚 Dokumentasi Lengkap

- **README utama**: `README.md`
- **Backend**: `backend/README.md`
- **Frontend**: `frontend/README.md`

---

**Need help?** Baca dokumentasi lengkap atau tanya dosen! 🙋‍♂️
