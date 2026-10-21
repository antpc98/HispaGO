import { fireEvent, render, screen } from '@testing-library/react-native';

import { ExploreScreen } from './ExploreScreen';

describe('Explore visual demo', () => {
  it('filters the catalog and recovers from the empty state', async () => {
    await render(<ExploreScreen />);
    expect(screen.getByText('Las bodas de Fígaro')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Historia' }));
    expect(screen.queryByText('Las bodas de Fígaro')).toBeNull();
    expect(screen.getByText('Aún no hay historias aquí')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Restablecer filtros' }));
    expect(screen.getByText('Las bodas de Fígaro')).toBeTruthy();
  });

  it('handles search text and clearly identifies the demo', async () => {
    await render(<ExploreScreen />);
    await fireEvent.changeText(
      screen.getByLabelText('Buscar experiencias de demostración'),
      'sin resultados',
    );
    expect(screen.getByText('Aún no hay historias aquí')).toBeTruthy();
    expect(screen.getByText('DEMO VISUAL · ENTREGA 1')).toBeTruthy();
  });
});
