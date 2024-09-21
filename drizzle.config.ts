import { defineConfig } from "drizzle-kit";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/db/schema/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
