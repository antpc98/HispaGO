import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '../components/Icon';
import { PatioArt } from '../components/PatioArt';
import { Button, Copy, Eyebrow, Heading, layout, Notice, Screen } from '../components/ui';
import { demoRoute } from '../demo/content';
import { colors, fonts } from '../design/tokens';

export function StopScreen() {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <Screen backLabel="La experiencia" backHref="/routes/figaro-demo">
      <Eyebrow>UNA PARADA · VISTA DE DEMOSTRACIÓN</Eyebrow>
      <Heading>{demoRoute.stop.title}</Heading>
      <PatioArt compact />
      <View style={styles.player}>
        <View style={layout.row}>
          <Icon name="headphones" color={colors.sage} />
          <Eyebrow light>LA VOZ DE LA HISTORIA</Eyebrow>
        </View>
        <Text style={styles.playerTitle}>Hay historias que piden ser escuchadas.</Text>
        <Text style={styles.playerCopy}>
          Aquí encontrarás la narración y sus controles cuando el audio esté preparado y aprobado.
        </Text>
        <Button label="Audio pendiente" disabled />
        <Text style={styles.playerFoot}>Sin archivo de audio en esta demostración.</Text>
      </View>
      <View style={layout.section}>
        <Eyebrow>{demoRoute.stop.label}</Eyebrow>
        <Heading small>Imagina por un momento…</Heading>
        <Copy style={styles.story}>{demoRoute.stop.text}</Copy>
        <Notice>{demoRoute.stop.note}</Notice>
      </View>
      <View style={[layout.card, { marginTop: 20 }]}>
        <View style={layout.row}>
          <Icon name="book" color={colors.terracotta} />
          <Eyebrow>UNA MIRADA MÁS ATENTA</Eyebrow>
        </View>
        <Heading small>Las historias también se juegan</Heading>
        <Copy>
          En la app podrás responder preguntas, observar detalles y elegir cómo continúa una escena.
        </Copy>
        <Button
          secondary
          label={showPreview ? 'Ocultar ejemplo' : 'Ver ejemplo de dinámica'}
          onPress={() => setShowPreview((value) => !value)}
        />
        {showPreview && (
          <View accessibilityLiveRegion="polite" style={styles.preview}>
            <Copy style={styles.question}>¿Qué crees que esconde esa puerta?</Copy>
            <Copy>
              Una pregunta imaginada para mostrar el tono de la experiencia. Las respuestas, la
              evaluación y el XP se implementarán más adelante.
            </Copy>
          </View>
        )}
      </View>
      <Notice>
        Este recorrido visual no guarda progreso, concede XP ni registra ubicación. Puedes volver al
        catálogo y explorar libremente.
      </Notice>
    </Screen>
  );
}

const styles = StyleSheet.create({
  player: { backgroundColor: colors.ink, borderRadius: 6, padding: 22, gap: 16 },
  playerTitle: { color: colors.surface, fontFamily: fonts.display, fontSize: 29, lineHeight: 34 },
  playerCopy: { color: colors.sage, fontFamily: fonts.body, fontSize: 12, lineHeight: 20 },
  playerFoot: { color: colors.sage, fontFamily: fonts.body, fontSize: 10, textAlign: 'center' },
  story: { fontSize: 17, lineHeight: 30, color: colors.ink },
  preview: { borderTopWidth: 1, borderColor: colors.line, paddingTop: 16, gap: 8 },
  question: { fontFamily: fonts.strong, color: colors.ink },
});
