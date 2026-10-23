import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Artwork } from '../components/Artwork';
import { Icon } from '../components/Icon';
import { Button, Copy, Eyebrow, Heading, layout, Notice, Screen } from '../components/ui';
import {
  categories,
  type DemoCategory,
  demoRoute,
  matchesDemoRoute,
  readDemoCategory,
} from '../demo/content';
import { colors, fonts } from '../design/tokens';

const upcoming = [
  { title: 'Historia y monumentos', subtitle: 'Grandes épocas, nuevas miradas', icon: 'landmark' },
  {
    title: 'Tradiciones y barrios',
    subtitle: 'Oficios, encuentros y vida cotidiana',
    icon: 'leaf',
  },
  {
    title: 'Personajes y leyendas',
    subtitle: 'Relatos que despiertan la imaginación',
    icon: 'fan',
  },
] as const;

export function ExploreScreen() {
  const params = useLocalSearchParams<{ category?: string | string[] }>();
  const requestedCategory = readDemoCategory(params.category);
  return <Catalog key={requestedCategory} initialCategory={requestedCategory} />;
}

function Catalog({ initialCategory }: { initialCategory: DemoCategory }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DemoCategory>(initialCategory);
  const matches = matchesDemoRoute(search, category);
  return (
    <Screen>
      <Heading>Rutas culturales</Heading>
      <Copy style={styles.subtitle}>Descubre Sevilla a través de sus historias.</Copy>
      <View style={styles.search}>
        <Icon name="search" size={18} />
        <TextInput
          accessibilityLabel="Buscar experiencias de demostración"
          placeholder="Busca una historia…"
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        accessibilityRole="toolbar"
        accessibilityLabel="Categorías de demostración"
      >
        {categories.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityState={{ selected: category === item }}
            {...(Platform.OS === 'web' ? { 'aria-pressed': category === item } : {})}
            onPress={() => setCategory(item)}
            style={[styles.chip, category === item && styles.selectedChip]}
          >
            {category === item && <Icon name="check" size={12} color={colors.surface} />}
            <Text style={[styles.chipText, category === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {matches ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Descubrir la propuesta"
          onPress={() => router.push('/routes/figaro-demo')}
          style={({ pressed }) => [styles.featured, pressed && { opacity: 0.9 }]}
        >
          <Artwork kind="figaro" shade="dark" style={StyleSheet.absoluteFill} />
          <View style={styles.featuredBadge}>
            <Text style={styles.badgeText}>Ruta destacada · Demo</Text>
          </View>
          <View style={styles.featuredContent}>
            <Text accessibilityRole="header" style={styles.featuredTitle}>
              {demoRoute.title}
            </Text>
            <Text style={styles.featuredSubtitle}>{demoRoute.subtitle}</Text>
            <View style={styles.featuredBottom}>
              <View style={styles.meta}>
                <Icon name="book" color={colors.surface} size={14} />
                <Text style={styles.metaText}>Propuesta de ópera</Text>
              </View>
              <View style={styles.meta}>
                <Icon name="pin" color={colors.surface} size={14} />
                <Text style={styles.metaText}>Por validar</Text>
              </View>
              <View style={styles.roundArrow}>
                <Icon name="chevron" color={colors.surface} size={20} />
              </View>
            </View>
          </View>
        </Pressable>
      ) : (
        <View style={layout.card} accessibilityLiveRegion="polite">
          <Heading small>Aún no hay historias aquí</Heading>
          <Copy>
            Esta demo contiene una sola propuesta de ópera. El resto del catálogo está en
            preparación editorial.
          </Copy>
          <Button
            secondary
            label="Restablecer filtros"
            onPress={() => {
              setSearch('');
              setCategory('Todas');
            }}
          />
        </View>
      )}
      <View style={styles.upcomingHeading}>
        <Eyebrow>OTRAS MIRADAS A SEVILLA</Eyebrow>
        <Text style={styles.preparing}>EN PREPARACIÓN</Text>
      </View>
      {upcoming.map((item, index) => (
        <View key={item.title} style={styles.upcomingRow}>
          <View
            style={[
              styles.thumbnail,
              { backgroundColor: [colors.terracotta, colors.olive, '#23425A'][index] },
            ]}
          >
            <Icon name={item.icon} size={42} color="#F5EAD6" />
          </View>
          <View style={styles.upcomingCopy}>
            <Text style={styles.upcomingTitle}>{item.title}</Text>
            <Copy style={styles.upcomingSubtitle}>{item.subtitle}</Copy>
            <Text style={styles.upcomingStatus}>Próximamente · Sin ruta publicada</Text>
          </View>
        </View>
      ))}
      <Notice>
        Catálogo visual de demostración. La duración, distancia y condiciones de cada ruta
        aparecerán cuando estén verificadas. Las ilustraciones son evocaciones artísticas.
      </Notice>
    </Screen>
  );
}
const styles = StyleSheet.create({
  subtitle: { fontSize: 12, lineHeight: 19, marginTop: -7 },
  search: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 24,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.ink,
    paddingVertical: 12,
  },
  filters: { flexDirection: 'row', gap: 7, alignItems: 'center' },
  chip: {
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: '#EEE9DE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  selectedChip: { backgroundColor: colors.terracotta },
  chipText: { fontFamily: fonts.medium, fontSize: 10, color: colors.ink },
  selectedText: { color: colors.surface },
  featured: {
    minHeight: 264,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.ink,
    justifyContent: 'flex-end',
  },
  featuredBadge: {
    position: 'absolute',
    top: 14,
    right: 12,
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 11,
    backgroundColor: colors.sand,
  },
  badgeText: { fontFamily: fonts.strong, fontSize: 8, color: colors.ink },
  featuredContent: { padding: 17, paddingTop: 110, gap: 4 },
  featuredTitle: { fontFamily: fonts.display, color: colors.surface, fontSize: 31, lineHeight: 34 },
  featuredSubtitle: { fontFamily: fonts.body, color: '#F5EAD6', fontSize: 12, lineHeight: 19 },
  featuredBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontFamily: fonts.medium, fontSize: 9, color: colors.surface },
  roundArrow: {
    marginLeft: 'auto',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.terracotta,
  },
  upcomingHeading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  preparing: { fontFamily: fonts.medium, fontSize: 7, letterSpacing: 1, color: colors.muted },
  upcomingRow: {
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center',
    borderRadius: 11,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    paddingRight: 12,
  },
  thumbnail: { width: 82, minHeight: 96, alignItems: 'center', justifyContent: 'center' },
  upcomingCopy: { flex: 1, paddingVertical: 10, gap: 5 },
  upcomingTitle: { fontFamily: fonts.display, fontSize: 21, lineHeight: 23, color: colors.ink },
  upcomingSubtitle: { fontSize: 10, lineHeight: 16 },
  upcomingStatus: { fontFamily: fonts.medium, fontSize: 8, color: colors.terracotta },
});
