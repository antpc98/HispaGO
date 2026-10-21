import { View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { colors } from '../design/tokens';

export function TileRule() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ height: 16, overflow: 'hidden' }}
    >
      <Svg width="100%" height={16}>
        {Array.from({ length: 60 }, (_, index) => (
          <Path
            key={index}
            d={`m${index * 20} 8 8-8 8 8-8 8Z`}
            stroke={colors.albero}
            fill="none"
            strokeWidth={1}
          />
        ))}
        <Rect y={7} width="100%" height={2} fill={colors.paper} />
      </Svg>
    </View>
  );
}
