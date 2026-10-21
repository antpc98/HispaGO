import { expect, test } from '@playwright/test';
import path from 'node:path';

test('explore, route and stop form a working navigation flow', async ({ page, baseURL }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByText('DEMO VISUAL · ENTREGA 1')).toBeVisible();
  if (process.env.CAPTURE_DESIGN === '1') {
    await page.screenshot({
      path: path.resolve('../docs/design/screenshots/explorar.png'),
      fullPage: true,
    });
  }
  await page.getByRole('button', { name: 'Descubrir la propuesta' }).click();
  await expect(page).toHaveURL(/\/routes\/figaro-demo/);
  await expect(page.getByText('El recorrido', { exact: true })).toBeVisible();
  if (process.env.CAPTURE_DESIGN === '1') {
    await page.screenshot({
      path: path.resolve('../docs/design/screenshots/detalle.png'),
      fullPage: true,
    });
  }
  await page.getByRole('button', { name: 'Explorar una parada demo' }).click();
  await expect(page).toHaveURL(/\/stops\/patio-demo/);
  await expect(page.getByRole('button', { name: 'Audio pendiente' })).toBeDisabled();
  if (process.env.CAPTURE_DESIGN === '1') {
    await page.screenshot({
      path: path.resolve('../docs/design/screenshots/parada.png'),
      fullPage: true,
    });
  }
  await page.getByRole('button', { name: 'Ver ejemplo de dinámica' }).click();
  await expect(page.getByText('¿Qué crees que esconde esa puerta?')).toBeVisible();
  await page.getByRole('button', { name: 'La experiencia', exact: true }).click();
  await page.getByRole('button', { name: 'Explorar', exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}/`);
  expect(errors).toEqual([]);
});

test('filtering and searching recover from an empty state', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Historia', exact: true }).click();
  await expect(page.getByText('Aún no hay historias aquí')).toBeVisible();
  await page.getByRole('button', { name: 'Restablecer filtros' }).click();
  await page.getByLabel('Buscar experiencias de demostración').fill('FIGARO');
  await expect(page.getByText('Las bodas de Fígaro', { exact: true })).toBeVisible();
});

test('direct links render and layouts fit narrow and wide screens', async ({ page }) => {
  for (const width of [320, 412, 1280]) {
    await page.setViewportSize({ width, height: 915 });
    for (const path of ['/', '/routes/figaro-demo', '/stops/patio-demo']) {
      await page.goto(path);
      await expect(page.getByText('DEMO VISUAL · ENTREGA 1')).toBeVisible();
      await expect(page.getByRole('heading').first()).toBeVisible();
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflows, `${path} must fit ${width}px`).toBe(false);
    }
  }
});
