import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import HeroSection from "./HeroSection";
import Carousel from "./components/Carrusel";
import LoginForm from "./auth/LoginForm";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <Router>
      <Header />
      <Search/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Carousel />
              <LoginForm />
            </>
          }
        />
        <Route path="/details/:id" element={<ProductDetails />} /> {/* Esta ruta debe coincidir */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


