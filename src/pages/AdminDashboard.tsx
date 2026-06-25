import { useEffect, useState } from "react";
import { getUsers } from "../services/usuarios";
import {AdminUsersCard} from "../components/AdminUsersCard";
import { AdminUserList } from "../components/AdminUsersList";
import type { Usuario } from "../types/usuarios";
import styles from "../styles/pages/DashboardAdmin.module.css";
import { AdminDashboardSidebar } from "../components/AdminDashboardSidebar";

export default function AdminDashboard() {
  // const [users, setUsers] = useState<Usuario[]>([]);

  // useEffect(() => {
  //   cargarUsuarios();
  // }, []);

  // const cargarUsuarios = async () => {
  //   try {
  //     const usuarios = await getUsers();

  //     setUsers(usuarios);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const totalUsuarios = users.filter(
  //   (user) => user.rol?.nombre === "user",
  // ).length;

  // const totalAdmins = users.filter(
  //   (user) => user.rol?.nombre === "admin",
  // ).length;

  // const totalRegistrados = totalUsuarios + totalAdmins;

  return (
    // <div className={styles.container}>
    //   <div className={styles.title}>
    //     <h1>Panel de Administrador</h1>
    //   </div>
    <div>
      <AdminDashboardSidebar />

      {/* <AdminUsersCard
        totalRegistrados={totalRegistrados}
        totalUsuarios={totalUsuarios}
        totalAdmins={totalAdmins}
      />
      <h2 className={styles.subtitle}>Lista de Usuarios</h2>
      <AdminUserList usuarios={users} /> */}
      
    </div>
    
  );
}
