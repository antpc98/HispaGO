import { fireEvent, render, screen } from '@testing-library/react-native';

import { figaroRoute, pilotRoute } from '../demo/catalog';
import { PreviewSessionProvider } from '../demo/PreviewSession';
import { StopScreen } from './StopScreen';

describe('Editorial source and fiction separation', () => {
  it('does not invent a transcript, a player or an activity for Ana', async () => {
    await render(
      <PreviewSessionProvider>
        <StopScreen route={pilotRoute} />
      </PreviewSessionProvider>,
    );
    expect(screen.getByText('La narración aún no está disponible')).toBeTruthy();
    expect(screen.queryByText('Al otro lado del patio')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Ver ejemplo de dinámica' })).toBeNull();
    expect(screen.queryByRole('button', { name: /Reproducir/ })).toBeNull();
  });
  it('preserves the original fictional Figaro sample separately', async () => {
    await render(
      <PreviewSessionProvider>
        <StopScreen route={figaroRoute} />
      </PreviewSessionProvider>,
    );
    expect(screen.getByText('Al otro lado del patio')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Ver ejemplo de dinámica' }));
    expect(screen.getByText('¿Qué crees que esconde esa puerta?')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Ocultar ejemplo' }));
    expect(screen.queryByText('¿Qué crees que esconde esa puerta?')).toBeNull();
  });
});
