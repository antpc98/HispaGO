import { Platform, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

/** Original geometric illustration: an imagined patio, not a verified route location. */
export function PatioArt({ compact = false }: { compact?: boolean }) {
  return (
    <View
      style={[styles.frame, compact && styles.compact]}
      accessibilityRole="image"
      accessibilityLabel="Ilustración original de un patio imaginado, con arcos y un naranjo"
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 640 380"
        preserveAspectRatio="xMidYMid slice"
        {...(Platform.OS === 'web'
          ? { 'aria-hidden': true, focusable: false }
          : { accessible: false })}
      >
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#F4DBAA" />
            <Stop offset="1" stopColor="#EDB774" />
          </LinearGradient>
        </Defs>
        <Rect width={640} height={380} fill="#153E4A" />
        <Path d="M120 380V168a200 200 0 0 1 400 0v212Z" fill="url(#sky)" />
        <Circle cx={394} cy={106} r={33} fill="#FAEBC9" />
        <Path d="M105 244h118v-61h110v41h65v-82h55v102h92v136H105Z" fill="#D18C62" />
        <Path
          d="M403 142v-24h45v24m-35-24V95h26v23m-13-23V78"
          stroke="#A05C41"
          strokeWidth={5}
          fill="none"
        />
        <Path d="M126 271h395v109H126Z" fill="#EACB99" />
        <Path
          d="M190 278v-60a27 27 0 0 1 54 0v60m25 0v-60a27 27 0 0 1 54 0v60m25 0v-60a27 27 0 0 1 54 0v60m25 0v-60a27 27 0 0 1 54 0v60"
          fill="#8F684E"
        />
        <Path
          d="m320 282-120 98m120-98 120 98m-280-42h320m-350 28h380"
          stroke="#C09C73"
          strokeWidth={2}
        />
        <Path
          d="M87 380V161a233 233 0 0 1 466 0v219M106 380V161a214 214 0 0 1 428 0v219"
          stroke="#D4AC6C"
          strokeWidth={2}
          fill="none"
        />
        <Path d="M54 380V153M585 380V153" stroke="#31535A" strokeWidth={22} />
        <Path d="M39 154h30m501 0h30" stroke="#E5C18C" strokeWidth={5} />
        <Path d="M160 334v-91m0 39-24-30m24 14 29-31" stroke="#584C35" strokeWidth={7} />
        <G fill="#48654F">
          <Circle cx={140} cy={232} r={34} />
          <Circle cx={170} cy={217} r={39} />
          <Circle cx={195} cy={242} r={30} />
          <Circle cx={157} cy={255} r={35} />
        </G>
        <G fill="#E5A14A">
          <Circle cx={135} cy={239} r={5} />
          <Circle cx={175} cy={219} r={5} />
          <Circle cx={189} cy={250} r={5} />
          <Circle cx={156} cy={261} r={5} />
        </G>
        <Path d="m138 328 7 36h31l7-36Z" fill="#B65E40" />
        <Path d="M446 316h65l-8 43h-48Z" fill="#B65E40" />
        <Path
          d="M478 316c-30-35-28-53-18-58 19 5 20 30 18 58m0 0c31-34 33-53 22-56-18 10-20 30-22 56"
          fill="#48654F"
        />
        <Path d="M0 373h640" stroke="#D4AC6C" strokeWidth={14} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { height: 260, overflow: 'hidden', borderRadius: 4 },
  compact: { height: 210 },
});
