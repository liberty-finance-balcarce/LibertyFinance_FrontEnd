import styles from "../styles/pages/NuestroEquipo.module.css";
import { CardPersona } from "../components/CardPersona";

export function NuestroEquipo() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Nuestro equipo: Funcion de tecnologia, educacion y respaldo regulatorio
      </h1>
      <h3 className={styles.h3}>
        Somos un equipo de desarrolladores e ideólogos apasionados por la
        rentabilidad, complementados por un experto autorizado por la CVN.
        Nuestra misión es democratizar la inversión con seguridad y legalidad.
      </h3>

      <h2 className={styles.h2}>Nuestros pilares</h2>
      <h4 className={styles.h4}>
        -Transparencia total: Tarifas y riesgos claros.
      </h4>
      <h4 className={styles.h4}>
        -Innovación: La mejor tecnología, bajo estrícto cumplimiento normativo.
      </h4>
      <h4 className={styles.h4}>
        -Educacion continua: Herramientas para el crecimiento del inversor.
      </h4>

      <CardPersona />
    </div>
  );
}
