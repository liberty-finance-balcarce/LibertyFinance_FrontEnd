import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { BsPersonFill } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import styles from "../styles/components/AdminDashboardSidebar.module.css";

export function AdminDashboardSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          <BsPersonFill size={22} color="var(--colorSombraVentana)" />
          <span>Usuarios</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/instrumentos-financieros"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          <LuClipboardList size={22} color="var(--colorSombraVentana)" />
          <span>Instrumentos Financieros</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/paquetes-inversion"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          <FaMoneyBillTrendUp size={22} color="var(--colorSombraVentana)" />
          <span>Paquetes de Inversión</span>
        </NavLink>
      </nav>

      <button onClick={handleLogout} className={styles.logoutButton}>
        <span>&larr;</span> Cerrar sesión
      </button>
    </aside>
  );
}
