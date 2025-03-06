import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoginForm from "./auth/LoginForm";
import Details from "./pages/Details";
import Producto from "./pages/Producto"
import Galeria from "./pages/Galeria"
import RegisterForm from "./auth/RegisterForm";
import PerfilUser from "./auth/PerfilUsuario";
import SwiperCarousel from "./components/SwiperCard";
import Administracion from "./pages/Administracion";
import AgregarProducto from "./pages/AgregarProducto";
import GestionarCategorias from "./pages/GestionarCategorias";
import ListadoProductos from "./pages/ListadoProductos";
import Usuarios from "./pages/Usuarios";

const Root = () => (
  <div className="w-full flex flex-col min-h-screen overflow-x-hidden">
    <Header /> {/* Siempre visible arriba */}
    {/* Contenido principal que ocupa el espacio restante */}
    <div className="flex-1 w-full bg-white ">
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
        element: <PerfilUser />,
      },
      {
        path: "/producto",
        element: <Producto />,
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/galeria",
        element: <Galeria />,
      },
      {
        path: "/swiper",
        element: <SwiperCarousel />,
      },
      //Solo rutas admin
      {
        path: "/admin",
        element: <SwiperCarousel />,
      },
      {
        path: "/admin/update",
        element: <SwiperCarousel />,
      },
      //Rutas prueba panel administracion  agregar producto, categorias, usurios, productos
      {
        path: "/administracion",
        element: <Administracion />,
      },
      {
        path: "/AgregarProducto",
        element: <AgregarProducto />,
      },
      {
        path: "/GestionarCategorias",
        element: <GestionarCategorias />,
      },
      {
        path: "/ListadoProductos",
        element: <ListadoProductos />,
      },
      {
        path: "/Usuarios",
        element: <Usuarios />,
      },

    ],
  },
]);