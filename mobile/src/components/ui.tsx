import { type Href, usePathname, useRouter } from 'expo-router';
import { type PropsWithChildren } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type TextProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../design/tokens';
import { Icon } from './Icon';

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
      {!disabled && (
        <Icon name="chevron" size={19} color={secondary ? colors.terracotta : colors.surface} />
      )}
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
function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const items = [
    { label: 'Inicio', href: '/' as Href, icon: 'home' as const, selected: pathname === '/' },
    {
      label: 'Rutas',
      href: '/routes' as Href,
      icon: 'map' as const,
      selected: pathname === '/routes',
    },
    {
      label: 'La propuesta',
      href: '/routes/figaro-demo' as Href,
      icon: 'book' as const,
      selected: pathname !== '/' && pathname !== '/routes',
    },
  ];
  return (
    <SafeAreaView edges={['bottom']} style={styles.navSafe}>
      <View
        style={styles.nav}
        accessibilityRole="tablist"
        accessibilityLabel="Navegación principal"
      >
        {items.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: item.selected }}
            {...(Platform.OS === 'web' ? { 'aria-selected': item.selected } : {})}
            onPress={() => router.replace(item.href)}
            style={styles.navItem}
          >
            <Icon
              name={item.icon}
              size={23}
              color={item.selected ? colors.terracotta : colors.muted}
            />
            <Text
              style={[
                styles.navText,
                item.selected && { color: colors.terracotta, fontFamily: fonts.strong },
              ]}
            >
              {item.label}
            </Text>
            {item.selected && <View style={styles.activeDot} />}
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
export function Screen({
  children,
  backLabel,
  backHref = '/routes',
  edgeToEdge = false,
  header = true,
}: PropsWithChildren<{
  backLabel?: string;
  backHref?: Href;
  edgeToEdge?: boolean;
  header?: boolean;
}>) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.shell}>
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>DEMO VISUAL · ENTREGA 1</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {header && (
            <View style={styles.brandRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="HispaGo, volver a Inicio"
                onPress={() => router.replace('/')}
                style={styles.brandButton}
              >
                <Text style={styles.brand}>
                  HISPAGO <Text style={styles.brandAccent}>SEVILLA</Text>
                </Text>
                <Text style={styles.brandTag}>RUTAS QUE CUENTAN HISTORIAS</Text>
              </Pressable>
              <Icon name="sun" color={colors.terracotta} size={22} />
            </View>
          )}
          <View style={edgeToEdge ? undefined : styles.content}>
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
            <Copy style={styles.footerText}>Sevilla, a tu paso.</Copy>
            <Text style={styles.footerSmall}>UNA PROPUESTA PARA DESCUBRIR, ESCUCHAR Y SENTIR</Text>
          </View>
        </ScrollView>
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
}
export const layout = StyleSheet.create({
  section: { gap: 14, marginTop: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 8 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    padding: 18,
    gap: 12,
  },
});
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E9E2D5',
  },
  scroll: { flexGrow: 1 },
  ribbon: { backgroundColor: '#EEE7D8', paddingVertical: 5, paddingHorizontal: 12 },
  ribbonText: {
    color: colors.muted,
    fontFamily: fonts.medium,
    fontSize: 8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  brandRow: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandButton: { minHeight: 48, justifyContent: 'center', gap: 5 },
  brand: { fontFamily: fonts.strong, fontSize: 11, color: colors.ink, letterSpacing: 2.4 },
  brandAccent: { fontFamily: fonts.body },
  brandTag: { fontFamily: fonts.body, fontSize: 7, letterSpacing: 1.7, color: colors.muted },
  content: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 22, gap: 14 },
  heading: { fontFamily: fonts.display, fontSize: 37, lineHeight: 39, color: colors.ink },
  smallHeading: { fontSize: 27, lineHeight: 31 },
  copy: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.muted },
  eyebrow: {
    fontFamily: fonts.strong,
    fontSize: 9,
    lineHeight: 15,
    letterSpacing: 1.7,
    color: colors.terracotta,
  },
  button: {
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: colors.terracotta,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.terracotta },
  disabled: { backgroundColor: colors.paleBlue },
  buttonText: { fontFamily: fonts.strong, fontSize: 13, color: colors.surface, flexShrink: 1 },
  notice: {
    backgroundColor: '#EEE9DE',
    padding: 12,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.line,
  },
  noticeText: { fontSize: 11, lineHeight: 17, color: colors.muted },
  back: {
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: { fontSize: 12, color: colors.ink, fontFamily: fonts.medium },
  footer: {
    paddingHorizontal: 22,
    paddingVertical: 25,
    gap: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: { fontFamily: fonts.italic, fontSize: 24, color: colors.ink },
  footerSmall: {
    fontFamily: fonts.medium,
    fontSize: 7,
    letterSpacing: 1.4,
    color: colors.muted,
    textAlign: 'center',
  },
  navSafe: { borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  nav: { flexDirection: 'row', minHeight: 72, paddingTop: 7, paddingBottom: 5 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 58 },
  navText: { fontFamily: fonts.medium, color: colors.muted, fontSize: 10 },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.terracotta,
  },
});
