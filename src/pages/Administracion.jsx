import React from 'react';
import { LayoutDashboard, Package, Users, PlusCircle, FolderPlus } from 'lucide-react';
import Lottie from 'lottie-react';
import animationData from '../assets/admin-animation.json';

const AdminPanel = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-5">
        <h1 className="text-xl font-bold mb-5">Panel de Administrador</h1>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg">
            <LayoutDashboard />
            <a href="#dashboard" className="hover:underline">Dashboard</a>
          </li>
          <li className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg">
            <Package />
            <a href="/ListadoProductos" className="hover:underline">Productos</a>
          </li>
          <li className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg">
            <Users />
            <a href="/Usuarios" className="hover:underline">Usuarios</a>
          </li>
          <li className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg">
            <PlusCircle />
            <a href="/AgregarProducto" className="hover:underline">Agregar producto</a>
          </li>
          <li className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg">
            <FolderPlus />
            <a href="/GestionarCategorias" className="hover:underline">Gestionar categorías</a>
          </li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Bienvenido al Panel de Administración</h2>
        <Lottie animationData={animationData} className="w-64 h-64" />
      </main>
    </div>
  );
};

export default AdminPanel;
