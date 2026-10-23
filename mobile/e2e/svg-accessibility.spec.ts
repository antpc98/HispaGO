import { expect, test } from '@playwright/test';

test('decorative SVGs use web accessibility attributes without React warnings', async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const exceptions: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => exceptions.push(error.message));

  for (const path of ['/', '/routes', '/routes/figaro-demo', '/stops/patio-demo']) {
    await page.goto(path);
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(
      page.getByRole('img', {
        name: /Ilustración artística/,
      }),
    ).toBeVisible();
    const artwork = page.getByRole('img', { name: /Ilustración artística/ });
    await expect
      .poll(() =>
        artwork.evaluate((element) => {
          const image = element.querySelector('img');
          return Boolean(image?.complete && image.naturalWidth > 0);
        }),
      )
      .toBe(true);
    const fitsFrame = await artwork.evaluate((element) => {
      const image = element.querySelector('img');
      if (!image) return false;
      const imageBox = image.getBoundingClientRect();
      const frame = element.getBoundingClientRect();
      return imageBox.width <= frame.width + 1 && imageBox.height <= frame.height + 1;
    });
    expect(fitsFrame).toBe(true);
    await expect(page.locator('svg[accessible]')).toHaveCount(0);
    await expect(page.locator('svg[aria-hidden="true"]').first()).toBeAttached();
    const decorativeSvgs = page.locator('svg[aria-hidden="true"]');
    for (const svg of await decorativeSvgs.all()) {
      expect(await svg.evaluate((element) => (element as SVGElement).tabIndex)).toBe(-1);
    }
  }

  expect(exceptions).toEqual([]);
  expect(consoleErrors.filter((error) => /non-boolean attribute|accessible/.test(error))).toEqual(
    [],
  );
});
