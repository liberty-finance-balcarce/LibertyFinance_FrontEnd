import styles from "../styles/pages/DescargoDeResponsabilidad.module.css";

export function DescargoDeResponsabilidad() {
  return (
    <section className={styles.container}>
      <h1>Descargo de responsabilidad</h1>
      <p>
        La información contenida en esta plataforma tiene fines exclusivamente
        informativos y educativos. No constituye asesoramiento financiero, legal
        ni fiscal, y no debe ser interpretada como una recomendación directa de
        inversión.
      </p>
      <p>
        Los instrumentos financieros presentados, tanto tradicionales como no
        tradicionales, incluyen riesgos inherentes que pueden afectar el capital
        invertido. La rentabilidad pasada no garantiza resultados futuros. El
        usuario es responsable de evaluar los riesgos antes de tomar decisiones
        financieras basadas en la información provista.
      </p>
      <p>
        La plataforma no se responsabiliza por pérdidas, daños o perjuicios
        derivados del uso de los datos, rankings, análisis o cursos ofrecidos.
        El acceso a enlaces externos, como brokers o aplicaciones, se realiza
        bajo responsabilidad exclusiva del usuario.
      </p>
      <p>
        El asesoramiento personalizado ofrecido en niveles superiores está
        sujeto a disponibilidad, condiciones de membresía y resultados variables
        según el perfil del inversor.
      </p>
    </section>
  );
}
