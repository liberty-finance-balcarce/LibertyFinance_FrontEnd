import { useState } from "react";
import styles from "../styles/components/Card.module.css";

interface CardProps {
  title: string;
  shortText: string;
  longText: string;
}

export function Card({ title, shortText, longText }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.cardScene}>
      <div className={`${styles.card} ${isExpanded ? styles.cardFlipped : ""}`}>
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <h3 className={styles.title}>{title}</h3>

          <p className={styles.text}>{shortText}</p>

          <button onClick={toggleReadMore} className={styles.button}>
            Leer más
          </button>
        </div>

        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <h3 className={styles.title}>{title}</h3>

          <p className={styles.text}>{longText}</p>

          <button onClick={toggleReadMore} className={styles.button}>
            Leer menos
          </button>
        </div>
      </div>
    </div>
  );
}
