import { useEffect, useState } from "react";
import { getInstrumentos, getUsers } from "../services/api";
import CardAdmin from "../components/AdminCardUsers";
import { AdminUserList } from "../components/AdminUsersList";
import type { Usuario } from "../types/usuarios";
import styles from "../styles/pages/DashboardAdmin.module.css";
import { AdminListInstFin } from "../components/AdminListInsFin";
import type { Instrumento } from "../types/instrumento-financiero";

export default function AdminDashboard() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
  try {
    const usuarios = await getUsers();

    setUsers(usuarios);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const cargarInstrumentos = async () => {
    const data = await getInstrumentos(); // Tu service
    setInstrumentos(data); // Guardamos la lista del back
  };
  cargarInstrumentos();
}, []);
  
const totalUsuarios = users.filter(
  (user) => user.rol?.nombre === "user"
).length;

const totalAdmins = users.filter(
  (user) => user.rol?.nombre === "admin"
).length;

const totalRegistrados = totalUsuarios + totalAdmins;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Panel de Administrador</h1>
      </div>

      <CardAdmin
        totalRegistrados={totalRegistrados}
        totalUsuarios={totalUsuarios}
        totalAdmins={totalAdmins}
      />
      <h2 className={styles.subtitle}>Lista de Usuarios</h2>
      <AdminUserList usuarios={users} />

      <h2 className={styles.subtitle}>Lista de Instrumentos</h2>
      <AdminListInstFin instrumentos={instrumentos} />
    </div>
  );
}