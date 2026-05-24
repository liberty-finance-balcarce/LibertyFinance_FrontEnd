import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../components/DashboardSidebar";
import styles from "../styles/pages/Dashboard.module.css";

export function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>

        <DashboardSidebar />
      </div>
    </div>
  );
}
