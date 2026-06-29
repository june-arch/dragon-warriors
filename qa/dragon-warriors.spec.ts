import { test, expect } from '@playwright/test'

test('Page loads and shows hero content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)
  await expect(page.locator('h1')).toContainText('DRAGON', { timeout: 10000 })
  await page.screenshot({ path: 'qa/hero-load.png', fullPage: false, timeout: 20000 })
})

test('Header visible on scroll', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.evaluate(() => window.scrollTo(0, 200))
  await page.waitForTimeout(500)
  await expect(page.locator('nav')).toBeVisible()
  await page.screenshot({ path: 'qa/header-scrolled.png' })
})

test('All nav items present', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  const navItems = ['Program', 'Berita', 'Temui TIM', 'Jadwal', 'Siapa Kami', 'Akademi', 'Daftar']
  for (const item of navItems) {
    await expect(page.getByText(item).first()).toBeVisible()
  }
})

test('Merchandise section visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.evaluate(() => document.getElementById('merchandise')?.scrollIntoView({ behavior: 'instant', block: 'start' }))
  await page.waitForTimeout(600)
  await expect(page.getByText('Gear Para Warrior').first()).toBeVisible()
  await page.screenshot({ path: 'qa/merchandise-section.png', timeout: 20000 })
})

test('Gallery section with filters', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView())
  await page.waitForTimeout(800)
  await expect(page.getByText('Setiap Momen, Sebuah Legenda').first()).toBeVisible()
  await page.screenshot({ path: 'qa/gallery-section.png' })
})

test('Footer partner logo loads', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(800)
  const logo = page.locator('img[alt*="Britannica Education"]')
  await expect(logo).toBeVisible()
  await page.screenshot({ path: 'qa/footer-partner.png' })
})

test('Mobile responsive — 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000)
  await page.screenshot({ path: 'qa/mobile-hero.png', fullPage: false, timeout: 20000 })
})

test('Page load sequence shows then hides', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(200)
  const loadOverlay = page.locator('[data-testid="load-sequence"]')
  await expect(loadOverlay).toBeVisible()
  await page.waitForTimeout(2500)
  await expect(loadOverlay).not.toBeVisible()
})

test('Scroll progress bar updates', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.evaluate(() => window.scrollTo(0, 500))
  await page.waitForTimeout(300)
  const progressBar = page.getByTestId('scroll-progress-fill')
  await expect(progressBar).toBeVisible()
  await expect(progressBar).toHaveCSS('width', /^[1-9]\d*\.?\d*px$/)
})
