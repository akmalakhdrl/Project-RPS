/**
 * DOCX SERVICE - VERSI TABEL
 * 
 * File ini mengatur pembuatan file DOCX (Microsoft Word)
 * Dengan format tabel yang rapi dan border di setiap bagian
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle } = require('docx');
const fs = require('fs').promises;

/**
 * Generate file DOCX dari data RPS
 * @param {Object} rpsData - Data RPS lengkap
 * @param {String} outputPath - Path untuk menyimpan file
 */
exports.generateDOCX = async (rpsData, outputPath) => {
  try {
    console.log('📄 Membuat dokumen DOCX dengan format tabel...');
    
    // Border style untuk tabel
    const tableBorder = {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
    };
    
    // Buat dokumen baru
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header - Judul Dokumen
            new Paragraph({
              text: "RENCANA PEMBELAJARAN SEMESTER (RPS)",
              heading: "Heading1",
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 }
            }),
            
            // Tabel Identitas Mata Kuliah
            new Paragraph({
              text: "A. IDENTITAS MATA KULIAH",
              heading: "Heading2",
              spacing: { before: 200, after: 200 }
            }),
            
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: tableBorder,
              rows: [
                createTableRow("Nama Mata Kuliah", rpsData.identitasMataKuliah?.namaMataKuliah || "-"),
                createTableRow("Kode Mata Kuliah", rpsData.identitasMataKuliah?.kodeMataKuliah || "-"),
                createTableRow("Semester", rpsData.identitasMataKuliah?.semester || "-"),
                createTableRow("SKS", rpsData.identitasMataKuliah?.sks || "-"),
                createTableRow("Program Studi", rpsData.identitasMataKuliah?.programStudi || "-"),
                createTableRow("Dosen Pengampu", rpsData.identitasMataKuliah?.dosenPengampu || "-")
              ]
            }),
            
            // Deskripsi Mata Kuliah
            new Paragraph({
              text: "B. DESKRIPSI MATA KULIAH",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: tableBorder,
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: rpsData.deskripsiMataKuliah || "Tidak ada deskripsi",
                          spacing: { before: 100, after: 100 }
                        })
                      ],
                      shading: { fill: "F9FAFB" }
                    })
                  ]
                })
              ]
            }),
            
            // CPL Prodi
            new Paragraph({
              text: "C. CAPAIAN PEMBELAJARAN LULUSAN (CPL) PRODI",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createListTable(rpsData.capaianPembelajaran?.cplProdi || [], tableBorder),
            
            // CPMK
            new Paragraph({
              text: "D. CAPAIAN PEMBELAJARAN MATA KULIAH (CPMK)",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createListTable(rpsData.capaianPembelajaran?.cpmk || [], tableBorder),
            
            // Sub-CPMK
            new Paragraph({
              text: "E. SUB-CPMK",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createSubCPMKTable(rpsData.capaianPembelajaran?.subCpmk || [], tableBorder),
            
            // Bahan Kajian
            new Paragraph({
              text: "F. BAHAN KAJIAN",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createListTable(rpsData.bahanKajian || [], tableBorder),
            
            // Metode Pembelajaran
            new Paragraph({
              text: "G. METODE PEMBELAJARAN",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createListTable(rpsData.metodePembelajaran || [], tableBorder),
            
            // Media dan Sumber
            new Paragraph({
              text: "H. MEDIA DAN SUMBER BELAJAR",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createListTable(rpsData.mediaDanSumber || [], tableBorder),
            
            // Sistem Penilaian
            new Paragraph({
              text: "I. SISTEM PENILAIAN",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createPenilaianTable(rpsData.sistemPenilaian || {}, tableBorder),
            
            // Rencana Pertemuan
            new Paragraph({
              text: "J. RENCANA PEMBELAJARAN MINGGUAN",
              heading: "Heading2",
              spacing: { before: 400, after: 200 }
            }),
            
            createPertemuanTable(rpsData.rencanaPertemuan || [], tableBorder)
          ]
        }
      ]
    });
    
    // Convert ke buffer
    const buffer = await Packer.toBuffer(doc);
    
    // Simpan file
    await fs.writeFile(outputPath, buffer);
    
    console.log('✅ File DOCX dengan format tabel berhasil dibuat');
    
  } catch (error) {
    console.error('❌ Error membuat DOCX:', error.message);
    throw error;
  }
};

/**
 * Helper functions untuk membuat tabel
 */

// Buat row tabel 2 kolom (label - value)
function createTableRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ text: label, bold: true })],
        width: { size: 30, type: WidthType.PERCENTAGE },
        shading: { fill: "E5E7EB" }
      }),
      new TableCell({
        children: [new Paragraph({ text: String(value) })],
        width: { size: 70, type: WidthType.PERCENTAGE }
      })
    ]
  });
}

