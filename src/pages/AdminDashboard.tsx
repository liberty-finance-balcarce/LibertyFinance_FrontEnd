import { Outlet } from "react-router-dom";
import { AdminDashboardSidebar } from "../components/AdminDashboardSidebar";
import styles from "../styles/pages/Dashboard.module.css";

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
