# Adibayu Company Profile (Next.js)

Project ini adalah website company profile berbasis **Next.js** dengan fitur:

- Halaman publik multi-bahasa (ID/EN)
- Halaman berita (news)
- CMS sederhana (admin) untuk mengelola konten berita
- Endpoint API internal untuk data news

## Stack Singkat

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- MySQL + Prisma
- NextAuth (Auth.js) Credentials

> Catatan: kode saat ini sudah dimigrasikan ke **MySQL + Prisma + NextAuth**.

---

## 1) Instalasi & Menjalankan di Lokal

### Prasyarat

- Node.js 18+ (disarankan Node.js 20)
- npm

### Langkah

1. Clone repository
2. Install dependency:

```bash
npm install
```

3. Copy env:

```bash
cp .env.example .env.local
```

4. Isi variable environment di `.env.local` berdasarkan `.env.example`.
5. Generate Prisma client:

```bash
npm run prisma:generate
```

6. Push skema database:

```bash
npm run prisma:push
```

7. Buat user admin awal (password akan di-hash bcryptjs):

```bash
set ADMIN_EMAIL=admin@adibayu.com && set ADMIN_PASSWORD=yourStrongPassword && npm run admin:create
```

8. Jalankan development:

```bash
npm run dev
```

9. Buka browser:

- `http://localhost:3000`

### Build production lokal

```bash
npm run build
npm run start
```

---

## 2) Login CMS

Halaman login CMS diakses manual via URL:

- `https://domainkamu.com/login`

Contoh:

- `https://adibayu.com/login`

Setelah login berhasil, user diarahkan ke:

- `https://domainkamu.com/admin`

---

## 3) Deploy ke Node Web Hosting (Shared Hosting Node.js)

> Cocok untuk hosting yang mendukung aplikasi Node.js (bukan hosting PHP statis biasa).

### Langkah umum

1. Upload source project ke hosting.
2. Set environment variables di panel hosting.
3. Jalankan install:

```bash
npm install
```

4. Build app:

```bash
npm run build
```

5. Start command di panel hosting:

```bash
npm run start
```

6. Arahkan domain ke service Node.js yang aktif.

### Environment minimum

- `NODE_ENV=production`
- `PORT` (sesuai panel hosting)
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

---

## 4) Deploy ke VPS (Nginx + PM2)

### A. Setup server

1. Install Node.js LTS
2. Install PM2:

```bash
npm i -g pm2
```

3. Clone project ke VPS, lalu:

```bash
npm install
npm run build
```

4. Jalankan dengan PM2:

```bash
pm2 start npm --name adibayu-compro -- start
pm2 save
pm2 startup
```

### B. Reverse proxy Nginx

Arahkan domain ke `http://127.0.0.1:3000` (atau port aplikasi).

### C. SSL

Gunakan Let's Encrypt (Certbot) agar domain HTTPS.

---

## 5) Deploy Shared Hosting Node.js (Prisma Best Practice)

Untuk shared hosting (Linux), **jangan upload** folder `.next` dan `node_modules` dari lokal.

Urutan aman di server hosting:

```bash
npm install
npm run prisma:generate
npm run prisma:push
npm run build
npm run start
```

Ini memastikan Prisma engine yang terpasang sesuai OS server.

---

## 6) Script Penting

```bash
npm run dev     # development
npm run build   # build production
npm run start   # jalankan hasil build
npm run lint    # linting
```
