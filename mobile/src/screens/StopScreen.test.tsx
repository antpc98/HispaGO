import { fireEvent, render, screen } from '@testing-library/react-native';

import { StopScreen } from './StopScreen';

describe('Stop visual demo', () => {
  it('does not simulate an available audio and can reveal the mission preview', async () => {
    await render(<StopScreen />);
    expect(screen.getByRole('button', { name: 'Audio pendiente' })).toBeDisabled();
    await fireEvent.press(screen.getByRole('button', { name: 'Ver ejemplo de dinámica' }));
    expect(screen.getByText('¿Qué crees que esconde esa puerta?')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Ocultar ejemplo' }));
    expect(screen.queryByText('¿Qué crees que esconde esa puerta?')).toBeNull();
  });
});
