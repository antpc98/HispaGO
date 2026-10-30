import { expect, test } from '@playwright/test';

test('artwork is scoped correctly and decorative SVGs cause no React accessibility warnings', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  for (const url of [
    '/',
    '/routes',
    '/routes/plaza-de-espana',
    '/stops/plaza-de-espana-primera-parada',
    '/routes/figaro-demo',
    '/stops/patio-demo',
  ]) {
    await page.goto(url);
    await expect(page.getByRole('heading').first()).toBeVisible();
    if (url !== '/stops/plaza-de-espana-primera-parada') {
      const isFigaro = url.includes('figaro') || url.includes('patio');
      const image = page.getByRole('img', {
        name: isFigaro
          ? /Ilustración artística de una protagonista/
          : /Ilustración artística de Plaza de España/,
      });
      await expect(image).toBeVisible();
      await expect
        .poll(() =>
          image.evaluate((element) => {
            const img = element.querySelector('img');
            if (!img?.complete || img.naturalWidth === 0) return false;
            const frame = element.getBoundingClientRect(),
              box = img.getBoundingClientRect();
            return box.width <= frame.width + 1 && box.height <= frame.height + 1;
          }),
        )
        .toBe(true);
    }
    await expect(page.locator('svg[accessible]')).toHaveCount(0);
    for (const svg of await page.locator('svg[aria-hidden="true"]').all())
      expect(await svg.evaluate((element) => (element as SVGElement).tabIndex)).toBe(-1);
    if (!url.includes('figaro') && !url.includes('patio')) {
      await expect(page.getByText('Al otro lado del patio')).toHaveCount(0);
      await expect(page.getByRole('img', { name: /Giralda|protagonista de ópera/ })).toHaveCount(0);
    }
  }
  expect(errors).toEqual([]);
});
