// node build/render.mjs  ->  assets/banner.png y assets/wolftech-cl.png
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire("H:/WOLFTECH/instagram/reels/package.json");
const puppeteer = require("puppeteer-core");
const aqui = dirname(fileURLToPath(import.meta.url));
const salida = join(aqui, "..", "assets");

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--allow-file-access-from-files"],
});
const page = await browser.newPage();

await page.setViewport({ width: 1280, height: 400, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(join(aqui, "banner.html")).href, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(salida, "banner.png") });

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("https://www.wolftech.cl/", { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
// Oculta el aviso de cookies
await page.evaluate(() => {
  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (s.position === "fixed" && /cookies/i.test(el.textContent)) el.remove();
  }
});
await page.screenshot({ path: join(salida, "wolftech-cl.png") });

await browser.close();
