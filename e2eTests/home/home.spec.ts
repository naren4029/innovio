
import { test, expect } from "@playwright/test";

test("Home", async ({ page }) => {

	await page.goto("http://localhost:4200/home");
	await expect(page.locator("app-header")).toContainText("Innovio");
	await expect(page.getByRole("heading")).toContainText("Top Popular Movies");
	await expect(page.getByRole("navigation")).toContainText("Home");
	await expect(page.getByRole("navigation")).toContainText("Movies");
	await expect(page.locator("app-movie-list")).toContainText("Click to view more details");
	await expect(page.locator("app-movie-list")).toContainText("The Dark Knight");
	await expect(page.locator("app-movie-list")).toContainText("Popularity");
	await expect(page.locator("app-movie-list")).toContainText("Runtime");
	await expect(page.locator("#mat-paginator-page-size-label-0")).toContainText("Items per page");

});
