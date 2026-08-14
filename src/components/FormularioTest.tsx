import { useEffect, useState } from "react";
import styles from "../styles/components/FormularioTest.module.css";

const questions = [
  {
    id: 1,
    text: "Horizonte Temporal",
    subtext: "¿Tiempo planeado de Inversión?",
    options: [
      { label: "A) Menos de 1 año", points: 1 },
      { label: "B) De 1 a 3 años", points: 4 },
      { label: "C) De 3 a 7 años", points: 7 },
      { label: "D) Más de 7 años", points: 10 },
    ],
  },
  {
    id: 2,
    text: "Objetivo de la Inversión",
    subtext: "¿Cuál es tu prioridad al invertir?",
    options: [
      { label: "A) Preservar mi capital sin riesgo", points: 1 },
      { label: "B) Generar ingresos recurrentes", points: 4 },
      { label: "C) Hacer crecer mi capital a largo plazo", points: 7 },
      { label: "D) Lograr retornos masivos asumiendo riesgos", points: 10 },
    ],
  },
  {
    id: 3,
    text: "Conocimiento Financiero",
    subtext: "¿Conocimiento sobre mercados y cripto?",
    options: [
      { label: "A) Nulo, no entiendo cómo funcionan", points: 1 },
      { label: "B) Básico, entiendo qué es una acción", points: 4 },
      { label: "C) Intermedio, entiendo volatilidad y halving", points: 7 },
      { label: "D) Avanzado, opero con DeFi o derivados", points: 10 },
    ],
  },
  {
    id: 4,
    text: "Reacción ante la Volatilidad",
    subtext: "Si tu portafolio cae un 30%, Que haces?",
    options: [
      { label: "A) Vendo todo por miedo", points: 1 },
      { label: "B) Me preocupo y vendo una parte", points: 4 },
      { label: "C) No hago nada, confío en mi plan", points: 7 },
      { label: "D) Compro más, aprovecho la oferta", points: 10 },
    ],
  },
  {
    id: 5,
    text: "Capacidad de Ahorro",
    subtext: "¿Cuanto de tus ingresos invertis?",
    options: [
      { label: "A) Menos del 5%", points: 1 },
      { label: "B) Entre el 5% y el 15%", points: 4 },
      { label: "C) Entre el 15% y el 30%", points: 7 },
      { label: "D) Más del 30%", points: 10 },
    ],
  },
  {
    id: 6,
    text: "Situación Patrimonial",
    subtext: "¿Tienes un fondo de emergencia?",
    options: [
      { label: "A) No tengo ahorros", points: 1 },
      { label: "B) Tengo ahorros para menos de un mes", points: 4 },
      { label: "C) Sí, tengo un fondo sólido", points: 7 },
      { label: "D) Sí, y tengo otros activos líquidos", points: 10 },
    ],
  },
  {
    id: 7,
    text: "Experiencia Previa",
    subtext: "¿En qué activos has invertido?",
    options: [
      { label: "A) Solo cuentas de ahorro", points: 1 },
      { label: "B) Fondos comunes o bonos", points: 4 },
      { label: "C) Acciones individuales o ETFs", points: 7 },
      { label: "D) Criptomonedas, opciones o futuros", points: 10 },
    ],
  },
  {
    id: 8,
    text: "Composición Portafolio Ideal",
    subtext: "¿Cómo distribuirias tu dinero?",
    options: [
      { label: "A) 100% efectivo o bonos", points: 1 },
      { label: "B) 70% bonos y 30% acciones", points: 4 },
      { label: "C) 50% acciones y 50% activos de riesgo", points: 7 },
      { label: "D) 80-100% en Cripto/Alta volatilidad", points: 10 },
    ],
  },
  {
    id: 9,
    text: "Entendimiento Riesgo Bitcoin",
    subtext: "¿Bitcoin puede caer un 50% o ir a cero?",
    options: [
      { label: "A) No, creí que siempre subía", points: 1 },
      { label: "B) Me cuesta aceptarlo, pero lo sé", points: 4 },
      { label: "C) Lo entiendo y asumo el riesgo", points: 7 },
      { label: "D) Lo prefiero antes que el sistema fiat", points: 10 },
    ],
  },
  {
    id: 10,
    text: "Ingresos Futuros",
    subtext: "¿Cuál es tu expectativa de ingresos?",
    options: [
      { label: "A) Disminuirán o son inestables", points: 1 },
      { label: "B) Se mantendrán estables", points: 4 },
      { label: "C) Aumentarán ligeramente", points: 7 },
      { label: "D) Aumentarán significativamente", points: 10 },
    ],
  },
];
interface FormularioTestProps {
  onClose?: () => void;
  onComplete?: () => void;
}

