import { mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const src = resolve("src/models/cards.db");
const destDir = resolve("dist");
const dest = resolve(destDir, "cards.db");

await mkdir(destDir, { recursive: true });
await copyFile(src, dest);
console.log(`Copied ${src} → ${dest}`);
