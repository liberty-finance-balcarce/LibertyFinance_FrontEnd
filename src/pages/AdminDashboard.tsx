import { Outlet } from "react-router-dom";
import styles from "../styles/pages/AdminDashboard.module.css";
import { AdminDashboardSidebar } from "../components/AdminDashboardSidebar";

export function AdminDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>

        <AdminDashboardSidebar />
      </div>
    </div>
  );
}