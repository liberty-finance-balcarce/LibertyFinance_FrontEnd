import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PublicRoute } from "./routes/PublicRoute";
import { Register } from "./pages/Register";
import { Home } from "./components/Home";
import { NuestroEquipo } from "./pages/NuestroEquipo";
import { Contactenos } from "./pages/Contactenos";
import { Footer } from "./components/Footer";
import { TerminosYCondiciones } from "./pages/TerminosYCondiciones";
import { DescargoDeResponsabilidad } from "./pages/DescargoDeResponsabilidad";
import { DerechosReservados } from "./pages/DerechosReservados";
import { FAQ } from "./pages/FAQ";
import { NotFound } from "./pages/NotFound";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { UserRoute } from "./routes/UserRoute";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route element={<UserRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/nuestro-equipo" element={<NuestroEquipo />} />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
