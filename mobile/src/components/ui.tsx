import { type Href, useRouter } from 'expo-router';
import { type PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, type TextProps, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../design/tokens';
import { Icon } from './Icon';
import { TileRule } from './TileRule';

export function Copy({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.copy, style]} />;
}

export function Eyebrow({ children, light = false }: PropsWithChildren<{ light?: boolean }>) {
  return <Text style={[styles.eyebrow, light && { color: colors.sage }]}>{children}</Text>;
}

export function Heading({ children, small = false }: PropsWithChildren<{ small?: boolean }>) {
  return (
    <Text accessibilityRole="header" style={[styles.heading, small && styles.smallHeading]}>
      {children}
    </Text>
  );
}

export function Button({
  label,
  onPress,
  disabled = false,
  secondary = false,
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        disabled && styles.disabled,
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={[styles.buttonText, (secondary || disabled) && { color: colors.ink }]}>
        {label}
      </Text>
      {!disabled && <Icon name="arrow" color={secondary ? colors.ink : colors.surface} />}
    </Pressable>
  );
}

export function Notice({ children }: PropsWithChildren) {
  return (
    <View style={styles.notice}>
      <Copy style={styles.noticeText}>{children}</Copy>
    </View>
  );
}

export function Screen({
  children,
  backLabel,
  backHref = '/',
}: PropsWithChildren<{ backLabel?: string; backHref?: Href }>) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.shell}>
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>DEMO VISUAL · ENTREGA 1</Text>
          </View>
          <View style={styles.brandRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="HispaGo, volver a Explorar"
              onPress={() => router.replace('/')}
              style={styles.brandButton}
            >
              <Text style={styles.brand}>
                Hispa<Text style={styles.brandAccent}>Go</Text>
                <Text style={styles.brandDot}>.</Text>
              </Text>
              <Text style={styles.brandTag}>SEVILLA, A TU PASO</Text>
            </Pressable>
            <View style={styles.location}>
              <Icon name="pin" size={17} />
              <Text style={styles.locationText}>Sevilla</Text>
            </View>
          </View>
          <TileRule />
          <View style={styles.content}>
            {backLabel && (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace(backHref)}
                style={styles.back}
              >
                <Icon name="back" size={18} />
                <Copy style={styles.backText}>{backLabel}</Copy>
              </Pressable>
            )}
            {children}
          </View>
          <View style={styles.footer}>
            <TileRule />
            <Copy style={styles.footerText}>Historias que se quedan contigo.</Copy>
            <Text style={styles.footerSmall}>HISPAGO · PROTOTIPO DE DISEÑO</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const layout = StyleSheet.create({
  section: { gap: 16, marginTop: 32 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 8 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    padding: 20,
    gap: 12,
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { flexGrow: 1 },
  shell: { width: '100%', maxWidth: 720, alignSelf: 'center', flex: 1 },
  ribbon: { backgroundColor: colors.ink, paddingVertical: 9, paddingHorizontal: 16 },
  ribbonText: {
    color: colors.surface,
    fontFamily: fonts.strong,
    fontSize: 10,
    letterSpacing: 2,
    textAlign: 'center',
  },
  brandRow: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandButton: { minHeight: 48, justifyContent: 'center' },
  brand: { fontFamily: fonts.display, fontSize: 38, color: colors.ink, lineHeight: 44 },
  brandAccent: { fontFamily: fonts.italic },
  brandDot: { color: colors.terracotta },
  brandTag: { fontFamily: fonts.medium, fontSize: 8, letterSpacing: 2.6, color: colors.muted },
  location: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: colors.paleBlue,
    padding: 9,
    borderRadius: 20,
  },
  locationText: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink },
  content: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 36, gap: 16 },
  heading: { fontFamily: fonts.display, fontSize: 44, lineHeight: 47, color: colors.ink },
  smallHeading: { fontSize: 30, lineHeight: 35 },
  copy: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: colors.muted },
  eyebrow: {
    fontFamily: fonts.strong,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 2,
    color: colors.terracotta,
  },
  button: {
    minHeight: 54,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.ink,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.ink },
  disabled: { backgroundColor: colors.paleBlue },
  buttonText: { fontFamily: fonts.strong, fontSize: 14, color: colors.surface, flexShrink: 1 },
  notice: {
    backgroundColor: colors.paleBlue,
    borderLeftWidth: 3,
    borderLeftColor: colors.ink,
    padding: 14,
    borderRadius: 3,
  },
  noticeText: { fontSize: 12, lineHeight: 19, color: colors.ink },
  back: {
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: { fontSize: 13, color: colors.ink, fontFamily: fonts.medium },
  footer: { paddingHorizontal: 24, paddingBottom: 24, gap: 12, marginTop: 'auto' },
  footerText: {
    fontFamily: fonts.italic,
    fontSize: 23,
    textAlign: 'center',
    color: colors.ink,
    marginTop: 12,
  },
  footerSmall: {
    fontFamily: fonts.medium,
    fontSize: 8,
    letterSpacing: 2,
    textAlign: 'center',
    color: colors.muted,
  },
});
