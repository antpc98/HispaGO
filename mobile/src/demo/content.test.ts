import { matchesDemoRoute } from './content';

describe('Demo catalog filtering', () => {
  it('finds Fígaro with or without accents and extra spaces', () => {
    expect(matchesDemoRoute('  FIGARO ', 'Todas')).toBe(true);
    expect(matchesDemoRoute('ópera', 'Ópera')).toBe(true);
  });
  it('combines the search and the category', () => {
    expect(matchesDemoRoute('figaro', 'Historia')).toBe(false);
    expect(matchesDemoRoute('otra ruta', 'Ópera')).toBe(false);
  });
  it('includes the single demo in Todas with no query', () => {
    expect(matchesDemoRoute('', 'Todas')).toBe(true);
  });
});
