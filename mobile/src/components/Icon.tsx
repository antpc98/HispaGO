import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../design/tokens';

type Name = 'arrow' | 'back' | 'pin' | 'headphones' | 'search' | 'check' | 'book' | 'sun';
const paths: Record<Name, string> = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  back: 'M19 12H5m6-6-6 6 6 6',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z',
  headphones: 'M4 14v-3a8 8 0 0 1 16 0v3M4 13h3v7H4zM17 13h3v7h-3z',
  search: 'm16.5 16.5 4 4',
  check: 'm5 12 4 4L19 6',
  book: 'M12 5v15M3 4c4-1 6 0 9 1 3-1 5-2 9-1v15c-4-1-6 0-9 1-3-1-5-2-9-1Z',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
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
      accessible={false}
    >
      <Path d={paths[name]} />
      {name === 'pin' && <Circle cx={12} cy={10} r={2.5} />}
      {name === 'search' && <Circle cx={10} cy={10} r={6.5} />}
      {name === 'sun' && <Circle cx={12} cy={12} r={4} />}
    </Svg>
  );
}
