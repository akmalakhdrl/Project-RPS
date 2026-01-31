/**
 * AI SERVICE - OpenAI Integration
 * 
 * Menggunakan OpenAI API untuk generate konten RPS
 */

const { OpenAI } = require('openai');

// Inisialisasi OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate konten RPS menggunakan OpenAI
 * @param {Object} rpsData - Data RPS dari form
 * @returns {Object} - RPS yang sudah dilengkapi oleh AI
 */
exports.generateRPSContent = async (rpsData) => {
  try {
    console.log('🤖 Menghubungi OpenAI API untuk mata kuliah:', rpsData.namaMataKuliah);

    const prompt = `
      Anda adalah seorang ahli kurikulum pendidikan tinggi di Indonesia. 
      Tugas Anda adalah merancang Rencana Pembelajaran Semester (RPS) yang lengkap berdasarkan data mata kuliah berikut:
      
      Nama Mata Kuliah: ${rpsData.namaMataKuliah}
      Kode Mata Kuliah: ${rpsData.kodeMataKuliah}
      Semester: ${rpsData.semester}
      SKS: ${rpsData.sks}
      Program Studi: ${rpsData.programStudi}
      Dosen Pengampu: ${rpsData.dosenPengampu}
      Deskripsi Awal: ${rpsData.deskripsiMataKuliah || 'Belum ada deskripsi'}
      CPL Prodi awal: ${rpsData.cplProdi.join(', ') || 'Belum ada CPL'}
      CPMK awal: ${rpsData.cpmk.join(', ') || 'Belum ada CPMK'}
      
      Mohon lengkapi dan buatlah konten RPS yang profesional dalam format JSON dengan struktur sebagai berikut:
      {
        "identitasMataKuliah": {
          "namaMataKuliah": "...",
          "kodeMataKuliah": "...",
          "semester": "...",
          "sks": "...",
          "programStudi": "...",
          "dosenPengampu": "..."
        },
        "deskripsiMataKuliah": "...",
        "capaianPembelajaran": {
          "cplProdi": ["...", "..."],
          "cpmk": ["...", "..."],
          "subCpmk": [
            { "cpmk": "1", "sub": ["...", "..."] }
          ]
        },
        "bahanKajian": ["...", "..."],
        "metodePembelajaran": ["...", "..."],
        "mediaDanSumber": ["...", "..."],
        "sistemPenilaian": {
          "Partisipasi": 10,
          "Tugas": 20,
          "Quiz": 10,
          "UTS": 30,
          "UAS": 30
        },
        "rencanaPertemuan": [
          { "minggu": 1, "materi": "...", "metode": "...", "waktu": "3 x 50 menit" }
        ]
      }
      
      Pastikan:
      1. Rencana pertemuan harus ada 16 minggu (termasuk UTS di minggu 8 dan UAS di minggu 16).
      2. Konten harus relevan dengan standar kurikulum perguruan tinggi di Indonesia.
      3. Bahasa yang digunakan adalah Bahasa Indonesia yang formal dan akademik.
      4. Berikan response HANYA berupa JSON valid agar bisa di-parse.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Anda adalah asisten akademik yang ahli dalam menyusun RPS kurikulum perguruan tinggi." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);

    // Tambahkan timestamp
    aiResponse.generatedAt = new Date().toISOString();

    console.log('✅ RPS berhasil digenerate oleh AI!');

    return aiResponse;

  } catch (error) {
    console.error('❌ Error di AI Service:', error.message);
    throw new Error('Gagal menghubungi AI: ' + error.message);
  }
};