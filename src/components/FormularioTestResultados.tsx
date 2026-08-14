import styles from "../styles/components/FormularioTest.module.css";


export function FormularioTestResultados() {
  const finalProfile = localStorage.getItem("perfilInv");
  const parsedProfile = finalProfile ? JSON.parse(finalProfile) : null;

   const getResultData = (score: number) => {
    if (score <= 30)
      return {
        perfil: "CONSERVADOR",
        estrategia: "Prioridad absoluta a la seguridad.",
        activos: "Bonos, Plazos fijos, Stablecoins.",
        exposicion: "0-5%",
        clase: "perfilConservador",
      };

    if (score <= 60)
      return {
        perfil: "MODERADO",
        estrategia: "Equilibrio entre crecimiento y seguridad.",
        activos: "S&P 500 y Bonos.",
        exposicion: "5-15% (BTC/ETH)",
        clase: "perfilModerado",
      };

    if (score <= 85)
      return {
        perfil: "AGRESIVO",
        estrategia: "Busca ganancia de capital a largo plazo.",
        activos: "Acciones tecnológicas y Cripto.",
        exposicion: "20-40%",
        clase: "perfilAgresivo",
      };

    return {
      perfil: "EXPERTO",
      estrategia: "Maximización de retornos.",
      activos: "Bitcoin, Altcoins, DeFi.",
      exposicion: "+50%",
      clase: "perfilExperto",
    };
  };
const total = parsedProfile?.total ?? 0;
const result = getResultData(total);

return (
    <div className={styles.container}>
      <div className={`${styles.resultCard} ${styles[result.clase]}`}>
        <img
          className={styles.trophy}
          src="/assets/trophy.png"
          alt="Trofeo Liberty Finance"
        />

        <h2>Tu Perfil: {result.perfil}</h2>
        <div className={styles.resultDetails}>
          <p>
            <strong>Estrategia:</strong> {result.estrategia}
          </p>
          <p>
            <strong>Activos:</strong> {result.activos}
          </p>
          <p className={styles.highlightBox}>
            <strong>Exposición Cripto Sugerida:</strong> {result.exposicion}
          </p>
        </div>
      </div>
    </div>
  );
}