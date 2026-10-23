import { expect, test } from '@playwright/test';

test('home collections open the matching demo category and bottom tabs navigate', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Arte y cultura', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Ópera', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByText('Las bodas de Fígaro', { exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Rutas', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.getByRole('tab', { name: 'Inicio', exact: true }).click();
  await page.getByRole('button', { name: 'Historia y monumentos', exact: true }).click();
  await expect(page.getByText('Aún no hay historias aquí')).toBeVisible();
  await page.getByRole('tab', { name: 'La propuesta', exact: true }).click();
  await expect(page.getByText('Mapa en preparación')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Empezar ruta', exact: true })).toHaveCount(0);
  await expect(
    page.getByText('Sin ubicación ni trazado de la ruta.', { exact: false }),
  ).toBeVisible();
});
