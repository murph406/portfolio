/*
 * Renders the Logo component in the installed Google Chrome and writes the favicon files.
 * Usage: npm run favicons [-- <output dir>]
 */
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

import { chromium } from "playwright-core"
import { createServer } from "vite"

const clientDir = fileURLToPath(new URL("../..", import.meta.url))
const outDir = path.resolve(process.argv[2] ?? path.join(clientDir, "public/favicon"))

const PNG_FILES = {
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "apple-touch-icon.png": 180,
  "android-chrome-192x192.png": 192,
  "android-chrome-512x512.png": 512,
}
const ICO_SIZES = [16, 32, 48]

// A fresh page per size: resizing one page can screenshot a half-repainted frame
async function renderPng(browser, url, size) {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  const errors = []
  page.on("pageerror", (error) => errors.push(error))

  await page.goto(url)
  await page.waitForSelector("svg", { timeout: 10_000 }).catch((error) => {
    throw errors[0] ?? error
  })
  await page.evaluate(() => document.fonts.ready)

  const png = await page.screenshot({ type: "png" })
  await page.close()
  return png
}

// An .ico is a 6-byte header, a 16-byte entry per image, then the images (PNG is allowed)
function toIco(images) {
  const header = Buffer.alloc(6 + 16 * images.length)
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(images.length, 4)

  let offset = header.length
  images.forEach(({ size, png }, index) => {
    const entry = 6 + 16 * index
    header.writeUInt8(size, entry) // width
    header.writeUInt8(size, entry + 1) // height
    header.writeUInt16LE(1, entry + 4) // color planes
    header.writeUInt16LE(32, entry + 6) // bits per pixel
    header.writeUInt32LE(png.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += png.length
  })

  return Buffer.concat([header, ...images.map(({ png }) => png)])
}

async function main() {
  const server = await createServer({ root: clientDir, logLevel: "warn" })
  let browser

  try {
    await server.listen()
    browser = await chromium.launch({ channel: "chrome" })

    const url = new URL("scripts/favicons/index.html", server.resolvedUrls.local[0]).href

    await mkdir(outDir, { recursive: true })

    for (const [file, size] of Object.entries(PNG_FILES)) {
      await writeFile(path.join(outDir, file), await renderPng(browser, url, size))
    }

    const icoImages = []
    for (const size of ICO_SIZES) {
      icoImages.push({ size, png: await renderPng(browser, url, size) })
    }
    await writeFile(path.join(outDir, "favicon.ico"), toIco(icoImages))

    console.log(`Wrote ${Object.keys(PNG_FILES).length + 1} files to ${outDir}`)
  } finally {
    await browser?.close()
    await server.close()
  }
}

await main()
