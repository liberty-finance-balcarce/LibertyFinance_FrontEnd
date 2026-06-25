import { Outlet } from "react-router-dom";
import { UserDashboardSidebar } from "../components/UserDashboardSidebar";
import styles from "../styles/pages/Dashboard.module.css";

export function UserDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>

        <UserDashboardSidebar />
      </div>
    </div>
  );
}
