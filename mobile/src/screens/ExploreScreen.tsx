import { useLocalSearchParams, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Artwork } from '../components/Artwork';
import { Icon } from '../components/Icon';
import { Button, Copy, Eyebrow, Heading, layout, Screen } from '../components/ui';
import {
  availabilityFilters,
  backlogRoutes,
  categories,
  featuredRoute,
  filterCatalog,
  readAvailability,
  readCategory,
} from '../demo/catalog';
import { usePreviewSession } from '../demo/PreviewSession';
import { colors, fonts } from '../design/tokens';

export function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; availability?: string; q?: string }>();
  const { catalog, setCatalog } = usePreviewSession();
  // URL values take precedence for shared links; absent values use the current session.
  const search = typeof params.q === 'string' ? params.q : catalog.search;
  const category = params.category === undefined ? catalog.category : readCategory(params.category);
  const availability =
    params.availability === undefined
      ? catalog.availability
      : readAvailability(params.availability);
  const update = (next: Partial<typeof catalog>) => {
    const state = { search, category, availability, ...next };
    setCatalog(state);
    router.setParams({
      q: state.search,
      category: state.category,
      availability: state.availability,
    });
  };
  const matches = filterCatalog(search, category, availability);
  const reset = () => update({ search: '', category: 'Todas', availability: 'Todas' });
  return (
    <Screen scrollId="catalog">
      <Heading>Rutas culturales</Heading>
      <Copy>Empieza por la propuesta de nuestro primer piloto.</Copy>
      <View style={styles.search}>
        <Icon name="search" size={20} />
        <TextInput
          accessibilityLabel="Buscar rutas"
          placeholder="Busca una experiencia…"
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={(value) => update({ search: value })}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
      <View accessibilityRole="toolbar" accessibilityLabel="Disponibilidad" style={styles.filters}>
        {availabilityFilters.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityState={{ selected: availability === item }}
            {...(Platform.OS === 'web' ? { 'aria-pressed': availability === item } : {})}
            onPress={() => update({ availability: item })}
            style={[styles.chip, availability === item && styles.selectedChip]}
          >
            <Text style={[styles.chipText, availability === item && styles.selectedText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {categories.length > 1 && (
        <View style={styles.filters} accessibilityLabel="Categorías">
          {categories.map((item) => (
            <Button key={item} secondary label={item} onPress={() => update({ category: item })} />
          ))}
        </View>
      )}
      {(search !== '' || availability !== 'Todas' || category !== 'Todas') && (
        <Button secondary label="Limpiar búsqueda y filtros" onPress={reset} />
      )}
      {matches.map((route) => (
        <Pressable
          key={route.id}
          accessibilityRole="button"
          accessibilityLabel={`Explorar ${route.title}`}
          onPress={() => {
            setCatalog({ search, category, availability });
            router.push(`/routes/${route.slug}`);
          }}
          style={({ pressed }) => [styles.featured, pressed && { opacity: 0.85 }]}
        >
          <Artwork kind={route.cover} fit="contain" style={styles.cover} />
          <View style={styles.cardContent}>
            <Eyebrow>EXPERIENCIA PILOTO</Eyebrow>
            <Text accessibilityRole="header" style={styles.cardTitle}>
              {route.navigationLabel}
            </Text>
            <Copy>{route.description}</Copy>
            <View style={styles.cardAction}>
              <Text style={styles.actionText}>Conocer la propuesta</Text>
              <Icon name="chevron" color={colors.terracotta} />
            </View>
          </View>
        </Pressable>
      ))}
      {matches.length === 0 && (
        <View style={layout.card} accessibilityLiveRegion="polite">
          <Heading small>No hay experiencias con estos filtros</Heading>
          <Copy>
            {availability !== 'Todas'
              ? `Todavía no hay una narración disponible. Puedes consultar la propuesta de ${featuredRoute.navigationLabel} quitando este filtro.`
              : `Prueba con ${featuredRoute.navigationLabel} o limpia la búsqueda.`}
          </Copy>
          <Button label="Restablecer filtros" onPress={reset} />
        </View>
      )}
      <View style={styles.backlog}>
        <Eyebrow>SIGUIENTE EXPERIENCIA · BACKLOG</Eyebrow>
        {backlogRoutes.map((route) => (
          <Copy key={route.id}>
            {route.navigationLabel}. Borrador conservado, fuera del piloto actual.
          </Copy>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
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
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 12,
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    maxWidth: '100%',
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: colors.sand,
    borderRadius: 24,
    justifyContent: 'center',
  },
  selectedChip: { backgroundColor: colors.terracotta },
  chipText: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
  selectedText: { color: colors.surface },
  featured: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  cover: { width: '100%', aspectRatio: 1.5 },
  cardContent: { padding: 18, gap: 10 },
  cardTitle: { fontFamily: fonts.display, color: colors.ink, fontSize: 30, lineHeight: 38 },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    gap: 8,
  },
  actionText: { fontFamily: fonts.strong, fontSize: 14, color: colors.terracotta, flexShrink: 1 },
  backlog: { borderTopWidth: 1, borderColor: colors.line, marginTop: 12, paddingTop: 20, gap: 10 },
});
