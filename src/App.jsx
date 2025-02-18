import Footer from './layout/Footer'
import Header from './layout/Header'
import HeroSection from './HeroSection'
import Carousel from './components/Carrusel'
import LoginForm from './auth/LoginForm'
function App() {

  return (
    <>
      <Header />
      <HeroSection />
      <Carousel />
      <LoginForm/>
      <Footer> </Footer>
    </>
  );
}

export default App
