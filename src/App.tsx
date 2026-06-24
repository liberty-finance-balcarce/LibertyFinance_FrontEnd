import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PublicRoute } from "./routes/PublicRoute";
import { UserRoute } from "./routes/UserRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { Layout } from "./layouts/Layout";
import { UserLayout } from "./layouts/UserLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Register } from "./pages/Register";
import { Home } from "./components/Home";
import { NuestroEquipo } from "./pages/NuestroEquipo";
import { Contactenos } from "./pages/Contactenos";
import { TerminosYCondiciones } from "./pages/TerminosYCondiciones";
import { DescargoDeResponsabilidad } from "./pages/DescargoDeResponsabilidad";
import { DerechosReservados } from "./pages/DerechosReservados";
import { FAQ } from "./pages/FAQ";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { UserDashboard } from "./pages/UserDashboard";
import { DashboardCart } from "./pages/DashboardCart";
import { DashboardInversiones } from "./pages/DashboardInversiones";
import { DashboardTestPerfil } from "./pages/DashboardTestPerfil";
import AdminDashboard from "./pages/DashboardAdmin";
import AdminCardUsers from "./components/AdminCardUsers";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<UserRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/dashboard/user" element={<UserDashboard />}>
                <Route path="cart" element={<DashboardCart />} />
                <Route path="inversiones" element={<DashboardInversiones />} />
                <Route path="test-inversor" element={<DashboardTestPerfil />} />
              </Route>
            </Route>
          </Route>

          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />}>
                <Route path="users" element={<AdminCardUsers totalRegistrados={0} totalUsuarios={0} totalAdmins={0} />} />
              </Route>
            </Route>
          </Route>

          <Route element={<PublicRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sobre-nosotros" element={<NuestroEquipo />} />
              <Route path="/contactenos" element={<Contactenos />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/terminos-y-condiciones"
                element={<TerminosYCondiciones />}
              />

              <Route
                path="/descargo-de-responsabilidad"
                element={<DescargoDeResponsabilidad />}
              />

              <Route
                path="/derechos-reservados"
                element={<DerechosReservados />}
              />

              <Route path="/faq" element={<FAQ />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
