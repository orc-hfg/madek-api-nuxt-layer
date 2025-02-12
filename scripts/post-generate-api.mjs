import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runtimePath = join(__dirname, "../generated/api/runtime.ts");
const content = readFileSync(runtimePath, "utf8");

const updatedContent = "// @ts-nocheck\n" + content;

writeFileSync(runtimePath, updatedContent);
console.log("✅ Added TypeScript ignore comment to runtime.ts");
