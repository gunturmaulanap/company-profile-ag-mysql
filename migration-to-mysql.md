Berikut adalah panduan arsitektur, strategi keamanan otentikasi, dan dokumentasi migrasi lengkap untuk skenario Node.js Shared Hosting Anda.

1. Strategi Deploy di Node.js Shared Hosting dengan Prisma + MySQL
   Deploy aplikasi Next.js yang menggunakan Prisma di Shared Hosting (seperti cPanel Node.js App) memiliki sedikit trik pada bagian Engine Prisma.

Tantangan Shared Hosting: Prisma membutuhkan binary engine yang sesuai dengan OS server. Seringkali, saat Anda melakukan npm run build di lokal (misal: Windows/Mac) lalu mengunggahnya ke Shared Hosting (Linux), Prisma akan gagal berjalan.

Langkah Terbaik:

Anda wajib mengunggah source code mentah ke Shared Hosting (tanpa folder node_modules dan .next).

Lakukan npm install langsung di terminal/SSH Shared Hosting.

Jalankan npx prisma generate di server Shared Hosting. Ini memastikan Prisma mengunduh engine Linux yang tepat.

Baru setelah itu jalankan npm run build dan npm run start.

2. Strategi Kemananan Otentikasi Admin (Pengganti Supabase Auth)
   Karena Anda meninggalkan Supabase, Anda kehilangan fitur Supabase Auth. Untuk menjaga birokrasi keamanan tetap ketat, Anda harus membangun sistem otentikasi sendiri.

Solusi Standar Industri: Gunakan NextAuth.js (Auth.js) dikombinasikan dengan Prisma Adapter dan Bcrypt.js.

Langkah Pengamanan Mutlak:

Zero Plain-Text: Password admin tidak boleh disimpan dalam bentuk teks biasa di MySQL. Saat admin dibuat, password harus di-hash menggunakan bcryptjs dengan salt rounds minimal 10.

JWT & HTTP-Only Cookies: NextAuth akan secara otomatis menangani sesi login menggunakan JSON Web Tokens (JWT) yang disimpan di dalam HTTP-Only Cookies. Ini mencegah celah serangan XSS (Cross-Site Scripting).

Middleware Protection: Gunakan fitur middleware.ts dari Next.js untuk menjaga route /admin/\*. Jika tidak ada cookie sesi yang valid, tendang kembali ke /login.

3. Dokumentasi Migrasi: Supabase ke MySQL + Prisma
   Berikut adalah panduan langkah demi langkah untuk melakukan migrasi codebase Anda.

Tahap 1: Pembersihan Dependensi
Hapus Supabase dari ekosistem aplikasi Anda.

Bash
npm uninstall @supabase/supabase-js @supabase/auth-helpers-nextjs
Tahap 2: Instalasi Stack Baru
Instal Prisma, NextAuth, dan library enkripsi password.

Bash
npm install prisma --save-dev
npm install @prisma/client next-auth bcryptjs
npm install @types/bcryptjs --save-dev
Tahap 3: Inisialisasi Prisma
Jalankan perintah inisialisasi Prisma.

Bash
npx prisma init
Ini akan membuat folder prisma dan file .env baru. Ubah URL di .env Anda agar mengarah ke database MySQL.
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

Tahap 4: Merancang Skema Database (prisma/schema.prisma)
Buat skema untuk Admin (User) dan Berita (News).

Code snippet
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "mysql"
url = env("DATABASE_URL")
}

model User {
id String @id @default(cuid())
email String @unique
password String // Akan menyimpan password yang di-hash
name String?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model News {
id String @id @default(cuid())
title String
slug String @unique
content String @db.Text
category String
imageUrl String?
isPublished Boolean @default(false)
locale String @default("id") // Sesuai fitur multi-bahasa Anda
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}
Setelah skema dibuat, dorong struktur ini ke database MySQL Anda:

Bash
npx prisma db push
Tahap 5: Setup NextAuth (app/api/auth/[...nextauth]/route.ts)
Buat konfigurasi NextAuth menggunakan Credentials Provider. Di sinilah logika pencocokan email dan password (yang di-hash dengan bcrypt) dilakukan dengan mencarinya di MySQL via Prisma.

Tahap 6: Migrasi Endpoint API (CRUD News)
Ubah semua file API internal atau Server Actions yang sebelumnya menggunakan syntax Supabase menjadi syntax Prisma.

Sebelum (Supabase):

TypeScript
const { data } = await supabase.from('news').select('\*');
Sesudah (Prisma):

TypeScript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const data = await prisma.news.findMany({
where: { isPublished: true }
});
