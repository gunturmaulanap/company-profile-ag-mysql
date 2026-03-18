import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import path from "node:path";
import fs from "node:fs";

// Load env files for standalone Node script execution.
const envPath = path.resolve(process.cwd(), ".env");
const envLocalPath = path.resolve(process.cwd(), ".env.local");

if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

if (fs.existsSync(envLocalPath)) {
  process.loadEnvFile(envLocalPath);
}

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME || "Admin";

if (!email || !password) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables.");
  process.exit(1);
}

const normalizedEmail = email.trim().toLowerCase();
const hashedPassword = await bcrypt.hash(password, 10);

await prisma.user.upsert({
  where: { email: normalizedEmail },
  update: {
    name,
    password: hashedPassword,
    role: "admin",
  },
  create: {
    email: normalizedEmail,
    name,
    password: hashedPassword,
    role: "admin",
  },
});

console.log(`Admin user synced: ${normalizedEmail}`);

await prisma.$disconnect();
