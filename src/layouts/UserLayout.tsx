import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export function UserLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
