import { test, expect } from "@playwright/test";

test("should navigate to the syllabus page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("text=Syllabus");

  await expect(page).toHaveURL("http://localhost:3000/syllabus");

  await expect(page.locator("h1")).toContainText("Syllabus");
});
