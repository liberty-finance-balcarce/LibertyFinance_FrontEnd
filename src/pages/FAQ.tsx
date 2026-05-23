import styles from "../styles/pages/FAQ.module.css";

export function FAQ() {
  return (
    <div className={styles.container}>
      <h1>Preguntas frecuentes</h1>
      <details>
        <summary>Sobre la plataforma</summary>
        <h3>¿Qué es Liberty Finance?</h3>
        <p>
          Es una plataforma web educativa y de inversión que te permite conocer,
          comparar y acceder a instrumentos financieros tradicionales y no
          tradicionales. Nuestro objetivo es ayudarte a tomar decisiones
          informadas para alcanzar tu libertad financiera.
        </p>
        <h3>¿Es necesario registrarse para usar la plataforma?</h3>
        <p>
          No. Podés navegar como usuario invitado y acceder a información básica
          sobre rendimientos y riesgos de distintos instrumentos. Sin embargo,
          al registrarte podrás acceder a funcionalidades adicionales como el
          test de inversor, el carrito de inversiones y los cursos
          especializados.
        </p>
        <h3>¿Tiene algún costo usar Liberty Finance?</h3>
        <p>
          El acceso básico es gratuito. Existen distintos niveles de membresía
          (Premium y Asesoramiento Personalizado) que habilitan contenido y
          servicios exclusivos.
        </p>
      </details>

      <details>
        <summary>Sobre registro y seguridad</summary>
        <h3>¿Quiénes pueden registrarse en la plataforma?</h3>
        <p>
          Solo personas mayores de 18 años pueden crear una cuenta y acceder a
          los servicios de inversión.
        </p>
        <h3>¿Cómo protegen mis datos personales?</h3>
        <p>
          Toda la información se maneja bajo estrictos estándares de seguridad.
          Los datos sensibles y los medios de pago se almacenan de forma
          encriptada.
        </p>
      </details>

      <details>
        <summary>Sobre niveles de usuarios</summary>
        <h3>¿Qué beneficios tengo como usuario invitado?</h3>
        <p>
          Podés visualizar instrumentos financieros, sus rendimientos y riesgos,
          y realizar el test de perfil inversor.
        </p>
        <h3>¿Qué incluye el nivel Premium?</h3>
        <p>
          Acceso a análisis de riesgo detallados, estrategias de inversión
          personalizadas, y contenido educativo exclusivo como webinars y guías.
        </p>
        <h3>¿Qué ofrece el nivel de Asesoramiento Personalizado?</h3>
        <p>
          Incluye acompañamiento individual, estrategias de inversión adaptadas
          a tus objetivos y un modelo de pago por resultados.
        </p>
      </details>

      <details>
        <summary>Sobre inversiones</summary>
        <h3>¿Liberty Finance realiza inversiones por mí?</h3>
        <p>
          No. La plataforma te brinda información y herramientas para que tomes
          decisiones informadas, pero no ejecuta inversiones directamente.
        </p>
        <h3>¿Puedo invertir desde la plataforma?</h3>
        <p>
          Podrás acceder a enlaces a brokers o plataformas externas donde
          concretar tus inversiones. Liberty Finance no retiene fondos ni actúa
          como intermediario financiero.
        </p>
        <h3>¿La información sobre rendimientos está actualizada?</h3>
        <p>
          Sí. Los datos se actualizan periódicamente mediante APIs financieras y
          fuentes verificadas, con un mantenimiento regular cada 7, 15 o 30
          días.
        </p>
      </details>

      <details>
        <summary>Sobre el test de inversor</summary>
        <h3>¿Qué es el test de inversor?</h3>
        <p>
          Es una herramienta que evalúa tu perfil de riesgo, conocimientos y
          objetivos para recomendarte instrumentos financieros adecuados.
        </p>
        <h3>¿Tengo que hacer el test para registrarme?</h3>
        <p>
          No es obligatorio, pero es muy recomendable para recibir
          recomendaciones personalizadas.
        </p>
        <h3>¿El resultado del test es vinculante?</h3>
        <p>
          No. Es solo una guía. La decisión final de inversión siempre es tuya.
        </p>
      </details>
    </div>
  );
}
