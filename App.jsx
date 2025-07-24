
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster.jsx';
import { CartProvider } from '@/contexts/CartContext.jsx';
import { ProductProvider } from '@/contexts/ProductContext.jsx';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import Home from '@/pages/Home.jsx';
import Products from '@/pages/Products.jsx';
import Cart from '@/pages/Cart.jsx';
import Admin from '@/pages/Admin.jsx';
import Login from '@/pages/Login.jsx';
import Contact from '@/pages/Contact.jsx';
import Checkout from '@/pages/Checkout.jsx';
import WhatsAppFloat from '@/components/WhatsAppFloat.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
              <Helmet>
                <title>Activa Store - Tienda de Accesorios Personales</title>
                <meta name="description" content="Descubre la mejor colección de relojes, ropa y zapatos. Productos de calidad con envío a toda Venezuela." />
              </Helmet>
              
              <Navbar />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/productos" element={<Products />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                </Routes>
              </main>
              
              <WhatsAppFloat />
              <Footer />
              <Toaster />
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
