import { Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../design/tokens';

type Name =
  | 'arrow'
  | 'back'
  | 'pin'
  | 'headphones'
  | 'search'
  | 'check'
  | 'book'
  | 'sun'
  | 'home'
  | 'map'
  | 'landmark'
  | 'mask'
  | 'leaf'
  | 'fan'
  | 'clock'
  | 'walk'
  | 'chevron';
const paths: Record<Name, string> = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  back: 'M19 12H5m6-6-6 6 6 6',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z',
  headphones: 'M4 14v-3a8 8 0 0 1 16 0v3M4 13h3v7H4zM17 13h3v7h-3z',
  search: 'm16.5 16.5 4 4',
  check: 'm5 12 4 4L19 6',
  book: 'M12 5v15M3 4c4-1 6 0 9 1 3-1 5-2 9-1v15c-4-1-6 0-9 1-3-1-5-2-9-1Z',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  home: 'm3 10 9-7 9 7v11h-6v-7H9v7H3Z',
  map: 'm3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16',
  landmark: 'M3 21h18M5 21v-9h14v9M8 21v-6m4 6v-6m4 6v-6M7 12V7h10v5M10 7V3h4v4m-2-4V1',
  mask: 'M3 4c4 2 7 2 11 0v7c0 5-4 7-5.5 7S3 15 3 11Zm4 5h1m3 0h1m-5 4c1 1 2 1 3 0M16 7l5 1v7c0 4-3 6-5 6m0-10h2m-3 5h3',
  leaf: 'M5 21c5-8 8-12 15-18M9 15C3 14 3 10 4 7c4 0 7 2 6 6m2-1c0-6 4-9 8-9 1 5-2 9-8 9M6 19c-5 0-5-3-4-5 3-1 6 1 5 3',
  fan: 'M12 20 2 12a13 13 0 0 1 20 0Zm0 0V3m0 17L6 5m6 15 6-15m-6 15L3 9m9 11 9-11',
  clock: 'M12 7v5l3 2',
  walk: 'm9 5 2 3-3 5 5 3 2 5m-7-8-3 7m6-12 4 3h4',
  chevron: 'm9 6 6 6-6 6',
};

export function Icon({
  name,
  size = 22,
  color = colors.ink,
}: {
  name: Name;
  size?: number;
  color?: string;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...(Platform.OS === 'web'
        ? { 'aria-hidden': true, focusable: false }
        : { accessible: false })}
    >
      <Path d={paths[name]} />
      {name === 'pin' && <Circle cx={12} cy={10} r={2.5} />}
      {name === 'search' && <Circle cx={10} cy={10} r={6.5} />}
      {name === 'sun' && <Circle cx={12} cy={12} r={4} />}
      {name === 'clock' && <Circle cx={12} cy={12} r={9} />}
      {name === 'walk' && <Circle cx={13} cy={3} r={1.8} />}
    </Svg>
  );
}
