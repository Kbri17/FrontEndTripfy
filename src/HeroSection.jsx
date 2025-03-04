import { FaSun, FaSuitcase } from "react-icons/fa";

const HeroSection = () => {
  return (
    <nav className="flex items-center justify-center p-4 bg-gray-800 text-white w-full z-50 relative">
      <div className="flex items-center space-x-16">
        <div className="text-lg font-bold">Categorias</div>
        <div className="flex space-x-8">
          <button className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-white hover:text-blue-500">
            <FaSun size={24} />
            <span className="text-sm">Full Day</span>
          </button>
          <button className="flex flex-col items-center p-2 bg-green-500 text-white rounded-lg transition duration-300 hover:bg-white hover:text-green-500">
            <FaSuitcase size={24} />
            <span className="text-sm">Paquetes</span>
          </button>
        </div>
      </div>
    </nav>
  );

};

export default HeroSection;
