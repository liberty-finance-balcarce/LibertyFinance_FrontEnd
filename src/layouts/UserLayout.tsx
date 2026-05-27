import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBarUsuarioRegistrado";

export function UserLayout() {
  return (
    <>
      <NavBar/>
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
