import styles from "../styles/pages/TerminosYCondiciones.module.css";

export function TerminosYCondiciones() {
  return (
    <section className={styles.container}>
      <h1>Términos y condiciones</h1>
      <p>
        El uso de esta plataforma implica la aceptación plena de los presentes
        Términos y Condiciones. El sistema está destinado exclusivamente a
        personas mayores de 18 años. Al registrarse, el usuario declara que
        cumple con este requisito y acepta que toda la información proporcionada
        será tratada conforme a las políticas de privacidad vigentes.
      </p>
      <p>
        La plataforma ofrece acceso a información financiera clasificada por
        niveles de usuario, desde contenido gratuito hasta servicios
        personalizados mediante membresías. El acceso a ciertos servicios, como
        el asesoramiento individual, requiere el pago de una membresía, cuyo uso
        está sujeto a validación y encriptación de los datos personales y
        financieros del usuario.
      </p>
      <p>
        El usuario se compromete a utilizar la plataforma de manera responsable,
        sin incurrir en prácticas fraudulentas, y reconoce que la información
        provista tiene fines informativos y educativos, no constituyendo una
        recomendación de inversión directa.
      </p>
    </section>
  );
}
