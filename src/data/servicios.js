// Arreglo de servicios. Se recorre con .map() para renderizar dinamicamente.
// Los precios estan expresados en pesos chilenos (CLP) como valor base.
export const servicios = [
  {
    id: 1,
    nombre: 'Limpieza y mantenimiento de PC',
    descripcion: 'Limpieza interna de polvo, revision de ventiladores y mantenimiento general del equipo.',
    precioCLP: 20000,
    imagen: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=700&q=80',
    icono: '🧹'
  },
  {
    id: 2,
    nombre: 'Formateo e instalacion de Windows',
    descripcion: 'Formateo completo e instalacion limpia de Windows con drivers actualizados.',
    precioCLP: 25000,
    imagen: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=700&q=80',
    icono: '💽'
  },
  {
    id: 3,
    nombre: 'Optimizacion de rendimiento',
    descripcion: 'Eliminacion de procesos innecesarios y ajuste fino para maximizar la velocidad.',
    precioCLP: 18000,
    imagen: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=700&q=80',
    icono: '⚡'
  },
  {
    id: 4,
    nombre: 'Instalacion de programas',
    descripcion: 'Instalacion y configuracion de software segun las necesidades del cliente.',
    precioCLP: 12000,
    imagen: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=700&q=80',
    icono: '📦'
  },
  {
    id: 5,
    nombre: 'Cambio de pasta termica',
    descripcion: 'Reemplazo de pasta termica para mejorar la disipacion de calor del procesador.',
    precioCLP: 15000,
    imagen: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=700&q=80',
    icono: '🌡️'
  },
  {
    id: 6,
    nombre: 'Instalacion de hardware',
    descripcion: 'Montaje e instalacion de componentes: RAM, discos, tarjetas y mas.',
    precioCLP: 22000,
    imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80',
    icono: '🔧'
  },
  {
    id: 7,
    nombre: 'Armado de computadores',
    descripcion: 'Ensamblaje completo de PC a medida con asesoria de componentes.',
    precioCLP: 40000,
    imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=80',
    icono: '🖥️'
  },
  {
    id: 8,
    nombre: 'Actualizacion de PC',
    descripcion: 'Upgrade de componentes para extender la vida util y potencia del equipo.',
    precioCLP: 28000,
    imagen: 'https://images.unsplash.com/photo-1601737487795-dab272f52420?auto=format&fit=crop&w=700&q=80',
    icono: '🚀'
  }
]
