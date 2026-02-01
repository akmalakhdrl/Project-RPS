# ⚛️ FRONTEND - Sistem RPS

Frontend untuk aplikasi Rencana Pembelajaran Semester (RPS) menggunakan React + Vite.

## 📁 Struktur Folder

```
frontend/
├── index.html            # File HTML utama
├── package.json          # Daftar dependencies
├── vite.config.js        # Konfigurasi Vite
└── src/
    ├── main.jsx          # Entry point React
    ├── App.jsx           # Komponen utama
    ├── components/       # Komponen React
    │   ├── RPSForm.jsx   # Form input RPS
    │   └── RPSResult.jsx # Tampilan hasil RPS
    ├── services/         # Service layer
    │   └── api.js        # Komunikasi dengan backend
    └── styles/           # File CSS
        ├── index.css     # Global styles
        ├── App.css       # Style App
        ├── RPSForm.css   # Style Form
        └── RPSResult.css # Style Result
```

## 🚀 Cara Menjalankan Frontend

### 1. Install Dependencies

Buka terminal di folder `frontend`, lalu jalankan:

```bash
npm install
```

### 2. Jalankan Development Server

```bash
npm run dev
```

Frontend akan berjalan di: **http://localhost:3000**

Browser akan terbuka otomatis.

### 3. Build untuk Production

Jika mau build untuk production:

```bash
npm run build
```

Hasil build ada di folder `dist/`

## 🔗 Koneksi ke Backend

Frontend berkomunikasi dengan backend melalui file `src/services/api.js`.

Default URL backend: `http://localhost:5000`

Jika backend berjalan di URL/port lain, ubah di file `api.js`:

```javascript
const API_URL = 'http://localhost:5000/api/rps'
```

## 📱 Fitur Frontend

### 1. Form Input RPS
- Input identitas mata kuliah
- Input deskripsi dan capaian pembelajaran
- Input metode dan sumber belajar
- Validasi form
- Loading indicator saat generate

### 2. Tampilan Hasil
- Preview RPS lengkap
- Download JSON
- Download DOCX (Word)
- Tombol buat RPS baru

## 🧩 Penjelasan Komponen

### App.jsx (Komponen Utama)
Komponen ini adalah "wadah" utama yang mengatur:
- State management (data RPS, loading)
- Switching antara form dan hasil
- Layout keseluruhan aplikasi

```jsx
function App() {
  const [rpsResult, setRpsResult] = useState(null)
  // Jika rpsResult null = tampilkan form
  // Jika rpsResult ada data = tampilkan hasil
}
```

### RPSForm.jsx (Komponen Form)
Komponen untuk input data:
- Manage state form (formData)
- Handle perubahan input
- Validasi data
- Kirim data ke backend

```jsx
const handleSubmit = async (e) => {
  // 1. Validasi form
  // 2. Format data
  // 3. Panggil API backend
  // 4. Kirim hasil ke parent (App)
}
```

### RPSResult.jsx (Komponen Hasil)
Komponen untuk menampilkan hasil:
- Menampilkan data RPS
- Tombol download JSON dan DOCX
- Tombol buat RPS baru

### api.js (Service)
File ini berisi fungsi untuk komunikasi dengan backend:

```javascript
// Generate RPS
export const generateRPS = async (rpsData) => {
  const response = await axios.post(`${API_URL}/generate`, rpsData)
  return response.data
}

// Download file
export const downloadJSON = (filename) => {
  window.open(`${API_URL}/download/json/${filename}`, '_blank')
}
```

## 🎨 Styling

Styling menggunakan CSS murni (tidak pakai library).

### Konsep CSS Variables
Di `index.css` ada CSS variables untuk konsistensi:

```css
:root {
  --primary-color: #2563eb;
  --spacing-md: 1.5rem;
  --radius-md: 0.5rem;
}
```

Variable ini dipakai di seluruh CSS file:

```css
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

### Responsive Design
Semua komponen responsive menggunakan media queries:

```css
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
```

## 🔄 Alur Kerja Frontend

1. **User** isi form di `RPSForm`
2. **RPSForm** kirim data ke backend via `api.js`
3. **Backend** proses dengan AI, return hasil
4. **RPSForm** kirim hasil ke `App` via callback
5. **App** update state dan tampilkan `RPSResult`
6. **RPSResult** tampilkan preview dan tombol download

## 📦 Dependencies

- **react**: Library UI
- **react-dom**: Render React ke DOM
- **axios**: HTTP client untuk API calls
- **vite**: Build tool (lebih cepat dari webpack)

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Run `npm install` dulu

### Backend tidak merespons
- Pastikan backend sudah jalan di port 5000
- Cek URL di `api.js` sudah benar

### Styling tidak muncul
- Pastikan import CSS di component
- Clear browser cache (Ctrl + Shift + R)

### Hot reload tidak jalan
- Restart dev server: `Ctrl + C` lalu `npm run dev` lagi

## 🎓 Konsep React untuk Dipelajari

### 1. Components
Component adalah "blok bangunan" React:

```jsx
function MyComponent() {
  return <div>Hello</div>
}
```

### 2. State
State adalah data yang bisa berubah:

```jsx
const [count, setCount] = useState(0)
// count = nilai sekarang
// setCount = fungsi untuk ubah nilai
```

### 3. Props
Props adalah data yang dikirim dari parent ke child:

```jsx
// Parent
<RPSForm onRPSGenerated={handleResult} />

// Child menerima props
function RPSForm({ onRPSGenerated }) {
  // pakai props.onRPSGenerated
}
```

### 4. Event Handling
Handle user interaction:

```jsx
const handleClick = () => {
  console.log('Clicked!')
}

<button onClick={handleClick}>Click</button>
```

### 5. Conditional Rendering
Tampilkan komponen berdasarkan kondisi:

```jsx
{isLoading && <div>Loading...</div>}
{!isLoading && <div>Done!</div>}
```

## 💡 Tips Belajar

1. **Mulai dari `App.jsx`** - Pahami struktur utama
2. **Pelajari `RPSForm.jsx`** - Lihat cara handle form
3. **Pelajari `RPSResult.jsx`** - Lihat cara display data
4. **Buka `api.js`** - Pahami komunikasi dengan backend
5. **Coba edit CSS** - Ubah warna/spacing, lihat hasilnya

### Debug dengan Console
Tambahkan `console.log()` untuk debug:

```jsx
console.log('Data form:', formData)
console.log('Response:', response)
```

Buka browser console (F12) untuk lihat log.

## 🌟 Fitur Tambahan (Opsional)

Ide pengembangan lebih lanjut:
- [ ] Export ke PDF
- [ ] Edit RPS yang sudah dibuat
- [ ] Template RPS per universitas
- [ ] Dark mode
- [ ] Drag & drop untuk urutan pertemuan
- [ ] Auto-save draft

Selamat belajar React! 🚀
