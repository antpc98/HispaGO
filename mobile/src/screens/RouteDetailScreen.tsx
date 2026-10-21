import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '../components/Icon';
import { PatioArt } from '../components/PatioArt';
import { Button, Copy, Eyebrow, Heading, layout, Notice, Screen } from '../components/ui';
import { demoRoute } from '../demo/content';
import { colors, fonts } from '../design/tokens';

export function RouteDetailScreen() {
  const router = useRouter();
  return (
    <Screen backLabel="Explorar">
      <Eyebrow>ÓPERA · UNA CIUDAD, MIL SECRETOS</Eyebrow>
      <Heading>{demoRoute.title}</Heading>
      <Text style={styles.subtitle}>{demoRoute.subtitle}</Text>
      <PatioArt />
      <Copy>{demoRoute.description}</Copy>
      <View style={styles.practical}>
        <View style={styles.fact}>
          <Icon name="pin" />
          <Copy style={styles.factTitle}>El recorrido</Copy>
          <Copy style={styles.factValue}>Por validar</Copy>
        </View>
        <View style={styles.fact}>
          <Icon name="sun" />
          <Copy style={styles.factTitle}>Cuándo ir</Copy>
          <Copy style={styles.factValue}>Por definir</Copy>
        </View>
        <View style={styles.fact}>
          <Icon name="headphones" />
          <Copy style={styles.factTitle}>La narración</Copy>
          <Copy style={styles.factValue}>En preparación</Copy>
        </View>
      </View>
      <Notice>
        {demoRoute.disclaimer} La duración, distancia, accesibilidad y condiciones de acceso se
        mostrarán cuando estén verificadas.
      </Notice>
      <View style={layout.section}>
        <Eyebrow>EL ARTE DE IR SIN PRISA</Eyebrow>
        <Heading small>Una historia, paso a paso</Heading>
        <Copy>
          La experiencia combinará relatos, escucha y pequeñas dinámicas. Aquí puedes recorrer una
          muestra visual de cómo se presentará cada parada.
        </Copy>
        <View style={layout.card}>
          <View style={layout.row}>
            <View style={styles.number}>
              <Text style={styles.numberText}>01</Text>
            </View>
            <View style={styles.stopLabel}>
              <Copy style={styles.stopTitle}>{demoRoute.stop.title}</Copy>
              <Copy style={styles.small}>Escena imaginada · Sin ubicación asignada</Copy>
            </View>
          </View>
          <Button
            label="Explorar una parada demo"
            onPress={() => router.push('/stops/patio-demo')}
          />
        </View>
      </View>
      <View style={layout.section}>
        <Heading small>Antes de empezar</Heading>
        <Copy>
          Esta entrega sirve para valorar la identidad y la navegación. El inicio de una ruta real,
          el mapa, el audio y el guardado de progreso se incorporarán en las siguientes entregas.
        </Copy>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { fontFamily: fonts.italic, fontSize: 28, lineHeight: 34, color: colors.terracotta },
  practical: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    paddingVertical: 20,
    gap: 16,
    marginVertical: 4,
  },
  fact: { flex: 1, minWidth: 100, gap: 6 },
  factTitle: { fontSize: 11, color: colors.ink, fontFamily: fonts.strong },
  factValue: { fontSize: 11, lineHeight: 17 },
  number: {
    width: 44,
    height: 44,
    backgroundColor: colors.paleBlue,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { fontFamily: fonts.display, fontSize: 25, color: colors.ink },
  stopLabel: { flex: 1, minWidth: 150, gap: 4 },
  stopTitle: { color: colors.ink, fontFamily: fonts.strong },
  small: { fontSize: 11, lineHeight: 18 },
});
