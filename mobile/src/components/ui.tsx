import { type Href, useFocusEffect, usePathname, useRouter } from 'expo-router';
import { type PropsWithChildren, useCallback, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  type ScrollViewInstance,
  StyleSheet,
  Text,
  type TextProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../design/tokens';
import { usePreviewSession } from '../demo/PreviewSession';
import { Icon } from './Icon';

export function Copy({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.copy, style]} />;
}
export function Eyebrow({ children, light = false }: PropsWithChildren<{ light?: boolean }>) {
  return <Text style={[styles.eyebrow, light && { color: colors.sage }]}>{children}</Text>;
}
export function Heading({
  children,
  small = false,
  accessibilityLabel,
}: PropsWithChildren<{ small?: boolean; accessibilityLabel?: string }>) {
  return (
    <Text
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel}
      style={[styles.heading, small && styles.smallHeading]}
    >
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
      <Copy>{children}</Copy>
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
      selected: pathname.startsWith('/routes') || pathname.startsWith('/stops'),
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
  scrollId,
}: PropsWithChildren<{
  backLabel?: string;
  backHref?: Href;
  edgeToEdge?: boolean;
  header?: boolean;
  scrollId?: string;
}>) {
  const router = useRouter();
  const [showScope, setShowScope] = useState(false);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const focused = useRef(false);
  const { getScrollPosition, setScrollPosition } = usePreviewSession();
  const restoreScroll = useCallback(() => {
    if (scrollId && focused.current)
      scrollRef.current?.scrollTo({ y: getScrollPosition(scrollId), animated: false });
  }, [scrollId, getScrollPosition]);
  useFocusEffect(
    useCallback(() => {
      focused.current = true;
      const frame = requestAnimationFrame(() => {
        if (Platform.OS === 'web') {
          const element = scrollRef.current?.getScrollableNode() as HTMLElement | undefined;
          const heading = element?.querySelector<HTMLElement>('[role="heading"]');
          heading?.setAttribute('tabindex', '-1');
          if (heading) heading.style.outline = 'none';
          // Do not steal focus from a control activated during hydration.
          if (!element?.contains(document.activeElement)) heading?.focus({ preventScroll: true });
        }
        restoreScroll();
      });
      return () => {
        focused.current = false;
        cancelAnimationFrame(frame);
      };
    }, [restoreScroll]),
  );
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.shell}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Prototipo: qué puedes explorar"
          accessibilityState={{ expanded: showScope }}
          {...(Platform.OS === 'web' ? { 'aria-expanded': showScope } : {})}
          onPress={() => setShowScope((open) => !open)}
          style={styles.ribbon}
        >
          <Text style={styles.ribbonText}>
            Prototipo · Qué puedes explorar {showScope ? '−' : '+'}
          </Text>
        </Pressable>
        <ScrollView
          ref={scrollRef}
          onLayout={restoreScroll}
          onContentSizeChange={restoreScroll}
          onScroll={(event) => {
            // Hidden stack screens can emit a zero scroll when their layout collapses.
            if (scrollId && focused.current && event.nativeEvent.layoutMeasurement.height > 0)
              setScrollPosition(scrollId, event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {showScope && (
            <View style={styles.scope}>
              <Heading small>Qué puedes explorar</Heading>
              <Copy>
                La propuesta del piloto y el estado de la primera parada. Todavía no hay narración
                disponible, mapa, ubicación ni progreso guardado. La búsqueda y los filtros son
                locales; se conservan al volver durante esta sesión, no al cerrar la app.
              </Copy>
              <Copy>Las portadas son ilustraciones artísticas, no fotografías ni planos.</Copy>
            </View>
          )}
          {header && (
            <View style={styles.brandRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="HispaGo, volver a Inicio"
                onPress={() => router.replace('/')}
                style={styles.brandButton}
              >
                <Text style={styles.brand}>
                  HISPAGO <Text style={{ fontFamily: fonts.body }}>SEVILLA</Text>
                </Text>
                <Text style={styles.brandTag}>RUTAS QUE CUENTAN HISTORIAS</Text>
              </Pressable>
            </View>
          )}
          <View style={edgeToEdge ? undefined : styles.content}>
            {backLabel && (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.dismissTo(backHref)}
                style={styles.back}
              >
                <Icon name="back" size={18} />
                <Copy style={styles.backText}>{backLabel}</Copy>
              </Pressable>
            )}
            {children}
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
    borderColor: colors.line,
  },
  scroll: { flexGrow: 1, paddingBottom: 28 },
  scope: { padding: 20, gap: 12, backgroundColor: colors.surface },
  ribbon: {
    backgroundColor: colors.sand,
    paddingVertical: 12,
    paddingHorizontal: 12,
    minHeight: 48,
    justifyContent: 'center',
  },
  ribbonText: { color: colors.ink, fontFamily: fonts.medium, fontSize: 12, textAlign: 'center' },
  brandRow: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 8 },
  brandButton: {
    minHeight: 48,
    justifyContent: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  brand: { fontFamily: fonts.strong, fontSize: 12, color: colors.ink, letterSpacing: 2 },
  brandTag: { fontFamily: fonts.body, fontSize: 10, letterSpacing: 0.5, color: colors.muted },
  content: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 22, gap: 14 },
  heading: { fontFamily: fonts.display, fontSize: 34, lineHeight: 42, color: colors.ink },
  smallHeading: { fontSize: 27, lineHeight: 34 },
  copy: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.muted },
  eyebrow: {
    fontFamily: fonts.strong,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1,
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
  buttonText: {
    fontFamily: fonts.strong,
    fontSize: 14,
    lineHeight: 22,
    color: colors.surface,
    flexShrink: 1,
  },
  notice: {
    backgroundColor: colors.sand,
    padding: 14,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.line,
  },
  back: {
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: { fontSize: 14, color: colors.ink, fontFamily: fonts.medium },
  navSafe: { borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  nav: { flexDirection: 'row', minHeight: 72, paddingTop: 7, paddingBottom: 5 },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 58,
    paddingHorizontal: 8,
  },
  navText: { fontFamily: fonts.medium, color: colors.muted, fontSize: 12 },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.terracotta,
  },
});
