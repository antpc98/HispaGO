import { useId } from 'react';
import { Image, Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export type ArtworkKind = 'seville' | 'figaro';
const sources = {
  seville: require('../../assets/images/sevilla-hero.png'),
  figaro: require('../../assets/images/figaro-cover.png'),
};
export const artworkLabels = {
  seville:
    'Ilustración artística de Sevilla al atardecer, con naranjos y una torre evocadora de la Giralda',
  figaro:
    'Ilustración artística de una protagonista de ópera imaginada ante una evocación de Sevilla',
};

export function Artwork({
  kind,
  shade = 'none',
  style,
}: {
  kind: ArtworkKind;
  shade?: 'none' | 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
}) {
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <View
      style={[styles.frame, style]}
      accessibilityRole="image"
      accessibilityLabel={artworkLabels[kind]}
      pointerEvents="none"
    >
      <Image source={sources[kind]} style={styles.image} resizeMode="cover" accessible={false} />
      {shade !== 'none' && (
        <Svg
          width="100%"
          height="100%"
          style={StyleSheet.absoluteFill}
          {...(Platform.OS === 'web'
            ? { 'aria-hidden': true, focusable: false }
            : { accessible: false })}
        >
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <Stop
                offset="0"
                stopColor={shade === 'light' ? '#F7F3E9' : '#101D29'}
                stopOpacity={shade === 'light' ? 0.68 : 0.03}
              />
              <Stop
                offset="0.5"
                stopColor={shade === 'light' ? '#F7F3E9' : '#101D29'}
                stopOpacity={shade === 'light' ? 0.2 : 0.45}
              />
              <Stop
                offset="1"
                stopColor={shade === 'light' ? '#F7F3E9' : '#101D29'}
                stopOpacity={shade === 'light' ? 0 : 0.97}
              />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: 'hidden', backgroundColor: '#E9DDC2' },
  image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
});
