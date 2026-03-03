import fs from "fs";
import path from "path";

const out = path.join(process.cwd(), "lib", "build-info.ts");
const buildTime = new Date().toISOString();

const content = `// AUTO-GENERATED. DO NOT EDIT.
export const BUILD_TIME = ${JSON.stringify(buildTime)} as const;
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, content, "utf8");
console.log("generated:", out, buildTime);
