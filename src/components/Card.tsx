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
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p>
        {shortText}
        {isExpanded && (
          <div className="long-text-container">
            <p>{longText}</p>
          </div>
        )}
      </p>

      <button onClick={toggleReadMore} className={styles.button}>
        {isExpanded ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
}
