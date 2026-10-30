import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Artwork } from '../components/Artwork';
import { Copy, Eyebrow, Heading, layout, Notice, Screen } from '../components/ui';
import { type RoutePreview } from '../demo/catalog';
import { colors, fonts } from '../design/tokens';

export function StopScreen({ route }: { route: RoutePreview }) {
  const [showExample, setShowExample] = useState(false);
  const sample = route.sample;
  const isFiction = sample.kind === 'fiction';
  return (
    <Screen backLabel={`Volver a ${route.navigationLabel}`} backHref={`/routes/${route.slug}`}>
      <Eyebrow>{isFiction ? 'ESCENA FICTICIA · BORRADOR' : 'MATERIAL EDITORIAL'}</Eyebrow>
      <Heading>{sample.title}</Heading>
      <Copy>{sample.summary}</Copy>
      {isFiction ? (
        <>
          <Artwork kind={route.cover} fit="contain" style={styles.image} />
          <Copy style={styles.story}>{sample.text}</Copy>
          <Notice>{sample.note}</Notice>
          <View style={layout.card}>
            <Heading small>Ejemplo de observación</Heading>
            <Copy>
              Una pregunta ficticia para probar la interfaz. No evalúa respuestas ni concede XP.
            </Copy>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: showExample }}
              {...(Platform.OS === 'web' ? { 'aria-expanded': showExample } : {})}
              onPress={() => setShowExample((shown) => !shown)}
              style={styles.toggle}
            >
              <Text style={styles.toggleText}>
                {showExample ? 'Ocultar ejemplo' : 'Ver ejemplo de dinámica'}
              </Text>
            </Pressable>
            {showExample && <Copy accessibilityLiveRegion="polite">{sample.question}</Copy>}
          </View>
        </>
      ) : (
        <>
          <View style={layout.card}>
            <Heading small>La narración aún no está disponible</Heading>
            <Copy>
              Ana ha preparado un audio para esta primera parada. No hemos podido acceder al archivo
              en esta revisión, por lo que todavía no hay transcripción ni adaptación incorporadas.
            </Copy>
            <Copy>No mostramos un relato de sustitución ni una parada turística validada.</Copy>
          </View>
          <View style={layout.section}>
            <Heading small>Antes de incorporarlo</Heading>
            <Copy>
              Revisaremos la transcripción con Ana, separaremos las afirmaciones históricas que
              necesiten fuentes y acordaremos el punto de observación y la interacción.
            </Copy>
          </View>
        </>
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1.5, borderRadius: 12 },
  story: { fontSize: 17, lineHeight: 30, color: colors.ink },
  toggle: {
    minHeight: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.terracotta,
    borderRadius: 8,
  },
  toggleText: { color: colors.terracotta, fontFamily: fonts.strong, fontSize: 14, lineHeight: 22 },
});
