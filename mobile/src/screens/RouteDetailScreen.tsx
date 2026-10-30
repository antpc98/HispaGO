import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Artwork } from '../components/Artwork';
import { Button, Copy, Eyebrow, Heading, layout, Screen } from '../components/ui';
import { type RoutePreview } from '../demo/catalog';

export function RouteDetailScreen({ route }: { route: RoutePreview }) {
  const router = useRouter();
  return (
    <Screen backLabel="Volver a Rutas" scrollId={`route-${route.id}`}>
      <Eyebrow>
        {route.status === 'backlog' ? 'BORRADOR · SIGUIENTE EXPERIENCIA' : 'EXPERIENCIA PILOTO'}
      </Eyebrow>
      <Heading accessibilityLabel={route.title}>{route.title.replace(' · ', ' ·\n')}</Heading>
      <Copy>{route.description}</Copy>
      <Button label={route.sample.cta} onPress={() => router.push(`/stops/${route.sample.slug}`)} />
      <Artwork kind={route.cover} fit="contain" style={styles.image} />
      <Copy style={styles.caption}>Ilustración artística · No es una fotografía documental</Copy>
      <View style={layout.section}>
        <Heading small>La mirada de esta experiencia</Heading>
        <Copy>{route.approach}</Copy>
      </View>
      <View style={layout.card}>
        <Heading small>{route.sample.title}</Heading>
        <Copy>{route.sample.summary}</Copy>
      </View>
      <View style={layout.section}>
        <Heading small>Información práctica</Heading>
        <Copy>{route.practicalNote}</Copy>
        <Copy>
          {route.category
            ? `Clasificación del borrador: ${route.category}.`
            : 'Clasificación temática pendiente de revisión editorial.'}
        </Copy>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1.5, borderRadius: 12 },
  caption: { fontSize: 12, lineHeight: 18 },
});
