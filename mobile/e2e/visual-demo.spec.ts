import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

const fullTitle = 'Plaza de España · Una historia para mirar despacio';
const routePath = '/routes/plaza-de-espana';
const samplePath = '/stops/plaza-de-espana-primera-parada';
const pages = [
  ['inicio', '/'],
  ['explorar', '/routes'],
  ['detalle', routePath],
  ['parada', samplePath],
] as const;

async function ready(page: Page) {
  await expect(page.getByRole('heading').first()).toBeVisible();
  // Set by Screen's focus effect after hydration, not present in static HTML.
  await expect(page.getByRole('heading').first()).toHaveAttribute('tabindex', '-1');
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page
        .locator('img')
        .evaluateAll((images) =>
          images.every(
            (img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
}
async function capture(page: Page, name: string) {
  if (process.env.CAPTURE_DESIGN !== '1') return;
  await ready(page);
  await page.screenshot({
    path: path.resolve(`../docs/design/screenshots/plaza-de-espana/${name}.png`),
    fullPage: true,
    scale: 'css',
    animations: 'disabled',
  });
}

test('pilot flow has a clear CTA and never passes Figaro fiction off as Ana material', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: fullTitle })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Explorar Plaza de España', exact: true }),
  ).toBeInViewport();
  await page.getByRole('button', { name: 'Explorar Plaza de España', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(routePath));
  await expect(page.getByRole('heading', { name: fullTitle })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Rutas', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByText('Mapa en preparación')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Ver estado de la primera parada' }),
  ).toBeInViewport();
  await page.getByRole('button', { name: 'Ver estado de la primera parada' }).click();
  await expect(page).toHaveURL(new RegExp(samplePath));
  await expect(page.getByText('La narración aún no está disponible')).toBeVisible();
  await expect(page.getByText('Al otro lado del patio')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Reproducir|Ver ejemplo/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Volver a Plaza de España', exact: true }).click();
  await expect(page.getByRole('heading', { name: fullTitle })).toBeVisible();
  await page.getByRole('button', { name: 'Volver a Rutas', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Rutas culturales' })).toBeVisible();
});

test('search, availability filters, clearing and URL reload are coherent', async ({ page }) => {
  await page.goto('/routes');
  await page.getByRole('button', { name: 'Con narración disponible', exact: true }).click();
  await expect(page.getByText('No hay experiencias con estos filtros')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Con narración disponible', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Restablecer filtros' }).click();
  await page.getByLabel('Buscar rutas', { exact: true }).fill('  PLAZA DE ESPANA ');
  await expect(
    page.getByRole('button', { name: `Explorar ${fullTitle}`, exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Buscar rutas', { exact: true })).toHaveValue('  PLAZA DE ESPANA ');
  await page.getByRole('button', { name: `Explorar ${fullTitle}`, exact: true }).click();
  await page.getByRole('button', { name: 'Volver a Rutas', exact: true }).click();
  await expect(page.getByLabel('Buscar rutas', { exact: true })).toHaveValue('  PLAZA DE ESPANA ');
  await page.getByRole('button', { name: 'Limpiar búsqueda y filtros' }).click();
  await page.getByLabel('Buscar rutas', { exact: true }).fill('figaro');
  await expect(page.getByText('No hay experiencias con estos filtros')).toBeVisible();
  await page.goto('/routes?category=Ópera&availability=invalid&q=plaza');
  await expect(
    page.getByRole('button', { name: `Explorar ${fullTitle}`, exact: true }),
  ).toBeVisible();
});

for (const width of [320, 390, 430, 768]) {
  test(`layout, controls, images and last content fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const [name, url] of pages) {
      await page.goto(url);
      await ready(page);
      const dimensions = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: [
          ...document.querySelectorAll<HTMLElement>(
            '[role="heading"], button, [role="button"], [role="tab"]',
          ),
        ]
          .filter((el) => el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0)
          .map((el) => el.textContent),
      }));
      expect(dimensions.overflow, url).toBe(false);
      expect(dimensions.clipped, url).toEqual([]);
      if (name === 'inicio')
        await expect(
          page.getByRole('button', { name: 'Explorar Plaza de España', exact: true }),
        ).toBeInViewport({ ratio: 1 });
      for (const control of await page.locator('[role="button"], [role="tab"], input').all()) {
        const box = await control.boundingBox();
        if (box) {
          expect(box.height, (await control.textContent()) ?? '').toBeGreaterThanOrEqual(44);
          expect(box.width).toBeGreaterThanOrEqual(44);
        }
      }
      const tab = page.getByRole('tab', { name: 'Rutas', exact: true });
      await expect(tab).toBeInViewport({ ratio: 1 });
      await capture(page, `${name}-${width}`);
      const last = page.getByText(
        name === 'inicio'
          ? 'Ver rutas'
          : name === 'explorar'
            ? 'Las bodas de Fígaro. Borrador conservado, fuera del piloto actual.'
            : name === 'detalle'
              ? 'Clasificación temática pendiente de revisión editorial.'
              : 'Revisaremos la transcripción con Ana, separaremos las afirmaciones históricas que necesiten fuentes y acordaremos el punto de observación y la interacción.',
        { exact: true },
      );
      await last.scrollIntoViewIfNeeded();
      await expect(last).toBeInViewport();
      const lastBox = await last.boundingBox();
      const navBox = await tab.boundingBox();
      expect(lastBox!.y + lastBox!.height).toBeLessThanOrEqual(navBox!.y + 1);
    }
  });
}

test('200 percent text-only enlargement wraps at all four widths without hiding content', async ({
  page,
}) => {
  for (const width of [320, 390, 430, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const [name, url] of pages) {
      await page.goto(url);
      await ready(page);
      const heading = page.getByRole('heading').first();
      const originalSize = await heading.evaluate((el) =>
        parseFloat(getComputedStyle(el).fontSize),
      );
      // All text, including semantic heading tags. This is not native font scaling.
      await page.evaluate(() => {
        const nodes = [
          ...document.querySelectorAll<HTMLElement>(
            'div, span, input, button, h1, h2, h3, h4, h5, h6',
          ),
        ].filter(
          (el) =>
            [...el.childNodes].some(
              (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
            ) || el instanceof HTMLInputElement,
        );
        const metrics = nodes.map((el) => ({
          el,
          size: parseFloat(getComputedStyle(el).fontSize),
          line: parseFloat(getComputedStyle(el).lineHeight),
        }));
        for (const { el, size, line } of metrics) {
          el.style.fontSize = `${size * 2}px`;
          if (Number.isFinite(line)) el.style.lineHeight = `${line * 2}px`;
        }
      });
      expect(await heading.evaluate((el) => parseFloat(getComputedStyle(el).fontSize))).toBe(
        originalSize * 2,
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
        false,
      );
      const clipped = await page
        .locator('[role="heading"], [role="button"], [role="tab"]')
        .evaluateAll((elements) =>
          elements
            .filter(
              (el) =>
                el.clientWidth > 0 &&
                (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2),
            )
            .map((el) => el.textContent),
        );
      expect(clipped, `${url} at ${width}px with text 200%`).toEqual([]);
      await capture(page, `${name}-${width}-text200`);
      const tab = page.getByRole('tab', { name: 'Rutas', exact: true });
      await expect(tab).toBeInViewport({ ratio: 1 });
      const last = page.getByText(
        name === 'inicio'
          ? 'Ver rutas'
          : name === 'explorar'
            ? 'Las bodas de Fígaro. Borrador conservado, fuera del piloto actual.'
            : name === 'detalle'
              ? 'Clasificación temática pendiente de revisión editorial.'
              : 'Revisaremos la transcripción con Ana, separaremos las afirmaciones históricas que necesiten fuentes y acordaremos el punto de observación y la interacción.',
        { exact: true },
      );
      await last.scrollIntoViewIfNeeded();
      await expect(last).toBeInViewport();
      if (name === 'inicio') {
        const cta = page.getByRole('button', { name: 'Explorar Plaza de España', exact: true });
        await cta.scrollIntoViewIfNeeded();
        await expect(cta).toBeInViewport();
      }
    }
  }
});

test('Figaro remains a separate addressable draft with its original fictional stop', async ({
  page,
}) => {
  await page.goto('/routes/figaro-demo');
  await expect(page.getByText('BORRADOR · SIGUIENTE EXPERIENCIA')).toBeVisible();
  await page.getByRole('button', { name: 'Ver escena ficticia' }).click();
  await expect(page).toHaveURL(/\/stops\/patio-demo/);
  await expect(page.getByRole('heading', { name: 'Al otro lado del patio' })).toBeVisible();
  await page.getByRole('button', { name: 'Ver ejemplo de dinámica' }).click();
  await expect(page.getByText('¿Qué crees que esconde esa puerta?')).toBeVisible();
  await page.getByRole('button', { name: 'Volver a Las bodas de Fígaro' }).click();
  await expect(page).toHaveURL(/\/routes\/figaro-demo/);
});
