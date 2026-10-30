import { fireEvent, render, screen } from '@testing-library/react-native';

import { PreviewSessionProvider } from '../demo/PreviewSession';
import { ExploreScreen } from './ExploreScreen';

describe('Catalog preview', () => {
  it('searches locally and recovers an honest empty state', async () => {
    await render(
      <PreviewSessionProvider>
        <ExploreScreen />
      </PreviewSessionProvider>,
    );
    expect(
      screen.getByRole('button', { name: /Explorar Plaza de España · Una historia/ }),
    ).toBeTruthy();
    await fireEvent.changeText(screen.getByLabelText('Buscar rutas'), 'sin resultados');
    expect(screen.getByText('No hay experiencias con estos filtros')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Restablecer filtros' }));
    expect(
      screen.getByRole('button', { name: /Explorar Plaza de España · Una historia/ }),
    ).toBeTruthy();
  });
  it('filters by actual availability instead of inheriting opera categories', async () => {
    await render(
      <PreviewSessionProvider>
        <ExploreScreen />
      </PreviewSessionProvider>,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Con narración disponible' }));
    expect(screen.getByText('No hay experiencias con estos filtros')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Ópera' })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Restablecer filtros' }));
    expect(screen.getByText('Plaza de España')).toBeTruthy();
  });
});
