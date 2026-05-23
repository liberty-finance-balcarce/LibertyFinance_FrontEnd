import styles from "../styles/pages/SiteStillOnBuilding.module.css";

export function SiteStillOnBuilding() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <img
          src="/assets/logo-complete.png"
          alt="Liberty Finance Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Sitio en construcción</h1>
        <p className={styles.subtitle}>Estaremos online en breve</p>
      </div>
    </section>
  );
}
