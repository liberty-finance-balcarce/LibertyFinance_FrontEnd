
import styles from "../styles/pages/AdminDashboard.module.css";
import { AdminDashboardSidebar } from "../components/AdminDashboardSidebar";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <AdminDashboardSidebar />
    </div>
  );
}
