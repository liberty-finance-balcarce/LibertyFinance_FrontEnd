import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaChartLine, FaListAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/components/DashboardSidebar.module.css";

export function DashboardSidebar() {
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
          to="/dashboard/cart"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          <FaShoppingCart size={22} color="var(--colorBordeVentana)" />
          <span>Carrito</span>
        </NavLink>

        <NavLink
          to="/dashboard/inversiones"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          <FaChartLine size={22} color="var(--colorBordeVentana)" />
          <span>Mis Inversiones</span>
        </NavLink>

        <NavLink
          to="/dashboard/test-inversor" 
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          <FaListAlt size={22} color="var(--colorBordeVentana)" />
          <span>Test Perfil de Inversor</span>
        </NavLink>
      </nav>
    
      <button onClick={handleLogout} className={styles.logoutButton}>
        <span>&larr;</span> Cerrar sesión
      </button>
    </aside>

  );
}
