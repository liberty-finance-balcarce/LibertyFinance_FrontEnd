import styles from "../styles/components/CardPersona.module.css";

export function CardPersona() {
  return (

    <section>
      <div className={styles.equipo}>
        <div className={styles.card}>
          <img
            className={styles.img}
            src="../assets/foto1_convertida.png"
            alt="foto mati"
          />
          <p className={styles.nombre}>Matias Mendez</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.img}
            src="../assets/foto2.png"
            alt="foto Mile"
          />
          <p className={styles.nombre}>Milena Martinez</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.img}
            src="../assets/foto_3.png"
            alt="foto Tizi"
          />
          <p className={styles.nombre}>Tiziano Luzi Ramos</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.img}
            src="../assets/foto_4.png"
            alt="foto Cris"
          />
          <p className={styles.nombre}>Cristian Falcone</p>
          <p className={styles.descripcion}>Desarrollador Full Stack</p>
        </div>
      </div>
    </section>
  );
}
