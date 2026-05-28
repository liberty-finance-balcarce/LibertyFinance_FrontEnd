import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import styles from "../layouts/Layout.module.css";

export function UserLayout() {
  return (
    <>
      <div className={styles.layout}>

        <main className={styles.pageContent}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
