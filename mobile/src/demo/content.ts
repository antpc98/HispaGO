/** Synthetic presentation content. Never import into the editorial database. */
export const figaroDraft = {
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
