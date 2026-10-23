import { Platform, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { colors, fonts } from '../design/tokens';
import { Icon } from './Icon';

/** Decorative layout only: no real coordinates, markers, streets or walking directions. */
export function MapPreview() {
  return (
    <View style={styles.frame}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 400 205"
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}
        {...(Platform.OS === 'web'
          ? { 'aria-hidden': true, focusable: false }
          : { accessible: false })}
      >
        <Rect width={400} height={205} fill="#EAE5D5" />
        <Path d="M70-10C120 60 5 140 55 220" stroke="#B6CED1" strokeWidth={38} fill="none" />
        <Path
          d="m140 0 30 205M240 0l-30 205M350 0l-70 205M105 40h310M90 90l300 30M80 160h320"
          stroke="#FAF7EF"
          strokeWidth={8}
          fill="none"
        />
        <Rect x={255} y={31} width={47} height={45} rx={7} fill="#D5D9BF" />
        <Rect x={117} y={126} width={40} height={43} rx={7} fill="#D5D9BF" />
      </Svg>
      <View style={styles.label}>
        <Icon name="map" size={27} color={colors.terracotta} />
        <Text style={styles.title}>Mapa en preparación</Text>
        <Text style={styles.copy}>
          Sin ubicación ni trazado de la ruta.{`\n`}Disponible en la entrega 4.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  frame: {
    height: 205,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFFCF6F5',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    maxWidth: '90%',
  },
  title: { fontFamily: fonts.display, fontSize: 24, lineHeight: 27, color: colors.ink },
  copy: {
    fontFamily: fonts.body,
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    color: colors.muted,
  },
});
