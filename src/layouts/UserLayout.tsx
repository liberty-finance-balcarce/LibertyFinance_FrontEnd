import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { UserNavBar } from "../components/UserNavBar";

export function UserLayout() {
  return (
    <>
      <UserNavBar/>
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
