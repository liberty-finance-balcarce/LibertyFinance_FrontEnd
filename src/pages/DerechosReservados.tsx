import styles from "../styles/pages/DerechosReservados.module.css";

export function DerechosReservados() {
  return (
    <section className={styles.container}>
      <h1>Derechos reservados</h1>
      <p>
        Todo el contenido, diseño, estructura, funcionalidades, textos,
        gráficos, bases de datos, cursos, rankings y herramientas disponibles en
        esta plataforma están protegidos por derechos de propiedad intelectual.
      </p>
      <p>
        Queda prohibida la reproducción, distribución, modificación o uso no
        autorizado de cualquier parte del sistema sin el consentimiento expreso
        de los titulares de los derechos. El uso indebido del contenido podrá
        ser perseguido conforme a la legislación vigente.
      </p>
      <p>
        La marca, logotipo y nombre comercial de la plataforma son propiedad
        exclusiva de sus desarrolladores y no pueden ser utilizados por terceros
        sin autorización previa.
      </p>
      <p>
        Todos los derechos están reservados. Cualquier intento de vulnerar la
        seguridad del sistema o acceder a información restringida será
        considerado una infracción grave y podrá ser denunciado ante las
        autoridades competentes.
      </p>
    </section>
  );
}
