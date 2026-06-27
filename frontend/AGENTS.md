# 📋 Team Rules — Tanamind
> Dokumen ini wajib dibaca dan disepakati semua anggota sebelum mulai coding.
> Kalau ada yang mau diubah, diskusi dulu di grup — jangan ubah sepihak.

---

## 🗂️ Daftar Isi
1. [Struktur Project & Repository](#1-struktur-project--repository)
2. [Port & Environment](#2-port--environment)
3. [Kontrak API — Format Wajib](#3-kontrak-api--format-wajib)
4. [Rules Frontend — Orang 1 (React)](#4-rules-frontend--orang-1-react)
5. [Rules Backend — Orang 2 (Laravel)](#5-rules-backend--orang-2-laravel)
6. [Rules ML Service — Orang 3 (FastAPI)](#6-rules-ml-service--orang-3-fastapi)
7. [Rules Git — Semua Orang](#7-rules-git--semua-orang)
8. [Rules Komunikasi Tim](#8-rules-komunikasi-tim)
9. [Checklist Sebelum Demo](#9-checklist-sebelum-demo)

---

## 1. Struktur Project & Repository

```
pakcoy-guard/               ← satu folder induk (monorepo)
├── pakcoy-frontend/        ← React (Orang 1)
├── pakcoy-backend/         ← Laravel (Orang 2)
└── pakcoy-ml/              ← FastAPI (Orang 3)
```

> **Aturan:** Satu repo GitHub/GitLab. Semua orang clone repo yang sama.
> Masing-masing orang hanya boleh mengubah folder miliknya kecuali ada koordinasi.

---

## 2. Port & Environment

| Service | Port | Siapa yang atur |
|---|---|---|
| React (Vite) | `5173` | Orang 1 |
| Laravel | `8000` | Orang 2 |
| FastAPI | `8001` | Orang 3 |

**Port tidak boleh diganti tanpa koordinasi.**

### File .env wajib dibuat masing-masing (tidak di-commit ke Git)

**pakcoy-frontend/.env**
```
VITE_API_URL=http://localhost:8000/api
```

**pakcoy-backend/.env** (tambahkan baris ini ke .env Laravel)
```
ML_SERVICE_URL=http://localhost:8001
FRONTEND_URL=http://localhost:5173
```

**pakcoy-ml/.env**
```
MODEL_PATH=./models/model_klasifikasi_daun_v1.keras
```

---

## 3. Kontrak API — Format Wajib

Ini adalah "kontrak" antara semua orang. Tidak boleh berubah tanpa diskusi.

### 3.1 Format Response Laravel (SEMUA endpoint)
```json
{
  "status": "success",
  "message": "Berhasil login",
  "data": { ... }
}
```
```json
{
  "status": "error",
  "message": "Email atau password salah",
  "data": null
}
```
> Field `status` hanya boleh berisi `"success"` atau `"error"`.
> Field `data` boleh berisi object, array, atau null — tidak boleh dihilangkan.

---

### 3.2 Format Response FastAPI /predict (TIDAK BOLEH BERUBAH)
```json
{
  "disease": "bercak",
  "disease_confidence": 0.92,
  "severity": "sedang",
  "severity_confidence": 0.87
}
```
> Kalau disease = `"healthy"`, maka `severity` dan `severity_confidence` diisi `null`.
> Label disease hanya boleh: `"healthy"` | `"bercak"` | `"berlubang"` | `"busuk"`
> Label severity hanya boleh: `"ringan"` | `"sedang"` | `"parah"` | `null`

---

### 3.3 Daftar Endpoint Laravel

| Method | Endpoint | Deskripsi | Auth? |
|---|---|---|---|
| POST | `/api/auth/register` | Daftar akun baru | ❌ |
| POST | `/api/auth/login` | Login, return token | ❌ |
| POST | `/api/auth/logout` | Logout | ✅ |
| GET | `/api/user` | Data user yang login | ✅ |
| POST | `/api/scan` | Upload foto, trigger FastAPI | ✅ |
| GET | `/api/scan` | Riwayat scan milik user login | ✅ |
| GET | `/api/scan/{id}` | Detail satu hasil scan | ✅ |
| GET | `/api/community` | Semua post komunitas | ✅ |
| POST | `/api/community` | Buat post baru dari hasil scan | ✅ |
| POST | `/api/community/{id}/comments` | Tambah komentar | ✅ |
| GET | `/api/diseases` | Daftar penyakit + rekomendasi | ✅ |
| GET | `/api/admin/stats` | Statistik global (admin only) | ✅ Admin |
| GET | `/api/admin/users` | Daftar semua user (admin only) | ✅ Admin |

> **Orang 1 (Frontend):** Ini adalah daftar endpoint yang boleh kamu panggil.
> **Orang 2 (Backend):** Ini yang harus kamu buat. Nama dan method tidak boleh beda.

---

## 4. Rules Frontend — Orang 1 (React)

### Struktur Folder
```
pakcoy-frontend/src/
├── components/         ← komponen reusable (bukan halaman)
│   ├── Navbar.jsx
│   ├── ScanCard.jsx
│   ├── PostCard.jsx
│   ├── LoadingSpinner.jsx
│   └── ProtectedRoute.jsx
├── pages/              ← satu file per halaman
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Scan.jsx
│   ├── ScanResult.jsx
│   ├── History.jsx
│   ├── Community.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       └── ManageUsers.jsx
├── services/           ← SEMUA pemanggilan API di sini
│   ├── api.js          ← axios instance (base URL dari .env)
│   ├── authService.js
│   ├── scanService.js
│   └── communityService.js
├── context/
│   └── AuthContext.jsx ← state login global
├── hooks/
│   └── useAuth.js
└── App.jsx
```

### Penamaan
```
Komponen React  → PascalCase       → ScanResult.jsx, PostCard.jsx
File service    → camelCase        → scanService.js, authService.js
Variabel/fungsi → camelCase        → userData, handleSubmit()
CSS class       → kebab-case       → scan-card, result-label
Konstanta       → UPPER_SNAKE_CASE → MAX_FILE_SIZE, API_URL
```

### Aturan Wajib
1. **JANGAN pernah tulis URL API langsung di komponen.**
   ```jsx
   // ❌ SALAH
   const res = await axios.get("http://localhost:8000/api/scan")

   // ✅ BENAR — taruh di services/api.js
   import api from "../services/api"
   const res = await api.get("/scan")
   ```

2. **Token disimpan di localStorage, bukan di state biasa.**
   ```js
   localStorage.setItem("token", response.data.data.token)
   ```

3. **Semua halaman yang butuh login dibungkus ProtectedRoute.**
   ```jsx
   <Route path="/dashboard" element={
     <ProtectedRoute><Dashboard /></ProtectedRoute>
   } />
   ```

4. **Selalu handle loading dan error state di setiap fetch.**
   ```jsx
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   ```

5. **Ukuran file foto yang boleh diupload maksimal 5MB** — validasi di frontend sebelum kirim ke backend.

6. **Format gambar yang diterima:** JPG, JPEG, PNG saja.

### File api.js — Wajib dibuat seperti ini
```js
// src/services/api.js
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" }
})

// Otomatis sisipkan token di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
```

---

## 5. Rules Backend — Orang 2 (Laravel)

### Struktur Folder
```
pakcoy-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── ScanController.php
│   │   │   ├── CommunityController.php
│   │   │   ├── CommentController.php
│   │   │   └── Admin/
│   │   │       └── AdminController.php
│   │   └── Middleware/
│   │       └── AdminMiddleware.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── ScanResult.php
│   │   ├── Disease.php
│   │   ├── Recommendation.php
│   │   ├── CommunityPost.php
│   │   └── Comment.php
│   └── Services/
│       └── MLService.php   ← HTTP call ke FastAPI
├── database/
│   ├── migrations/
│   └── seeders/
└── routes/
    └── api.php
```

### Penamaan
```
Controller      → PascalCase + Controller  → ScanController.php
Model           → PascalCase singular      → ScanResult.php
Tabel database  → snake_case plural        → scan_results, community_posts
Kolom database  → snake_case               → disease_label, created_at
Route/endpoint  → kebab-case               → /community-posts
Method          → camelCase                → public function showHistory()
Variable PHP    → camelCase                → $scanResult, $mlResponse
```

### Aturan Wajib
1. **Semua response harus pakai format yang sudah disepakati di bagian 3.1.**
   ```php
   // Helper — taruh di Controller atau buat trait sendiri
   return response()->json([
       "status"  => "success",
       "message" => "Scan berhasil",
       "data"    => $scanResult
   ], 200);
   ```

2. **Gunakan Laravel Sanctum untuk autentikasi token.**

3. **CORS wajib diaktifkan untuk `http://localhost:5173` dari hari pertama.**
   Di `config/cors.php`:
   ```php
   "allowed_origins" => ["http://localhost:5173"],
   "allowed_methods" => ["*"],
   "allowed_headers" => ["*"],
   ```

4. **Validasi input di setiap endpoint yang menerima data.**
   ```php
   $request->validate([
       "image" => "required|image|mimes:jpg,jpeg,png|max:5120",
   ]);
   ```

5. **Foto disimpan di `storage/app/public/scans/` — bukan di folder public langsung.**
   ```php
   $path = $request->file("image")->store("scans", "public");
   ```

6. **Semua route yang butuh login dibungkus middleware `auth:sanctum`.**
   ```php
   Route::middleware("auth:sanctum")->group(function () {
       Route::post("/scan", [ScanController::class, "store"]);
       // ...
   });
   ```

7. **MLService.php adalah satu-satunya file yang boleh memanggil FastAPI.** ScanController memanggil MLService, bukan memanggil FastAPI langsung.
   ```php
   // app/Services/MLService.php
   class MLService {
       public function predict($imagePath): array {
           $response = Http::attach(
               "image",
               file_get_contents($imagePath),
               "leaf.jpg"
           )->post(env("ML_SERVICE_URL") . "/predict");
           return $response->json();
       }
   }
   ```

### Tabel Database
```
users           → id, name, email, password, role, avatar, timestamps
scan_results    → id, user_id, disease_id, image_path, disease_label,
                   disease_confidence, severity_label, severity_confidence,
                   notes, is_shared, timestamps
diseases        → id, name, slug, description, thumbnail, timestamps
recommendations → id, disease_id, severity, action, prevention, timestamps
community_posts → id, user_id, scan_result_id, caption, likes_count, timestamps
comments        → id, user_id, post_id, body, timestamps
```

> `role` pada tabel users hanya boleh: `"petani"` | `"komunitas"` | `"admin"`

---

## 6. Rules ML Service — Orang 3 (FastAPI)

### Struktur Folder
```
pakcoy-ml/
├── main.py
├── routers/
│   └── predict.py
├── models/
│   ├── model_klasifikasi_daun_v1.keras   ← supervised
│   ├── scaler_Bercak.pkl
│   ├── pca_Bercak.pkl
│   ├── kmeans_Bercak.pkl
│   ├── scaler_Berlubang.pkl
│   ├── pca_Berlubang.pkl
│   ├── kmeans_Berlubang.pkl
│   ├── scaler_Busuk.pkl
│   ├── pca_Busuk.pkl
│   └── kmeans_Busuk.pkl                  ← unsupervised per penyakit
├── utils/
│   └── preprocessing.py
├── requirements.txt
└── .env
```

### Penamaan
```
File Python     → snake_case       → predict.py, preprocessing.py
Fungsi Python   → snake_case       → load_model(), predict_disease()
Variabel Python → snake_case       → image_path, disease_label
Endpoint        → kebab-case       → /predict (satu endpoint utama)
```

### Aturan Wajib
1. **Model di-load SEKALI saat server start — bukan di dalam fungsi endpoint.**
   ```python
   # main.py atau di atas fungsi endpoint
   model = tf.keras.models.load_model("models/model_klasifikasi_daun_v1.keras")
   # Load semua pkl juga di sini
   ```

2. **Endpoint wajib menerima input berupa file gambar (multipart/form-data), bukan base64.**
   ```python
   @router.post("/predict")
   async def predict(image: UploadFile = File(...)):
   ```

3. **Response WAJIB sesuai format di bagian 3.2 — tidak boleh ada field tambahan yang tidak disepakati.**

4. **Ukuran gambar input wajib di-resize ke 224×224 sebelum masuk model.**

5. **Kalau disease = healthy, langsung return severity null — tidak perlu panggil model clustering.**

6. **Tambahkan CORS di FastAPI agar bisa dipanggil dari Laravel.**
   ```python
   from fastapi.middleware.cors import CORSMiddleware
   app.add_middleware(CORSMiddleware, allow_origins=["*"])
   ```

7. **Simpan semua model .pkl dari notebook dengan cara ini (jalankan di notebook dulu):**
   ```python
   import joblib
   # Setelah KMeans selesai ditraining di notebook:
   joblib.dump(disease_data["Bercak"]["kmeans"], "kmeans_Bercak.pkl")
   joblib.dump(disease_data["Bercak"]["scaler"], "scaler_Bercak.pkl")
   joblib.dump(disease_data["Bercak"]["pca_model"], "pca_Bercak.pkl")
   # Ulangi untuk Berlubang dan Busuk
   ```

### requirements.txt
```
fastapi
uvicorn
tensorflow
numpy
pillow
scikit-learn
joblib
python-multipart
python-dotenv
```

### Cara jalankan
```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

---

## 7. Rules Git — Semua Orang

### Nama Branch
```
main              ← branch utama, hanya merge kalau fitur sudah jalan
feature/auth      ← contoh branch Orang 2 untuk fitur autentikasi
feature/scan-ui   ← contoh branch Orang 1 untuk halaman scan
feature/ml-predict ← contoh branch Orang 3 untuk endpoint predict
```

### Format Commit Message
```
feat: tambah endpoint POST /api/scan
fix: perbaiki CORS tidak aktif di middleware
refactor: pisahkan MLService ke file tersendiri
style: rapikan tampilan halaman ScanResult
docs: update README cara menjalankan project
```

### Aturan
1. **Jangan commit langsung ke `main`.**
2. **File `.env` wajib masuk `.gitignore` — tidak boleh ke-commit.**
3. **File model `.keras` dan `.pkl` tidak perlu di-commit** — bagikan lewat Google Drive atau WhatsApp.
4. **Commit kecil-kecil** — satu commit untuk satu perubahan logis, bukan dump semua sekaligus.
5. **Kalau mau merge ke main**, kasih tahu anggota lain dulu.

### .gitignore Wajib
```
# Semua folder
.env
node_modules/
__pycache__/
*.pyc

# Frontend
pakcoy-frontend/dist/

# Backend
pakcoy-backend/vendor/
pakcoy-backend/storage/app/public/

# ML
pakcoy-ml/models/*.keras
pakcoy-ml/models/*.pkl
```

---

## 8. Rules Komunikasi Tim

1. **Kalau endpoint baru sudah siap dipanggil → langsung info ke grup dengan format:**
   > ✅ `POST /api/auth/login` sudah bisa dipakai

2. **Kalau mau ubah nama field / struktur response → diskusi dulu, jangan langsung ubah.**

3. **Kalau stuck lebih dari 1 jam → minta bantuan di grup, jangan diam.**

4. **Satu dokumen bersama (Google Docs) berisi:**
   - Endpoint mana yang sudah jadi ✅ / belum ❌
   - Struktur tabel terbaru
   - Catatan bug yang ditemukan

---

## 9. Checklist Sebelum Demo

### Orang 3 (FastAPI) — harus selesai duluan
- [ ] Server FastAPI bisa jalan di port 8001
- [ ] Endpoint `/predict` bisa menerima gambar dan return JSON sesuai format
- [ ] Model `.keras` ter-load saat server start
- [ ] Model KMeans/PCA/Scaler `.pkl` tersimpan dan ter-load

### Orang 2 (Laravel)
- [ ] Server Laravel jalan di port 8000
- [ ] CORS aktif untuk localhost:5173
- [ ] Endpoint login & register berfungsi dan return token
- [ ] Endpoint `/api/scan` bisa terima gambar dan teruskan ke FastAPI
- [ ] Response selalu pakai format `{ status, message, data }`

### Orang 1 (React)
- [ ] Halaman Login & Register terhubung ke API
- [ ] Halaman Scan bisa upload foto dan tampilkan hasil
- [ ] Dashboard tampil setelah login
- [ ] Token tersimpan di localStorage dan dikirim di setiap request
- [ ] Halaman yang butuh login sudah diproteksi

### Semua
- [ ] Alur lengkap berjalan: Login → Scan → Hasil → Simpan riwayat
- [ ] Tidak ada error CORS saat frontend memanggil backend
- [ ] Tidak ada hardcode URL di dalam kode

---

*Dokumen ini dibuat untuk project UAS Pemrograman Web Framework.*
*Terakhir diupdate: Juni 2026*
