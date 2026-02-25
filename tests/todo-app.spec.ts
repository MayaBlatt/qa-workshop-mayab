import { test, expect } from "@playwright/test";

test("renders todo items from the API", async ({ page }) => {
  await page.goto("/");

  const list = page.getByTestId("todo-list");
  await expect(list).toBeVisible();

  const items = list.getByRole("listitem");
  await expect(items).not.toHaveCount(0);
});

test("todo checkboxes are visible", async ({ page }) => {
  await page.goto("/");

  const firstCheckbox = page.getByTestId("todo-checkbox-1");
  await expect(firstCheckbox).toBeVisible();
});
