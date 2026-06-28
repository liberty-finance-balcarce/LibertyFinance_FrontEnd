import type { UpdateUsuario } from "../types/usuarios";
import { VITE_API_URL } from "../utils/env";

export async function getUsers() {
  const response = await fetch(`${VITE_API_URL}/usuarios`);

  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }

  const result = await response.json();

  return result.data;
}

export async function updateUser(dni: number, data: UpdateUsuario) {
  const response = await fetch(`${VITE_API_URL}/usuarios/${dni}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }

  const result = await response.json();

  return result;
}

export async function deleteUser(dni: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${VITE_API_URL}/usuarios/${dni}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }

  return await response.json();
}

export async function getRoles() {
  const response = await fetch(`${VITE_API_URL}/rol`);

  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }

  const result = await response.json();

  return result.data;
}
