import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {setTimeout as sleep} from 'node:timers/promises';
import {chromium} from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const TMP_VIDEO_DIR = path.join(ROOT, '.tmp', 'showreel-captures');
const PUBLIC_SHOWREEL_DIR = path.join(ROOT, 'public', 'showreel');

const CAPTURE_WIDTH = Number(process.env.CAPTURE_WIDTH ?? 3840);
const CAPTURE_HEIGHT = Number(process.env.CAPTURE_HEIGHT ?? 2160);

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const ensureDir = async (dir) => {
  await fs.mkdir(dir, {recursive: true});
};

const clearDir = async (dir) => {
  await ensureDir(dir);
  const entries = await fs.readdir(dir);
  await Promise.all(entries.map((entry) => fs.rm(path.join(dir, entry), {recursive: true, force: true})));
};

const waitForServer = async (url, timeoutMs = 90000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return;
      }
    } catch {
      // Wait for server boot.
    }
    await sleep(500);
  }
  throw new Error(`Timeout waiting for server: ${url}`);
};

const smoothScrollTo = async (page, targetY, durationMs = 10000, steps = 80) => {
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const safeTarget = Math.max(0, Math.min(targetY, maxScroll));
  const startY = await page.evaluate(() => window.scrollY);

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const eased = t * t * (3 - 2 * t);
    const y = Math.round(startY + (safeTarget - startY) * eased);
    await page.evaluate((pos) => window.scrollTo({top: pos, behavior: 'auto'}), y);
    await sleep(Math.max(8, Math.floor(durationMs / steps)));
  }
};

const smoothScrollBy = async (page, deltaY, durationMs = 5000, steps = 36) => {
  const currentY = await page.evaluate(() => window.scrollY);
  await smoothScrollTo(page, currentY + deltaY, durationMs, steps);
};

const scrollToSection = async (page, selector, topOffset = 86) => {
  await page.evaluate(
    ({selectorArg, offsetArg}) => {
      const el = document.querySelector(selectorArg);
      if (!el) {
        return;
      }
      const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offsetArg);
      window.scrollTo({top: target, behavior: 'auto'});
    },
    {selectorArg: selector, offsetArg: topOffset}
  );
};

const setRangeValue = async (locator, value) => {
  await locator.evaluate(
    (el, v) => {
      const input = el;
      input.value = String(v);
      input.dispatchEvent(new Event('input', {bubbles: true}));
      input.dispatchEvent(new Event('change', {bubbles: true}));
    },
    value
  );
};

const triggerClickByIndex = async (page, selector, indices, spacingMs = 900) => {
  await page.evaluate(
    ({selectorArg, indicesArg, spacingArg}) => {
      const nodes = Array.from(document.querySelectorAll(selectorArg));
      indicesArg.forEach((idx, order) => {
        const target = nodes[idx];
        if (!target) {
          return;
        }
        window.setTimeout(() => {
          (target).dispatchEvent(
            new MouseEvent('click', {bubbles: true, cancelable: true, view: window})
          );
        }, order * spacingArg);
      });
    },
    {selectorArg: selector, indicesArg: indices, spacingArg: spacingMs}
  );
  await page.waitForTimeout(Math.max(900, indices.length * spacingMs + 500));
};

const captureClip = async (browser, name, routine) => {
  console.log(`Starting capture: ${name}`);
  const context = await browser.newContext({
    viewport: {width: CAPTURE_WIDTH, height: CAPTURE_HEIGHT},
    recordVideo: {
      dir: TMP_VIDEO_DIR,
      size: {width: CAPTURE_WIDTH, height: CAPTURE_HEIGHT},
    },
  });

  const page = await context.newPage();
  await page.goto(BASE_URL, {waitUntil: 'domcontentloaded'});
  await page.waitForSelector('#hero', {timeout: 30000});
  await page.waitForTimeout(1800);

  const video = page.video();
  await routine(page);
  await page.waitForTimeout(800);

  await page.close();
  await context.close();

  if (!video) {
    throw new Error(`No video created for clip: ${name}`);
  }

  const recordedPath = await video.path();
  const finalPath = path.join(PUBLIC_SHOWREEL_DIR, `${name}.webm`);
  await fs.copyFile(recordedPath, finalPath);
  console.log(`Saved: ${path.relative(ROOT, finalPath)}`);
};

