import styles from "../styles/components/RankingInstrumentosFinancieros.module.css";
import { useRankingInstrumentos } from "../hooks/useRankingInstrumentos";

export function RankingInstrumentosFinancieros() {
  const { data, isLoading, error } = useRankingInstrumentos();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Cargando ranking de instrumentos...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.errorContainer}>
        <p>No se pudieron cargar los datos. Intentelo mas tarde.</p>
      </div>
    );
  }

  const hasTradicionales = data.tradicionales.length > 0;
  const hasNoTradicionales = data.noTradicionales.length > 0;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.mainTitle}>
          <u>Ranking de rendimientos y riesgos</u>
        </h2>
      </header>

      <div
        className={styles.panelsContainer}
        style={{
          gridTemplateColumns:
            hasTradicionales && hasNoTradicionales ? "1fr 1fr" : "1fr",
        }}
      >
        {hasTradicionales && (
          <article className={styles.panel}>
            <h3 className={styles.panelTitle}>Instrumentos tradicionales</h3>
            <ul className={styles.list}>
              {data.tradicionales.map((item) => (
                <li key={item.id_instrumento} className={styles.listItem}>
                  <span className={styles.itemName}>
                    {item.nombre_instrumento}
                  </span>
                  <span className={styles.itemYield}>{item.rendimiento}</span>
                  <span className={styles.itemRisk}>{item.riesgo}</span>
                </li>
              ))}
            </ul>
          </article>
        )}

        {hasNoTradicionales && (
          <article className={styles.panel}>
            <h3 className={styles.panelTitle}>Instrumentos no tradicionales</h3>
            <ul className={styles.list}>
              {data.noTradicionales.map((item) => (
                <li key={item.id_instrumento} className={styles.listItem}>
                  <span className={styles.itemName}>
                    {item.nombre_instrumento}
                  </span>
                  <span className={styles.itemYield}>{item.rendimiento}</span>
                  <span className={styles.itemRisk}>{item.riesgo}</span>
                </li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}
