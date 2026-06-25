import styles from "../styles/pages/NuestroEquipo.module.css";
import { CardPersona } from "../components/CardPersona";

export function NuestroEquipo() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Liberty Finance: Tu Camino a la Libertad Financiera
      </h1>

      <p className={styles.h3}>
        Una plataforma diseñada para transformar ahorros en inversiones
        rentables, respondiendo a la pregunta clave: ¿Qué puedo hacer con mis
        ahorros?
      </p>

      <h2 className={styles.h2}>¿Qué soluciona Liberty Finance?</h2>

      <ul className={styles.listaSoluciones}>
        <li>
          <strong>Centralización:</strong> Integra instrumentos financieros para
          que encuentres todo en una misma plataforma, sin tener que recorrer
          diferentes sitios web.
        </li>
        <li>
          <strong>Variedad de Activos:</strong> Ofrece un listado ordenado por
          rentabilidad y riesgo con opciones tradicionales (Plazos fijos, Bonos,
          Acciones) y no tradicionales (Criptomonedas, Finanzas
          Descentralizadas, DCA).
        </li>
        <li>
          <strong>Personalización:</strong> Permite invertir tus ahorros de la
          manera que más se ajuste a vos, dependiendo del resultado de tu Test
          de Perfil de Inversor.
        </li>
      </ul>

      <CardPersona />
    </div>
  );
}
