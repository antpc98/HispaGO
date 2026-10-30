import { expect, test } from '@playwright/test';

test('prototype explanation is accessible and bottom navigation has only real sections', async ({
  page,
}) => {
  await page.goto('/');
  const scope = page.getByRole('button', { name: 'Prototipo: qué puedes explorar', exact: true });
  await expect(scope).toHaveAttribute('aria-expanded', 'false');
  await scope.click();
  await expect(scope).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByText('Las portadas son ilustraciones artísticas, no fotografías ni planos.'),
  ).toBeVisible();
  await scope.click();
  await page.getByRole('tab', { name: 'Rutas', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Rutas culturales' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'La propuesta' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Ópera' })).toHaveCount(0);
  await page.getByRole('tab', { name: 'Inicio', exact: true }).click();
  await expect(page.getByRole('tab', { name: 'Inicio', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('web keyboard activation and focus follow the route hierarchy', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Plaza de España · Una historia para mirar despacio' }),
  ).toBeFocused();
  const cta = page.getByRole('button', { name: 'Explorar Plaza de España', exact: true });
  await cta.focus();
  await expect(cta).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Plaza de España · Una historia para mirar despacio' }),
  ).toBeFocused();
  const next = page.getByRole('button', { name: 'Ver estado de la primera parada' });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Primera parada · Material de Ana' }),
  ).toBeFocused();
});

test('catalog scroll position and search survive a deliberate return within the session', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto('/routes');
  await page.getByLabel('Buscar rutas', { exact: true }).fill('plaza');
  const card = page.getByRole('button', { name: /Explorar Plaza de España · Una historia/ });
  await card.scrollIntoViewIfNeeded();
  const before = await page.getByLabel('Buscar rutas', { exact: true }).evaluate((input) => {
    let el: HTMLElement | null = input as HTMLElement;
    while (el && el.scrollHeight <= el.clientHeight + 1) el = el.parentElement;
    return el?.scrollTop ?? 0;
  });
  await card.click();
  await page.getByRole('button', { name: 'Volver a Rutas', exact: true }).click();
  await expect(page.getByLabel('Buscar rutas', { exact: true })).toHaveValue('plaza');
  await expect
    .poll(() =>
      page.getByLabel('Buscar rutas', { exact: true }).evaluate((input) => {
        let el: HTMLElement | null = input as HTMLElement;
        while (el && el.scrollHeight <= el.clientHeight + 1) el = el.parentElement;
        return el?.scrollTop ?? 0;
      }),
    )
    .toBeCloseTo(before, 0);
});
