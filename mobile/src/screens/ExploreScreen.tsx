import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '../components/Icon';
import { PatioArt } from '../components/PatioArt';
import { Button, Copy, Eyebrow, Heading, layout, Notice, Screen } from '../components/ui';
import { categories, type DemoCategory, demoRoute, matchesDemoRoute } from '../demo/content';
import { colors, fonts } from '../design/tokens';

export function ExploreScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DemoCategory>('Todas');
  const matches = matchesDemoRoute(search, category);

  return (
    <Screen>
      <Eyebrow>OTRA FORMA DE MIRAR LA CIUDAD</Eyebrow>
      <Heading>Sevilla se cuenta{`\n`}paseando.</Heading>
      <Copy>
        Dobla una esquina. Sigue una historia.{`\n`}Descubre lo que la ciudad tiene que contarte.
      </Copy>
      <View style={styles.search}>
        <Icon name="search" size={19} />
        <TextInput
          accessibilityLabel="Buscar experiencias de demostración"
          placeholder="¿Qué historia te apetece vivir?"
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
      <View
        style={styles.filters}
        accessibilityRole="toolbar"
        accessibilityLabel="Categorías de demostración"
      >
        {categories.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityState={{ selected: category === item }}
            onPress={() => setCategory(item)}
            style={[styles.chip, category === item && styles.selectedChip]}
          >
            {category === item && <Icon name="check" size={14} color={colors.surface} />}
            <Text style={[styles.chipText, category === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.sectionHeading}>
        <Heading small>Tu próxima historia</Heading>
        <Text style={styles.count}>01 / DEMO</Text>
      </View>
      {matches ? (
        <View style={styles.routeCard}>
          <PatioArt />
          <View style={styles.cardBody}>
            <View style={layout.row}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>ÓPERA & CIUDAD</Text>
              </View>
              <Text style={styles.demoTag}>VISTA PREVIA</Text>
            </View>
            <Heading small>{demoRoute.title}</Heading>
            <Copy style={styles.subtitle}>{demoRoute.subtitle}</Copy>
            <View style={layout.row}>
              <Icon name="headphones" size={17} />
              <Copy style={styles.meta}>Una experiencia para escuchar y descubrir</Copy>
            </View>
            <View style={layout.divider} />
            <Button
              label="Descubrir la propuesta"
              onPress={() => router.push('/routes/figaro-demo')}
            />
          </View>
        </View>
      ) : (
        <View style={layout.card} accessibilityLiveRegion="polite">
          <Heading small>Aún no hay historias aquí</Heading>
          <Copy>
            Esta demo contiene una sola propuesta de ópera. Prueba otra búsqueda o vuelve a Todas.
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
      <View style={styles.quote}>
        <Icon name="sun" color={colors.terracotta} size={26} />
        <Text style={styles.quoteText}>
          Hay ciudades que se visitan.{`\n`}Y otras que se escuchan.
        </Text>
      </View>
      <Notice>
        Estás viendo una demo de diseño con contenido local de ejemplo. Todavía no hay catálogo
        conectado ni rutas turísticas publicadas.
      </Notice>
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 54,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink,
    paddingVertical: 14,
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  selectedChip: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink },
  selectedText: { color: colors.surface },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  count: { fontFamily: fonts.medium, fontSize: 9, letterSpacing: 1, color: colors.muted },
  routeCard: {
    borderRadius: 6,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardBody: { padding: 20, gap: 12 },
  tag: { backgroundColor: colors.sage, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 3 },
  tagText: { fontFamily: fonts.strong, fontSize: 8, letterSpacing: 1.4, color: colors.ink },
  demoTag: { fontFamily: fonts.medium, fontSize: 8, letterSpacing: 1.3, color: colors.muted },
  subtitle: { fontFamily: fonts.italic, fontSize: 23, color: colors.terracotta },
  meta: { fontSize: 11, lineHeight: 18, flex: 1 },
  quote: { marginVertical: 16, alignItems: 'center', gap: 12 },
  quoteText: {
    fontFamily: fonts.italic,
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.ink,
  },
});
