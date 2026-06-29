import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './qa',
  timeout: 30000,
  retries: 1,
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10000,
  },
  webServer: {
    command: 'npx vite --port 3000',
    port: 3000,
    timeout: 10000,
    reuseExistingServer: true,
  },
})
