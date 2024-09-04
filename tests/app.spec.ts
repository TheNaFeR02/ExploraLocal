import { test, expect } from "@playwright/test";
import prisma from '@/client'
import { CustomObject } from "@prisma/client";

async function getObjectsToTest() {
  return await prisma.object.findMany({
    include: {
      details: true,
      frequentQuestions: true
    }
  })
}

test.describe('Object Pages', () => {
  let objectsToTest: CustomObject[] = []

  test.beforeAll(async () => {
    objectsToTest = await getObjectsToTest()
  })

  test('should render the information of all objects', async ({ page }) => {
    for (const { id, slug, title, subtitle, description, details, frequentQuestions } of objectsToTest) {

      // Navigate to the page containing the component
      await page.goto(`/object/${id}/${slug}`);

      // Check the main headers
      await expect(page.locator('h1')).toContainText(title);
      if (subtitle) await expect(page.locator('h2')).toContainText(subtitle);

      // Check the description section
      await expect(page.getByText(description)).toBeVisible()

      // Check the Details section
      await expect(page.locator('h3', { hasText: 'Detalles' })).toBeVisible()

      if (details) for (const { key, value } of details) {
        await expect(page.locator('p.font-semibold', { hasText: key })).toBeVisible()
        await expect(page.locator('p', { hasText: value })).toBeVisible()
      }

      // Check the frequent questions section  
      if (frequentQuestions) {
        for (const { question, answer } of frequentQuestions) {
          const questionLocator = page.locator(`button:has-text("${question}")`);
          await expect(questionLocator).toBeVisible();
          await questionLocator.click();
          const answerLocator = page.locator(`div[role="region"]:has-text("${answer}")`);
          await expect(answerLocator).toBeVisible();
        }
      }

    }
  })
})

