import { Card } from "./Card";
import styles from "../styles/components/Card.module.css";

export function CardList() {
  return (
    <div className={styles.container}>
      <Card
        title="Instrumentos Tradicionales"
        shortText="-Son instrumentos de deuda emitidos por gobiernos o empresas."
        longText="-Al comprar un bono, prestás dinero al emisor a cambio de pagos periódicos de intereses (cupones) y la devolución del capital al vencimiento."
      />

      <Card
        title="Instrumentos no tradicionales"
        shortText="-Representan una parte del capital de una empresa."
        longText="-Al comprar acciones, te convertís en propietario parcial y podés beneficiarte de dividendos y aumentos en el precio de mercado."
      />

      <Card
        title="Rendimiento y Riesgo"
        shortText="-Es la ganancia obtenida por una inversión, expresada como porcentaje del capital invertido."
        longText="-Es la posibilidad de perder parte del dinero invertido debido a factores como cambios en tasas de interés, inflación o mercado."
      />
    </div>
  );
}
