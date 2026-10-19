// End-to-end check of the web build. Saves screenshots to tests/e2e/output.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const APP = process.env.APP_URL ?? "http://localhost:8090";
const OUT = new URL("./output/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const failures = [];
const step = async (name, fn) => {
  try {
    await fn();
    console.log(`ok   ${name}`);
  } catch (error) {
    failures.push(name);
    console.log(`FAIL ${name}\n     ${String(error.message).split("\n")[0]}`);
  }
};

const shot = (page, name) => page.screenshot({ path: `${OUT}${name}.png` });
const card = (page) => page.getByTestId("suggestion-card");
const title = async (page) => (await card(page).getByRole("heading").textContent())?.trim();
const press = (page) => page.getByRole("button", { name: "Ne Yapalım?", exact: true }).click();

async function noHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`page overflows horizontally by ${overflow}px`);
}

for (const [device, viewport] of [["mobile", { width: 390, height: 844 }], ["desktop", { width: 1280, height: 800 }]]) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 2, colorScheme: "light" });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`${device} page error: ${error.message}`));

  await step(`${device}: starts with an invitation`, async () => {
    await page.goto(APP);
    await page.getByText("Canın sıkıldı mı?").waitFor();
    await noHorizontalOverflow(page);
    await shot(page, `${device}-start`);
  });

  await step(`${device}: each press shows a different idea`, async () => {
    await press(page);
    await card(page).waitFor();
    let previous = await title(page);
    for (let i = 0; i < 12; i++) {
      await press(page);
      await page.waitForTimeout(80);
      const next = await title(page);
      if (next === previous) throw new Error(`"${next}" came twice in a row`);
      previous = next;
    }
    await page.waitForTimeout(400);
    await shot(page, `${device}-suggestion`);
  });

  await step(`${device}: category filter`, async () => {
    await page.getByRole("tab", { name: "Ev" }).click();
    for (let i = 0; i < 6; i++) {
      await press(page);
      await page.waitForTimeout(60);
      const label = await card(page).getByText(/^(Hareket|Zihin|Sosyal|Ev)$/).textContent();
      if (label !== "Ev") throw new Error(`got a ${label} idea under Ev`);
    }
    await page.getByText("Ev kategorisinde 11 öneri arasından", { exact: false }).waitFor();
    await page.waitForTimeout(400);
    await shot(page, `${device}-category`);
  });

  await step(`${device}: pin survives a reload`, async () => {
    const pinnedTitle = await title(page);
    await page.getByRole("button", { name: "Bugüne sabitle" }).click();
    await page.getByText("Sabitlendi · kaldır").waitFor();
    await press(page);
    await page.getByText("Bugünün önerisi").waitFor();
    await shot(page, `${device}-pinned`);
    await page.reload();
    await card(page).waitFor();
    if ((await title(page)) !== pinnedTitle) throw new Error("the pinned idea should open first after a reload");
    await page.getByRole("button", { name: "Sabitlemeyi kaldır" }).click();
  });

  await step(`${device}: dark theme`, async () => {
    const toggle = page.getByRole("button", { name: /^Tema:/ });
    await toggle.click(); // system → light
    await toggle.click(); // light → dark
    await page.waitForTimeout(300);
    const background = await page.evaluate(() => getComputedStyle(document.querySelector("[data-testid=suggestion-card]")).backgroundColor);
    if (background !== "rgb(28, 28, 26)") throw new Error(`card background is ${background} in dark mode`);
    await noHorizontalOverflow(page);
    await shot(page, `${device}-dark`);
    await page.reload();
    await card(page).waitFor().catch(() => {});
    await page.getByRole("button", { name: /Tema: koyu/ }).waitFor();
    await toggle.click(); // dark → system
  });

  await context.close();
}

await browser.close();
if (failures.length > 0) {
  console.log(`\n${failures.length} failure(s)`);
  process.exit(1);
}
console.log("\nall steps passed");
