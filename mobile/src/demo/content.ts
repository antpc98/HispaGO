/** Synthetic presentation content. Never import into the editorial database. */
export const demoRoute = {
  id: 'demo-figaro',
  title: 'Las bodas de Fígaro',
  subtitle: 'Amor, secretos y poder',
  category: 'Ópera',
  zone: 'Sevilla',
  description:
    'Una invitación a escuchar la ciudad con otros oídos. Descubre la propuesta de una experiencia inspirada en el universo de Mozart, entre voces, encuentros y secretos.',
  disclaimer:
    'Propuesta visual. El título, los lugares, los tiempos y los relatos definitivos están pendientes de validación editorial.',
  stop: {
    id: 'demo-patio',
    title: 'Al otro lado del patio',
    label: 'Escena imaginada · Texto de demostración',
    text: 'Imagina un patio al caer la tarde. La luz descansa sobre la cal y, al otro lado de una puerta, alguien guarda un secreto. Antes de dar el siguiente paso, escucha el silencio: aquí comienza nuestra escena.',
    note: 'Este pasaje es ficción creada para probar la presentación. No describe un lugar ni un episodio histórico real.',
  },
} as const;

export type DemoCategory = 'Todas' | 'Ópera' | 'Historia' | 'Arte';
export const categories: readonly DemoCategory[] = ['Todas', 'Ópera', 'Historia', 'Arte'];

export function matchesDemoRoute(search: string, category: DemoCategory): boolean {
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es')
      .trim();
  const searchable = normalize(`${demoRoute.title} ${demoRoute.subtitle} ${demoRoute.category}`);
  return (
    (category === 'Todas' || category === demoRoute.category) &&
    searchable.includes(normalize(search))
  );
}
