import styles from "../styles/components/CardPersona.module.css";

const equipo = [
  {
    id: 1,
    nombre: "Roberto Garcia",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    descripcion: "Desarrollador Full Stack",
  },
  {
    id: 2,
    nombre: "Juan López",
    img: "https://randomuser.me/api/portraits/men/10.jpg",
    descripcion: "Diseñador UX",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    img: "https://randomuser.me/api/portraits/men/20.jpg",
    descripcion: "Analista de Datos",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    descripcion: "Especialista en Marketing",
  },
];

export function CardPersona() {
  return (
    // Eliminamos el componente <Card> incompatible y usamos un contenedor semántico
    <section>
      <div className={styles.equipo}>
        {equipo.map((persona) => (
          <div key={persona.id} className={styles.card}>
            <img
              className={styles.img}
              src={persona.img}
              alt={persona.nombre}
            />
            <p className={styles.nombre}>{persona.nombre}</p>
            <p className={styles.descripcion}>{persona.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}