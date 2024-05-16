import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "e2eTests",
	fullyParallel: true,
	retries: 1,
	workers: 1,
	reporter: "html",
	outputDir: "e2e-test-results",
	use: {
		baseURL: "http://localhost:4200/",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: "npm run start",
		url: "http://localhost:4200/",
		reuseExistingServer: true,
	},
});
