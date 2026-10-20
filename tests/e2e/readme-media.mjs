// Records the README walkthrough (tests/e2e/output/walkthrough.webm) and stills on a phone-sized viewport.
import { mkdirSync, renameSync } from "node:fs";
import { chromium } from "playwright";

const APP = process.env.APP_URL ?? "http://localhost:8090";
const OUT = new URL("./output/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const viewport = { width: 390, height: 844 };
const press = (page) => page.getByRole("button", { name: "Ne Yapalım?", exact: true }).click();

// Stills
{
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  await page.goto(APP);
  await page.getByText("Canın sıkıldı mı?").waitFor();
  await page.screenshot({ path: `${OUT}readme-start.png` });
  await press(page);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}readme-suggestion.png` });
  await page.getByRole("tab", { name: "Sosyal" }).click();
  await press(page);
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Bugüne sabitle" }).click();
  await press(page);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}readme-pinned.png` });
  const toggle = page.getByRole("button", { name: /^Tema:/ });
  await toggle.click();
  await toggle.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}readme-dark.png` });
  await page.close();
}

// Walkthrough
{
  const context = await browser.newContext({ viewport, recordVideo: { dir: OUT, size: viewport } });
  const page = await context.newPage();
  const pause = (ms) => page.waitForTimeout(ms);
  await page.goto(APP);
  await page.getByText("Canın sıkıldı mı?").waitFor();
  await pause(1500);
  for (let i = 0; i < 3; i++) {
    await press(page);
    await pause(1300);
  }
  await page.getByRole("tab", { name: "Zihin" }).click();
  await pause(500);
  await press(page);
  await pause(1300);
  await press(page);
  await pause(1300);
  await page.getByRole("button", { name: "Bugüne sabitle" }).click();
  await pause(900);
  await press(page);
  await pause(1400);
  const toggle = page.getByRole("button", { name: /^Tema:/ });
  await toggle.click();
  await pause(300);
  await toggle.click();
  await pause(1600);
  await press(page);
  await pause(1600);

  const video = page.video();
  await context.close();
  renameSync(await video.path(), `${OUT}walkthrough.webm`);
}

await browser.close();
console.log("recorded README media");
