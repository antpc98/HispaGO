import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Artwork } from '../components/Artwork';
import { Button, Copy, Eyebrow, Heading, Screen } from '../components/ui';
import { featuredRoute } from '../demo/catalog';
import { colors } from '../design/tokens';

export function HomeScreen() {
  const router = useRouter();
  const route = featuredRoute;
  return (
    <Screen>
      <Eyebrow>LA PRIMERA MIRADA</Eyebrow>
      <Heading accessibilityLabel={route.title}>{route.title.replace(' · ', ' ·\n')}</Heading>
      <Copy>{route.description}</Copy>
      <Button
        label={`Explorar ${route.navigationLabel}`}
        onPress={() => router.push(`/routes/${route.slug}`)}
      />
      <View style={styles.art}>
        <Artwork kind={route.cover} fit="contain" style={styles.image} />
        <Copy style={styles.caption}>Ilustración artística</Copy>
      </View>
      <View style={styles.section}>
        <Heading small>Otra forma de mirar</Heading>
        <Copy>{route.approach}</Copy>
        <Copy>{route.sample.summary}</Copy>
        <Button secondary label="Ver rutas" onPress={() => router.push('/routes')} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  art: { backgroundColor: colors.sand, borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', aspectRatio: 1.5 },
  caption: { paddingHorizontal: 12, paddingVertical: 7, fontSize: 12, color: colors.ink },
  section: { gap: 14, marginTop: 8 },
});
