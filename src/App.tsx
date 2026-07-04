import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Splash } from "./pages/Splash";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { RegisterCase } from "./pages/RegisterCase";
import { Alerts } from "./pages/Alerts";
import { Vaccines } from "./pages/Vaccines";
import { RegisterVaccine } from "./pages/RegisterVaccine";
import { Profile } from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="registrar" element={<RegisterCase />} />
        <Route path="alertas" element={<Alerts />} />
        <Route path="vacinas" element={<Vaccines />} />
        <Route path="vacinas/registrar" element={<RegisterVaccine />} />
        <Route path="perfil" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
