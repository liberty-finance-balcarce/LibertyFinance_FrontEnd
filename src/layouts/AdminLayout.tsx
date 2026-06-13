import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { AdminNavBar } from "../components/AdminNavBar";
import styles from "../styles/layouts/Layout.module.css";

export function AdminLayout() {
  return (
    <>
      <div className={styles.layout}>
        <AdminNavBar />

        <main className={styles.pageContent}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}