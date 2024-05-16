import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
	await page.goto("http://localhost:4200/movies");

	await expect(page.getByRole("heading")).toContainText("Movies");
	await expect(page.getByPlaceholder("Search by Movie Title")).toBeEmpty();
	await expect(page.getByLabel("Select Genre").locator("span")).toContainText("Select Genre");
	await expect(page.locator("app-movie-list")).toContainText("The Dark Knight");
	await expect(page.locator("app-movie-list")).toContainText("Popularity");
	await expect(page.locator("app-movie-list")).toContainText("Runtime");

	await page.getByPlaceholder("Search by Movie Title").click();
	await page.getByPlaceholder("Search by Movie Title").fill("The Godfather");

	await expect(page.locator("app-movie-list")).toContainText("The Godfather");

	await page.locator("button").filter({ hasText: "close" }).click();

	await expect(page.getByPlaceholder("Search by Movie Title")).toBeEmpty();
	await expect(page.getByRole("group")).toContainText("Items per page");

	await page.locator("mat-card").first().hover();
	await page.locator("mat-card").filter({ hasText: "Click to view more details" })
		.locator("div").first().click();

	await page.goto("http://localhost:4200/movie/the-dark-knight");

	await expect(page.locator("app-movie")).toContainText("Genres: Action, Crime, Drama");
	await expect(page.locator("app-movie")).toContainText("Popularity");
	await expect(page.locator("app-movie")).toContainText("Budget");
	await expect(page.locator("app-recently-visited-movies")).toContainText("Last Visited:");

	await page.getByRole("link", { name: "Movies" }).click();

	await page.goto("http://localhost:4200/movies");

	await page.locator("mat-card").first().hover();
	await page.locator("mat-card").filter({ hasText: "Click to view more details" })
		.locator("div").first().click();

	await page.goto("http://localhost:4200/movie/the-dark-knight");

	await page.locator("span").filter({ hasText: "The Dark Knight" }).nth(1).click();
	await expect(page.locator("app-movie")).toContainText("The Dark Knight");

	await page.goto("http://localhost:4200/movies");

	await page.getByText("Select Genre").click();
	await page.getByText("Comedy").click();

	await page.locator(".cdk-overlay-backdrop").click();
	await expect(page.locator("app-movie-list")).toContainText("Life Is Beautiful");
	await page.locator("mat-card").first().hover();
	await page.locator("mat-card").filter({ hasText: "Click to view more details" })
		.locator("div").first().click();

	await page.goto("http://localhost:4200/movie/parasite");
	await expect(page.locator("app-movie")).toContainText("Genres: Comedy");
});
