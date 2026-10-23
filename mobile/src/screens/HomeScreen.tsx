import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Artwork } from '../components/Artwork';
import { Icon } from '../components/Icon';
import { Button, Copy, Notice, Screen } from '../components/ui';
import { type DemoCategory } from '../demo/content';
import { colors, fonts } from '../design/tokens';

const collections = [
  {
    title: 'Historia y monumentos',
    description: 'Grandes épocas, lugares únicos',
    icon: 'landmark',
    color: colors.terracotta,
    category: 'Historia',
    light: true,
  },
  {
    title: 'Arte y cultura',
    description: 'Ópera, arte y vida sevillana',
    icon: 'mask',
    color: '#23425A',
    category: 'Ópera',
    light: true,
  },
  {
    title: 'Tradiciones y barrios',
    description: 'La ciudad que se vive de cerca',
    icon: 'leaf',
    color: colors.olive,
    category: 'Tradiciones',
    light: true,
  },
  {
    title: 'Personajes y leyendas',
    description: 'Historias que siguen vivas',
    icon: 'fan',
    color: colors.sand,
    category: 'Personajes',
    light: false,
  },
] as const;

export function HomeScreen() {
  const router = useRouter();
  const openCollection = (category: DemoCategory) =>
    router.push({ pathname: '/routes', params: { category } });
  return (
    <Screen edgeToEdge header={false}>
      <View style={styles.hero}>
        <Artwork kind="seville" shade="light" style={StyleSheet.absoluteFill} />
        <View style={styles.heroTop}>
          <View style={styles.brand}>
            <Text style={styles.brandTitle}>HISPAGO SEVILLA</Text>
            <Text style={styles.brandSubtitle}>RUTAS QUE CUENTAN HISTORIAS</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Buscar rutas"
            onPress={() => router.push('/routes')}
            style={styles.search}
          >
            <Icon name="search" size={20} />
          </Pressable>
        </View>
        <View style={styles.heroCopy}>
          <Text accessibilityRole="header" style={styles.title}>
            ¿Qué Sevilla{`\n`}quieres conocer hoy?
          </Text>
          <Copy style={styles.subtitle}>Elige una ruta y déjate llevar por su historia.</Copy>
        </View>
        <Text style={styles.artLabel}>EVOCACIÓN ARTÍSTICA DE SEVILLA</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.grid}>
          {collections.map((item) => (
            <Pressable
              key={item.title}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              onPress={() => openCollection(item.category)}
              style={({ pressed }) => [
                styles.category,
                { backgroundColor: item.color, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Icon name={item.icon} size={29} color={item.light ? '#F5EAD6' : colors.terracotta} />
              <Text
                style={[styles.categoryTitle, { color: item.light ? colors.surface : colors.ink }]}
              >
                {item.title}
              </Text>
              <Text style={[styles.categoryCopy, { color: item.light ? '#F5EAD6' : colors.ink }]}>
                {item.description}
              </Text>
              <View style={styles.chevron}>
                <Icon
                  name="chevron"
                  size={16}
                  color={item.light ? colors.surface : colors.terracotta}
                />
              </View>
            </Pressable>
          ))}
        </View>
        <Button label="Ver rutas culturales" onPress={() => router.push('/routes')} />
        <Notice>
          Propuesta de diseño con ilustraciones artísticas y contenido de ejemplo. El catálogo
          definitivo se incorporará tras la revisión editorial.
        </Notice>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { height: 425, backgroundColor: colors.sand },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 19,
    gap: 10,
  },
  brand: { flex: 1, alignItems: 'center', gap: 7, paddingLeft: 35 },
  brandTitle: { fontFamily: fonts.strong, fontSize: 10, letterSpacing: 2.8, color: colors.ink },
  brandSubtitle: { fontFamily: fonts.medium, fontSize: 6.5, letterSpacing: 1.8, color: colors.ink },
  search: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0E6D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCopy: { paddingHorizontal: 23, paddingTop: 31, gap: 11 },
  title: {
    fontFamily: fonts.display,
    fontSize: 37,
    lineHeight: 38,
    color: colors.ink,
    maxWidth: 390,
  },
  subtitle: { fontSize: 12, lineHeight: 19, color: colors.ink, maxWidth: 280 },
  artLabel: {
    position: 'absolute',
    bottom: 19,
    right: 14,
    fontFamily: fonts.medium,
    fontSize: 6,
    letterSpacing: 1.1,
    color: colors.surface,
    padding: 6,
    backgroundColor: '#182C3DBB',
    borderRadius: 3,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 12,
    gap: 17,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: colors.paper,
    marginTop: -10,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  category: {
    flexBasis: '46%',
    flexGrow: 1,
    minWidth: 125,
    minHeight: 167,
    padding: 16,
    gap: 8,
    borderRadius: 12,
  },
  categoryTitle: { fontFamily: fonts.display, fontSize: 23, lineHeight: 24 },
  categoryCopy: { fontFamily: fonts.body, fontSize: 10, lineHeight: 15, paddingRight: 16 },
  chevron: { position: 'absolute', bottom: 16, right: 11 },
});
