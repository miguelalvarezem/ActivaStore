
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Home as HomeIcon, Package, Phone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';

const Navbar = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const cartItemsCount = getCartItemsCount();

  const navItems = [
    { path: '/', label: 'Inicio', icon: HomeIcon },
    { path: '/productos', label: 'Productos', icon: Package },
    { path: '/contacto', label: 'Contacto', icon: Phone },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/10467770-580a-47d5-86f7-b125f6e804f5/9d548f0727937af861c8f154446b85e0.jpg"
              alt="Logo de Activa Store by Invicta"
              className="h-12 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                  location.pathname === item.path
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/admin"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                  location.pathname === '/admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Cart Button */}
          <Link to="/carrito">
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Carrito
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cart-badge"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-purple-100">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                location.pathname === item.path
                  ? 'text-purple-700'
                  : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
