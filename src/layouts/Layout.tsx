import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import styles from "../styles/layouts/Layout.module.css";

export function Layout() {
  return (
    <>
      <div className={styles.layout}>
        <NavBar />

        <main className={styles.pageContent}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
