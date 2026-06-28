# Tanamind Frontend (React + Vite)

Repositori ini adalah bagian frontend dari monorepo **Pakcoy Guard** untuk project UAS Pemrograman Web Framework. Frontend ini dibangun menggunakan React dengan build tool Vite, dan dirancang untuk berkomunikasi secara langsung dengan backend Laravel dan service Machine Learning FastAPI.

---

## 1. Instalasi & Konfigurasi Lingkungan

**1. Clone repositori:**
```bash
git clone (link repo kita)
cd pakcoy-guard/pakcoy-frontend
```

**2. Install dependencies:**
```bash
npm install
```

**3. Konfigurasi Environment:**

Buat file `.env` di dalam folder `pakcoy-frontend/` (jangan di-commit). Isi dengan:
```env
VITE_API_URL=http://localhost:8000/api
```

**4. Jalankan Server Lokal:**
```bash
npm run dev
```
Aplikasi berjalan pada port **5173**.

---

## 2. Struktur Direktori Frontend

> Dilarang mengubah struktur dasar ini tanpa koordinasi. Semua pekerjaan harus masuk ke dalam folder yang sesuai.

```
pakcoy-frontend/src/
├── components/         (Komponen reusable: Navbar.jsx, ScanCard.jsx, ProtectedRoute.jsx)
├── pages/              (Satu file per halaman: Login.jsx, Dashboard.jsx, Scan.jsx)
│   └── admin/          (Halaman khusus admin: AdminDashboard.jsx)
├── services/           (Semua pemanggilan API: api.js, authService.js)
├── context/            (Global state: AuthContext.jsx)
├── hooks/              (Custom hooks: useAuth.js)
└── App.jsx             (Konfigurasi routing utama)
```

---

## 3. Konvensi Penamaan (Naming Conventions)

Patuhi standar penamaan berikut agar kode seragam:

| Tipe | Format | Contoh |
|------|--------|--------|
| Komponen React | `PascalCase` | `ScanResult.jsx`, `PostCard.jsx` |
| File service/hook | `camelCase` | `scanService.js`, `useAuth.js` |
| Variabel/Fungsi | `camelCase` | `userData`, `handleSubmit()` |
| CSS Class | `kebab-case` | `scan-card`, `result-label` |
| Konstanta | `UPPER_SNAKE_CASE` | `MAX_FILE_SIZE`, `API_URL` |

---

## 4. Alur Kerja Git (Branching)

> Jangan pernah melakukan commit langsung ke branch `main`.

Gunakan branch berikut berdasarkan modul navigasi yang kamu kerjakan:

| Branch | Modul |
|--------|-------|
| `feature/ui-auth` | Landing, Login, Register, dan Context |
| `feature/ui-scan` | Dashboard, Scan, ScanResult, dan History |
| `feature/ui-community` | Community dan PostCard |
| `feature/ui-admin` | AdminDashboard dan ManageUsers |

---

### Langkah Lengkap Push ke Branch

#### ① Pastikan kamu berada di branch yang benar

Cek branch aktif saat ini:
```bash
git branch
```
Jika belum di branch yang sesuai, pindah dulu:
```bash
# Pindah ke branch yang sudah ada (sudah pernah di-checkout sebelumnya)
git checkout feature/ui-scan

# Atau, jika branch ini baru dibuat pertama kali di lokal kamu
git checkout -b feature/ui-scan
```

---

#### ② Sinkronisasi dengan `main` terbaru (sebelum mulai kerja)

Lakukan ini setiap kali mau mulai ngoding agar tidak tertinggal perubahan dari anggota lain:
```bash
git fetch origin
git merge origin/main
```
> Jika ada **conflict**, selesaikan dulu sebelum lanjut. Buka file yang konflik, pilih perubahan yang benar, lalu `git add` file tersebut.

---

#### ③ Cek status perubahan

Lihat file mana saja yang berubah / belum di-stage:
```bash
git status
```

---

#### ④ Stage perubahan

Tambahkan file yang ingin di-commit. Ada dua cara:
```bash
# Stage file tertentu saja (direkomendasikan)
git add src/pages/Scan.jsx
git add src/services/scanService.js

# Stage semua perubahan sekaligus (gunakan hati-hati)
git add .
```

---

#### ⑤ Commit dengan format wajib

Gunakan awalan logis: `feat:`, `fix:`, `style:`, `refactor:`, atau `docs:`.
```bash
git commit -m "feat: tambah validasi ukuran gambar di halaman scan"
```

Contoh commit lain yang valid:
```bash
git commit -m "fix: perbaiki redirect ProtectedRoute saat token expired"
git commit -m "style: sesuaikan warna tombol scan dengan desain Figma"
git commit -m "refactor: pindah logika fetch ke scanService.js"
git commit -m "docs: update komentar pada AuthContext.jsx"
```