export function FormularioTest({ onClose, onComplete }: FormularioTestProps) {
  const finalProfile = localStorage.getItem("perfilInv");
  const parsedProfile = finalProfile ? JSON.parse(finalProfile) : null;

  const savedTest = localStorage.getItem("testInversor");
  const parsedTest = savedTest ? JSON.parse(savedTest) : null;

  const [currentIdx, setCurrentIdx] = useState(parsedTest?.currentIdx ?? 0);

  const [selections, setSelections] = useState<(number | null)[]>(
    parsedTest?.selections ?? Array(questions.length).fill(null),
  );

  const [finished, setFinished] = useState(
    parsedProfile ? true : (parsedTest?.finished ?? false),
  );

  const handleSelect = (points: number) => {
    const updated = [...selections];
    updated[currentIdx] = points;
    setSelections(updated);

    if (currentIdx < questions.length - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 250);
    }
  };

  const getScore = () => {
    if (parsedProfile) return parsedProfile.total;
    return selections.reduce<number>((a, b) => a + (b || 0), 0);
  };

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

  useEffect(() => {
    if (!parsedProfile) {
      localStorage.setItem(
        "testInversor",
        JSON.stringify({
          currentIdx,
          selections,
          finished,
        }),
      );
    }
  }, [currentIdx, selections, finished, parsedProfile]);

  const handleFinishTest = () => {
    const total = getScore();
    const result = getResultData(total);

    localStorage.setItem(
      "perfilInv",
      JSON.stringify({
        total: total,
        perfil: result.perfil,
        finished: true,
      }),
    );

    localStorage.removeItem("testInversor");
    setFinished(true);
  if (onComplete) {
      onComplete();
    }

  };

  if (finished) {
    const total = getScore();
    const result = getResultData(total);
    return (
      <div className={styles.container}>
        <div className={`${styles.resultCard} ${styles[result.clase]}`}>
          <button
            className={styles.btnClose}
            onClick={onClose}
            aria-label="Cerrar"
          >
            &times;
          </button>

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
          <button className={styles.botonCerrar} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.testCard}>
        <button
          className={styles.btnClose}
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>

        <div className={styles.titulo}>{q.text}</div>
        <div className={styles.subtext}>{q.subtext}</div>

        <div className={styles.optionsGrid}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`${styles.optionBtn} ${
                selections[currentIdx] === opt.points ? styles.active : ""
              }`}
              onClick={() => handleSelect(opt.points)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className={styles.navControls}>
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className={styles.btnNav}
          >
            Anterior
          </button>
          <div className={styles.paginador}>
            {currentIdx + 1}/{questions.length}
          </div>
          {currentIdx === questions.length - 1 ? (
            <button
              disabled={selections[currentIdx] === null}
              onClick={handleFinishTest} // Llamamos a la nueva función que guarda todo blindado
              className={styles.btnFinish}
              style={{
                backgroundColor:
                  selections[currentIdx] === null
                    ? "grey"
                    : "var(--colorPrimario)",
                    marginLeft: "-10px",
                cursor:
                  selections[currentIdx] === null ? "not-allowed" : "pointer",
                boxShadow:
                  selections[currentIdx] === null
                    ? "none"
                    : "0px 0px 15px 5px #DDA0DD",
                transition: "background-color 0.3s ease",
              }}
            >
              Ver Resultados
            </button>
          ) : (
            <button
              disabled={selections[currentIdx] === null}
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className={styles.btnNav}
            >
              Siguiente
            </button>
          )}
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
