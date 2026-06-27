import styles from "../styles/components/CardPersona.module.css";

export function CardPersona() {
  return (

    <section>
      <div className={styles.equipo}>
        <div className={styles.card}>
          <img
            className={styles.img}
            src="/assets/foto1_convertida.png"
            alt="Foto Matías Méndez"
          />
          <p className={styles.nombre}>Matías Méndez</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.img}
            src="/assets/foto2.png"
            alt="Foto Milena Martínez"
          />
          <p className={styles.nombre}>Milena Martínez</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.img}
            src="/assets/foto_3.png"
            alt="Foto Tiziano Luzi Ramos"
          />
          <p className={styles.nombre}>Tiziano Luzi Ramos</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.img}
            src="/assets/foto_4.png"
            alt="Foto Cristian Falcone"
          />
          <p className={styles.nombre}>Cristian Falcone</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>
      </div>
    </section>
  );
}
