import type { ArtworkKind } from '../components/Artwork';
import { figaroDraft } from './content';

/** Local presentation configuration, NOT a published tourist catalog. */
export type RoutePreview = {
  id: string;
  slug: 'plaza-de-espana' | 'figaro-demo';
  title: string;
  navigationLabel: string;
  cover: ArtworkKind;
  status: 'pilot-preview' | 'backlog';
  narrationAvailable: boolean;
  category: string | null;
  description: string;
  approach: string;
  practicalNote: string;
  sample: {
    id: string;
    slug: 'plaza-de-espana-primera-parada' | 'patio-demo';
    title: string;
    kind: 'editorial-pending' | 'fiction';
    sourceId?: string;
    summary: string;
    text?: string;
    note?: string;
    question?: string;
    cta: string;
  };
};

export const pilotRoute: RoutePreview = {
  id: 'plaza-de-espana',
  slug: 'plaza-de-espana',
  title: 'Plaza de España · Una historia para mirar despacio',
  navigationLabel: 'Plaza de España',
  cover: 'plaza',
  status: 'pilot-preview',
  narrationAvailable: false,
  category: null,
  description:
    'Una propuesta de guía narrativa para descubrir Plaza de España: detenerse a observar el lugar y encontrar pequeños detalles que una visita con prisas deja pasar.',
  approach:
    'La mirada se queda en un solo lugar. El relato y los pequeños descubrimientos se prepararán a partir del material de Ana, sin convertir la visita en una lista de monumentos.',
  practicalNote:
    'Ana definirá las paradas y el recorrido. Aún no hay duración, distancia ni condiciones de acceso o accesibilidad revisadas.',
  sample: {
    id: 'plaza-de-espana-primera-parada',
    slug: 'plaza-de-espana-primera-parada',
    title: 'Primera parada · Material de Ana',
    kind: 'editorial-pending',
    sourceId: 'ana-audio-2026-10-30-12-19-47',
    summary:
      'Puedes consultar el estado de su material. La narración todavía no está disponible para leer o escuchar aquí.',
    cta: 'Ver estado de la primera parada',
  },
};

export const figaroRoute: RoutePreview = {
  id: figaroDraft.id,
  slug: 'figaro-demo',
  title: `${figaroDraft.title} · ${figaroDraft.subtitle}`,
  navigationLabel: figaroDraft.title,
  cover: 'figaro',
  status: 'backlog',
  narrationAvailable: false,
  category: figaroDraft.category,
  description: figaroDraft.description,
  approach:
    'Borrador de la siguiente experiencia. Su escena de prueba es ficción, no material de Ana ni una parada turística.',
  practicalNote: figaroDraft.disclaimer,
  sample: {
    id: figaroDraft.stop.id,
    slug: 'patio-demo',
    title: figaroDraft.stop.title,
    kind: 'fiction',
    summary: figaroDraft.stop.label,
    text: figaroDraft.stop.text,
    note: figaroDraft.stop.note,
    question: '¿Qué crees que esconde esa puerta?',
    cta: 'Ver escena ficticia',
  },
};

export const routePreviews: readonly RoutePreview[] = [pilotRoute, figaroRoute];
export const featuredRouteId = pilotRoute.id;
export const featuredRoute = routePreviews.find((route) => route.id === featuredRouteId)!;
export const catalogRoutes = routePreviews.filter((route) => route.status === 'pilot-preview');
export const backlogRoutes = routePreviews.filter((route) => route.status === 'backlog');

// Only reviewed classifications belong here. "Sin clasificar" is a state, not a taxonomy.
export const categories = [
  'Todas',
  ...new Set(catalogRoutes.flatMap((route) => (route.category ? [route.category] : []))),
];
export const availabilityFilters = ['Todas', 'Con narración disponible'] as const;
export type AvailabilityFilter = (typeof availabilityFilters)[number];
export function readCategory(value: unknown): string {
  return categories.find((category) => category === value) ?? 'Todas';
}
export function readAvailability(value: unknown): AvailabilityFilter {
  return availabilityFilters.find((filter) => filter === value) ?? 'Todas';
}
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();
export function filterCatalog(search: string, category: string, availability: AvailabilityFilter) {
  return catalogRoutes.filter(
    (route) =>
      (category === 'Todas' || route.category === category) &&
      // No playable narration in delivery 1. Never count a source reference as an available audio.
      (availability === 'Todas' || route.narrationAvailable) &&
      normalize(`${route.title} ${route.description} ${route.category ?? ''}`).includes(
        normalize(search),
      ),
  );
}
