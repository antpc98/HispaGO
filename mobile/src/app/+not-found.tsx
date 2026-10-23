import { useRouter } from 'expo-router';

import { Button, Copy, Heading, Screen } from '../components/ui';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <Screen>
      <Heading>Por aquí aún no hay camino.</Heading>
      <Copy>Esta pantalla no forma parte de la demostración.</Copy>
      <Button label="Volver a Inicio" onPress={() => router.replace('/')} />
    </Screen>
  );
}
