import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Artwork } from '../components/Artwork';
import { Icon } from '../components/Icon';
import { MapPreview } from '../components/MapPreview';
import { Button, Copy, Eyebrow, Heading, layout, Notice, Screen } from '../components/ui';
import { demoRoute } from '../demo/content';
import { colors, fonts } from '../design/tokens';

export function RouteDetailScreen() {
  const router = useRouter();
  return (
    <Screen edgeToEdge header={false}>
      <View style={styles.hero}>
        <Artwork kind="figaro" shade="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.heroControls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver a Rutas"
            onPress={() => router.replace('/routes')}
            style={styles.back}
          >
            <Icon name="back" color={colors.surface} size={23} />
          </Pressable>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ÓPERA · VISTA PREVIA</Text>
          </View>
        </View>
        <View style={styles.heroCopy}>
          <Text accessibilityRole="header" style={styles.title}>
            {demoRoute.title}
          </Text>
          <Text style={styles.subtitle}>{demoRoute.subtitle}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.facts}>
          <View style={styles.fact}>
            <Icon name="clock" color={colors.terracotta} size={17} />
            <Text style={styles.factValue}>Por validar</Text>
            <Text style={styles.factLabel}>Duración</Text>
          </View>
          <View style={styles.fact}>
            <Icon name="walk" color={colors.terracotta} size={17} />
            <Text style={styles.factValue}>Por validar</Text>
            <Text style={styles.factLabel}>Distancia</Text>
          </View>
          <View style={styles.fact}>
            <Icon name="pin" color={colors.terracotta} size={17} />
            <Text style={styles.factValue}>Por definir</Text>
            <Text style={styles.factLabel}>Acceso y recorrido</Text>
          </View>
        </View>
        <MapPreview />
        <View style={styles.sectionTitle}>
          <Heading small>El recorrido</Heading>
          <Text style={styles.demo}>MUESTRA VISUAL</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ver parada de muestra: Al otro lado del patio"
          onPress={() => router.push('/stops/patio-demo')}
          style={styles.stopRow}
        >
          <View style={styles.number}>
            <Text style={styles.numberText}>1</Text>
          </View>
          <View style={styles.stopCopy}>
            <Text style={styles.stopTitle}>{demoRoute.stop.title}</Text>
            <Copy style={styles.stopNote}>Escena imaginada · Sin ubicación asignada</Copy>
          </View>
          <Icon name="chevron" size={17} />
        </Pressable>
        <Button label="Explorar una parada demo" onPress={() => router.push('/stops/patio-demo')} />
        <View style={layout.section}>
          <Eyebrow>AMOR, SECRETOS Y PODER</Eyebrow>
          <Heading small>Una ciudad. Mil historias.</Heading>
          <Copy>{demoRoute.description}</Copy>
        </View>
        <Notice>
          {demoRoute.disclaimer} Las ilustraciones son evocaciones artísticas, no documentos
          históricos. La duración, distancia y accesibilidad se mostrarán cuando estén verificadas.
        </Notice>
        <View style={layout.section}>
          <Heading small>Antes de empezar</Heading>
          <Copy>
            Esta es una propuesta visual. La ruta real, el mapa, el audio y el progreso llegarán en
            sus fases. No se han publicado coordenadas ni paradas turísticas.
          </Copy>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { minHeight: 310, justifyContent: 'space-between', backgroundColor: colors.ink },
  heroControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#182C3D77',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.sand,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  badgeText: { fontFamily: fonts.strong, fontSize: 8, color: colors.ink, letterSpacing: 0.7 },
  heroCopy: { padding: 22, paddingBottom: 36, gap: 7, marginTop: 115 },
  title: { fontFamily: fonts.display, fontSize: 37, lineHeight: 39, color: colors.surface },
  subtitle: { fontFamily: fonts.body, fontSize: 15, color: '#F5EAD6', lineHeight: 23 },
  content: {
    paddingHorizontal: 19,
    paddingTop: 17,
    paddingBottom: 20,
    backgroundColor: colors.paper,
    marginTop: -15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 16,
  },
  facts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    paddingBottom: 3,
  },
  fact: { flex: 1, minWidth: 80, gap: 4, alignItems: 'center' },
  factValue: { fontFamily: fonts.strong, fontSize: 11, color: colors.ink },
  factLabel: { fontFamily: fonts.body, fontSize: 8, color: colors.muted, textAlign: 'center' },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 7,
  },
  demo: { fontFamily: fonts.medium, fontSize: 7, color: colors.muted, letterSpacing: 1 },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.line,
    minHeight: 64,
  },
  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: { fontFamily: fonts.strong, fontSize: 12, color: colors.surface },
  stopCopy: { flex: 1, gap: 4 },
  stopTitle: { fontFamily: fonts.display, fontSize: 21, lineHeight: 24, color: colors.ink },
  stopNote: { fontSize: 9, lineHeight: 15 },
});
