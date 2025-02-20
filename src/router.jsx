import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoginForm from "./auth/LoginForm";
import Details from "./pages/Details";
import Producto from "./pages/Producto"
import Galeria from "./pages/Galeria"

const Root = () => (
  <div className="flex flex-col min-h-screen">
    <Header /> {/* Siempre visible arriba */}
    {/* Contenido principal que ocupa el espacio restante */}
    <div className="flex-grow">
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
        path: "/producto",
        element: <Producto/>,
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/galeria",
        element: <Galeria/>,
      },
    ],
  },
]);