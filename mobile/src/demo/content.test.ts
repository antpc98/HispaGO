import {
  availabilityFilters,
  catalogRoutes,
  featuredRoute,
  figaroRoute,
  filterCatalog,
  pilotRoute,
  readAvailability,
  readCategory,
  routePreviews,
} from './catalog';
import { figaroDraft } from './content';

describe('Local preview catalog', () => {
  it('keeps the complete chosen title in one field and a stable independent identity', () => {
    expect(pilotRoute.title).toBe('Plaza de España · Una historia para mirar despacio');
    expect(pilotRoute.id).toBe('plaza-de-espana');
    expect(pilotRoute.slug).toBe('plaza-de-espana');
    expect(pilotRoute).not.toHaveProperty('subtitle');
    expect(featuredRoute).toBe(pilotRoute);
  });
  it('finds the pilot regardless of accents, case or whitespace', () => {
    expect(filterCatalog('  PLAZA DE ESPANA ', 'Todas', 'Todas')).toEqual([pilotRoute]);
    expect(filterCatalog('mirar despacio', 'Todas', 'Todas')).toEqual([pilotRoute]);
  });
  it('never treats the source reference as a playable narration', () => {
    expect(filterCatalog('', 'Todas', 'Con narración disponible')).toEqual([]);
    expect(availabilityFilters).toContain('Con narración disponible');
  });
  it('recovers invalid URL filters and excludes backlog from tourism search', () => {
    expect(readCategory('Ópera')).toBe('Todas');
    expect(readAvailability('invalid')).toBe('Todas');
    expect(filterCatalog('figaro', 'Todas', 'Todas')).toEqual([]);
    expect(filterCatalog('no existe', 'Todas', 'Todas')).toEqual([]);
    expect(catalogRoutes).toEqual([pilotRoute]);
  });
  it('keeps original Figaro identity, fiction and source separation', () => {
    expect(figaroRoute.id).toBe('demo-figaro');
    expect(figaroRoute.sample.id).toBe('demo-patio');
    expect(figaroRoute.sample.text).toBe(figaroDraft.stop.text);
    expect(figaroRoute.status).toBe('backlog');
    expect(pilotRoute.category).toBeNull();
    expect(pilotRoute.sample.kind).toBe('editorial-pending');
    expect(pilotRoute.sample.text).toBeUndefined();
    expect(pilotRoute.sample.sourceId).toBe('ana-audio-2026-10-30-12-19-47');
    expect(new Set(routePreviews.map((route) => route.id)).size).toBe(routePreviews.length);
    expect(new Set(routePreviews.map((route) => route.sample.id)).size).toBe(routePreviews.length);
  });
});
