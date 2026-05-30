import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import styles from "../styles/layouts/Layout.module.css";

export function UserLayout() {
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