// Buat tabel untuk list item (numbered list dalam tabel)
function createListTable(items, border) {
  if (!Array.isArray(items) || items.length === 0) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: border,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: "Tidak ada data" })],
              shading: { fill: "F9FAFB" }
            })
          ]
        })
      ]
    });
  }
  
  const rows = items.map((item, index) => {
    return new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: `${index + 1}.` })],
          width: { size: 10, type: WidthType.PERCENTAGE },
          shading: { fill: "F3F4F6" }
        }),
        new TableCell({
          children: [new Paragraph({ text: item })],
          width: { size: 90, type: WidthType.PERCENTAGE }
        })
      ]
    });
  });
  
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: border,
    rows: rows
  });
}

// Buat tabel untuk Sub-CPMK
function createSubCPMKTable(subCpmkArray, border) {
  if (!Array.isArray(subCpmkArray) || subCpmkArray.length === 0) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: border,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: "Tidak ada data" })],
              shading: { fill: "F9FAFB" }
            })
          ]
        })
      ]
    });
  }
  
  const rows = [];
  
  subCpmkArray.forEach(item => {
    // Header row untuk CPMK
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: `CPMK ${item.cpmk}`, bold: true })],
            shading: { fill: "DBEAFE" },
            columnSpan: 2
          })
        ]
      })
    );
    
    // Sub items
    if (Array.isArray(item.sub)) {
      item.sub.forEach((sub, idx) => {
        rows.push(
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: `${idx + 1}.` })],
                width: { size: 10, type: WidthType.PERCENTAGE },
                shading: { fill: "F3F4F6" }
              }),
              new TableCell({
                children: [new Paragraph({ text: sub })],
                width: { size: 90, type: WidthType.PERCENTAGE }
              })
            ]
          })
        );
      });
    }
  });
  
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: border,
    rows: rows
  });
}

// Buat tabel untuk sistem penilaian
function createPenilaianTable(penilaian, border) {
  if (!penilaian || Object.keys(penilaian).length === 0) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: border,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: "Tidak ada data" })],
              shading: { fill: "F9FAFB" }
            })
          ]
        })
      ]
    });
  }
  
  // Header row
  const rows = [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: "Komponen Penilaian", bold: true, alignment: AlignmentType.CENTER })],
          width: { size: 70, type: WidthType.PERCENTAGE },
          shading: { fill: "3B82F6" }
        }),
        new TableCell({
          children: [new Paragraph({ text: "Bobot (%)", bold: true, alignment: AlignmentType.CENTER })],
          width: { size: 30, type: WidthType.PERCENTAGE },
          shading: { fill: "3B82F6" }
        })
      ]
    })
  ];
  
  // Data rows
  for (const [komponen, bobot] of Object.entries(penilaian)) {
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: komponen })]
          }),
          new TableCell({
            children: [new Paragraph({ text: `${bobot}%`, alignment: AlignmentType.CENTER })]
          })
        ]
      })
    );
  }
  
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: border,
    rows: rows
  });
}

// Buat tabel untuk rencana pertemuan
function createPertemuanTable(pertemuan, border) {
  if (!Array.isArray(pertemuan) || pertemuan.length === 0) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: border,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: "Tidak ada data" })],
              shading: { fill: "F9FAFB" }
            })
          ]
        })
      ]
    });
  }
  
  // Header row
  const rows = [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: "Minggu", bold: true, alignment: AlignmentType.CENTER })],
          width: { size: 10, type: WidthType.PERCENTAGE },
          shading: { fill: "10B981" }
        }),
        new TableCell({
          children: [new Paragraph({ text: "Materi", bold: true, alignment: AlignmentType.CENTER })],
          width: { size: 50, type: WidthType.PERCENTAGE },
          shading: { fill: "10B981" }
        }),
        new TableCell({
          children: [new Paragraph({ text: "Metode", bold: true, alignment: AlignmentType.CENTER })],
          width: { size: 25, type: WidthType.PERCENTAGE },
          shading: { fill: "10B981" }
        }),
        new TableCell({
          children: [new Paragraph({ text: "Waktu", bold: true, alignment: AlignmentType.CENTER })],
          width: { size: 15, type: WidthType.PERCENTAGE },
          shading: { fill: "10B981" }
        })
      ]
    })
  ];
  
  // Data rows
  pertemuan.forEach(p => {
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: String(p.minggu), alignment: AlignmentType.CENTER })],
            shading: p.minggu === 8 || p.minggu === 16 ? { fill: "FEE2E2" } : {}
          }),
          new TableCell({
            children: [new Paragraph({ text: p.materi || '-' })]
          }),
          new TableCell({
            children: [new Paragraph({ text: p.metode || '-' })]
          }),
          new TableCell({
            children: [new Paragraph({ text: p.waktu || '-', alignment: AlignmentType.CENTER })]
          })
        ]
      })
    );
  });
  
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: border,
    rows: rows
  });
}