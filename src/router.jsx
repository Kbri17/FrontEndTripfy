import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import PerfilUser from "./auth/PerfilUsuario";

const Root = () => (
  <div className="flex flex-col min-h-screen">
    <Header /> {/* Siempre visible arriba */}
    {/* Contenido principal que ocupa el espacio restante */}
    <div className="flex-grow mt-16">
      <Outlet />
    </div>
    <Footer /> {/* Siempre abajo */}
  </div>
);


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Componente que es común en todas las rutas
    children: [
      {
        index: true,
        element: <Home />, // Componente que aparece en la ruta raíz
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/perfil",
        element: <PerfilUser/>,
      },
    ],
  },
]);