---

#### ⑥ Push ke remote

```bash
# Pertama kali push branch ini ke GitHub
git push -u origin feature/ui-scan

# Selanjutnya cukup pakai ini
git push
```

---

#### ⑦ Buat Pull Request (PR) di GitHub

1. Buka repositori di GitHub.
2. Klik tombol **"Compare & pull request"** yang muncul otomatis setelah push.
3. Pastikan:
   - **base branch** → `main`
   - **compare branch** → `feature/ui-scan` (atau branch kamu)
4. Isi judul PR dengan deskripsi singkat, contoh: `feat: modul scan & riwayat scan`.
5. Assign ke anggota tim untuk di-review sebelum di-merge.

> Jangan merge PR sendiri tanpa review dari minimal **1 anggota tim** lain.

---

#### ⑧ (Opsional) Update branch lokal setelah PR di-merge

Setelah PR di-merge ke `main`, sinkronkan lokal kamu:
```bash
git checkout main
git pull origin main
```

---

### Ringkasan Urutan Perintah (Quick Reference)

```bash
git checkout feature/ui-scan        # 1. Pindah ke branch
git fetch origin && git merge origin/main  # 2. Sync dengan main terbaru
# ... kerja ngoding ...
git status                          # 3. Cek perubahan
git add src/pages/Scan.jsx          # 4. Stage file
git commit -m "feat: ..."           # 5. Commit
git push                            # 6. Push ke GitHub
# 7. Buat Pull Request di GitHub
```

---

## 5. Kontrak Frontend & Aturan Wajib

Setiap anggota tim frontend harus mematuhi aturan berikut yang telah disepakati bersama:

- **Sentralisasi API:** Dilarang menulis URL API langsung di komponen. Gunakan instance axios dari `services/api.js`.
- **Manajemen Token:** Token dari backend wajib disimpan di `localStorage` dan otomatis disisipkan ke header via interceptor axios.
- **Proteksi Halaman:** Semua halaman yang memerlukan autentikasi harus dibungkus dengan komponen `<ProtectedRoute>`.
- **Validasi Gambar:** Maksimal ukuran file adalah **5MB**. Format yang diizinkan hanya **JPG, JPEG, dan PNG**. Validasi harus dilakukan di frontend sebelum dikirim.
- **State Handling:** Selalu tangani state `loading` dan `error` di setiap pemanggilan API (fetch data).

---

## 6. Daftar Endpoint Backend (Laravel)

Berikut adalah daftar endpoint yang akan disediakan oleh tim backend dan dapat diakses oleh frontend:

| Method | Endpoint | Deskripsi | Butuh Login? |
|--------|----------|-----------|--------------|
| `POST` | `/api/auth/register` | Daftar akun baru | Tidak |
| `POST` | `/api/auth/login` | Login, menerima balasan token | Tidak |
| `POST` | `/api/auth/logout` | Logout | Ya |
| `GET` | `/api/user` | Mengambil data user yang sedang login | Ya |
| `POST` | `/api/scan` | Upload foto daun untuk diproses ML | Ya |
| `GET` | `/api/scan` | Riwayat scan milik user login | Ya |
| `GET` | `/api/scan/{id}` | Detail dari satu hasil scan | Ya |
| `GET` | `/api/community` | Mengambil semua post komunitas | Ya |
| `POST` | `/api/community` | Membuat post baru dari hasil scan | Ya |
| `POST` | `/api/community/{id}/comments` | Tambah komentar pada post | Ya |
| `GET` | `/api/diseases` | Daftar penyakit + rekomendasi | Ya |
| `GET` | `/api/admin/stats` | Statistik global aplikasi | Ya (Admin) |
| `GET` | `/api/admin/users` | Daftar semua user terdaftar | Ya (Admin) |

> **Catatan:** Struktur response dari semua endpoint backend akan selalu mengikuti format standar:
> ```json
> { "status": "...", "message": "...", "data": ... }
> ```

---

## 7. Checklist Kelengkapan Sebelum Demo

Pastikan seluruh fitur ini berjalan sebelum kita melakukan merge final ke `main`:

- [ ] Halaman Login & Register terhubung ke API dengan benar.
- [ ] Token tersimpan di `localStorage` dan dikirim di setiap request API.
- [ ] Halaman yang butuh login sudah diproteksi (redirect jika belum login).
- [ ] Dashboard tampil secara dinamis setelah login.
- [ ] Halaman Scan dapat mengunggah foto, menampilkan indikator loading, dan menampilkan hasil (penyakit, tingkat keparahan).
- [ ] Tidak ada error CORS saat frontend memanggil backend.
- [ ] Tidak ada hardcode URL (`http://localhost...`) di dalam komponen React.

> Jika terjadi kendala integrasi atau error yang memakan waktu lebih dari 1 jam, segera diskusikan di grup tim.
