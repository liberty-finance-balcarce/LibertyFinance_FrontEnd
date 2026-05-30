import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";

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
