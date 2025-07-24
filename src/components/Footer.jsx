
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';

const Footer = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <footer className="bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Link to="/contacto" className="text-sm hover:text-purple-600 transition-colors">Contacto</Link>
          <span className="text-gray-300">|</span>
          {!isAuthenticated && (
            <Link to="/login" className="text-sm hover:text-purple-600 transition-colors">Admin Login</Link>
          )}
          {isAuthenticated && (
            <Link to="/admin" className="text-sm hover:text-purple-600 transition-colors">Panel Admin</Link>
          )}
        </div>
        <p className="text-sm">
          Creado por <a href="https://creactivostudios.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-600 hover:underline">Creactivo Studios</a>
        </p>
        <p className="text-xs text-gray-400 mt-2">
          &copy; {new Date().getFullYear()} Activa Store. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