const run = async () => {
  await clearDir(TMP_VIDEO_DIR);
  await clearDir(PUBLIC_SHOWREEL_DIR);

  const devServer = spawn(`${npmCmd} run dev -- --host 127.0.0.1 --port ${PORT} --strictPort`, {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  devServer.stdout.on('data', (chunk) => {
    const text = chunk.toString();
    if (text.includes('Local:')) {
      console.log(text.trim());
    }
  });
  devServer.stderr.on('data', (chunk) => {
    const text = chunk.toString().trim();
    if (text.length > 0) {
      console.log(text);
    }
  });

  try {
    await waitForServer(BASE_URL);
    const browser = await chromium.launch({headless: true});

    await captureClip(browser, 'full-scroll', async (page) => {
      await scrollToSection(page, '#hero', 0);
      await page.waitForTimeout(900);

      const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
      await smoothScrollTo(page, Math.round(maxScroll * 0.94), 52000, 300);
      await page.waitForTimeout(900);
      await smoothScrollTo(page, Math.round(maxScroll * 0.7), 9000, 58);
      await page.waitForTimeout(800);
      await smoothScrollTo(page, maxScroll, 7000, 44);
      await page.waitForTimeout(1500);
    });

    await captureClip(browser, 'robot-specs', async (page) => {
      await scrollToSection(page, '#process');
      await page.waitForTimeout(1300);
      await smoothScrollBy(page, 460, 4200, 32);

      await scrollToSection(page, '#robot');
      await page.waitForTimeout(1200);

      const cards = page.locator('#robot .grid > div');
      const cardsCount = await cards.count();
      const previewCards = Math.min(cardsCount, 4);
      for (let i = 0; i < previewCards; i++) {
        await cards.nth(i).hover();
        await page.waitForTimeout(700);
      }

      await smoothScrollBy(page, 420, 4800, 34);
      await page.waitForTimeout(700);
      await scrollToSection(page, '#process');
      await page.waitForTimeout(900);
      await smoothScrollBy(page, 680, 5200, 40);
      await page.waitForTimeout(4000);
    });

    await captureClip(browser, 'code-programs', async (page) => {
      await scrollToSection(page, '#code');
      await page.waitForTimeout(1300);
      await smoothScrollBy(page, 280, 3200, 30);

      const openButtons = page.getByRole('button', {name: /kód megnyitása|kod megnyitasa/i});
      const buttonCount = await openButtons.count();
      const previewsToOpen = Math.min(4, buttonCount);
      for (let i = 0; i < previewsToOpen; i++) {
        await openButtons.nth(i).click();
        await page.waitForTimeout(1000);
        const closeButton = page.getByRole('button', {name: /bezárás|bezaras/i}).first();
        if (await closeButton.isVisible()) {
          await closeButton.click();
        } else {
          await page.keyboard.press('Escape');
        }
        await page.waitForTimeout(600);
      }

      const rangeInputs = page.locator('#code input[type="range"]');
      const rangeCount = await rangeInputs.count();
      if (rangeCount >= 3) {
        await setRangeValue(rangeInputs.nth(0), 18);
        await page.waitForTimeout(520);
        await setRangeValue(rangeInputs.nth(1), 96);
        await page.waitForTimeout(520);
        await setRangeValue(rangeInputs.nth(2), 36);
        await page.waitForTimeout(620);
        await setRangeValue(rangeInputs.nth(0), 204);
        await page.waitForTimeout(520);
        await setRangeValue(rangeInputs.nth(1), 44);
        await page.waitForTimeout(520);
        await setRangeValue(rangeInputs.nth(2), 92);
      }

      await page.waitForTimeout(1800);
      await scrollToSection(page, '#pid');
      await page.waitForTimeout(1200);

      const pidSlider = page.locator('#pid input[type="range"]').first();
      if (await pidSlider.isVisible()) {
        await setRangeValue(pidSlider, 80);
        await page.waitForTimeout(600);
        await setRangeValue(pidSlider, 22);
        await page.waitForTimeout(600);
        await setRangeValue(pidSlider, 58);
      }

      const pidButtons = page.locator('#pid button');
      const pidButtonCount = await pidButtons.count();
      const clickSequence = [0, 1, 2, 4].filter((idx) => idx < pidButtonCount);
      for (const idx of clickSequence) {
        await pidButtons.nth(idx).click();
        await page.waitForTimeout(620);
      }

      await smoothScrollBy(page, 420, 4600, 38);
      await page.waitForTimeout(10000);
    });

    await captureClip(browser, 'strategy-dashboard', async (page) => {
      await scrollToSection(page, '#strategy');
      await page.waitForTimeout(1400);

      await triggerClickByIndex(page, '#strategy button', [0, 2, 5, 8, 3, 9], 900);

      await page.evaluate(() => {
        const zoomTarget = document.querySelector('#strategy .cursor-zoom-in');
        if (zoomTarget) {
          (zoomTarget).dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
        }
      });
      await page.waitForTimeout(1200);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);

      await smoothScrollBy(page, 420, 3600, 30);
      await page.waitForTimeout(7000);
    });

    await captureClip(browser, 'mission-flow', async (page) => {
      await scrollToSection(page, '#evolution');
      await page.waitForTimeout(1500);
      await smoothScrollBy(page, 760, 7600, 52);
      await page.waitForTimeout(700);

      await scrollToSection(page, '#opensource');
      await page.waitForTimeout(1400);

      await page.evaluate(() => {
        const repoCard = document.querySelector('#opensource .group');
        if (repoCard) {
          repoCard.dispatchEvent(new MouseEvent('mouseenter', {bubbles: true, cancelable: true, view: window}));
        }
      });

      await smoothScrollBy(page, 680, 6200, 42);
      await page.waitForTimeout(700);

      const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
      await smoothScrollTo(page, maxScroll, 6200, 40);
      await page.waitForTimeout(6000);
    });

    await browser.close();
  } finally {
    if (process.platform === 'win32' && devServer.pid) {
      spawn('taskkill', ['/pid', String(devServer.pid), '/T', '/F'], {stdio: 'ignore'});
    } else {
      devServer.kill('SIGTERM');
    }
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
