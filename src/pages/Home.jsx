
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import { useProducts } from '@/contexts/ProductContext.jsx';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  const features = [
    {
      icon: Truck,
      title: "Envío a Nivel Nacional",
      description: "Recibe tu pedido en cualquier parte de Venezuela."
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Tu información está protegida en todo momento."
    },
    {
      icon: Headphones,
      title: "Soporte Dedicado",
      description: "Atención al cliente para resolver tus dudas."
    },
    {
      icon: Star,
      title: "Calidad Premium",
      description: "Solo productos de la más alta calidad y garantía."
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Activa Store - Tienda de Accesorios Personales Premium</title>
        <meta name="description" content="Descubre la mejor colección de relojes, ropa y zapatos de marcas premium. Envío nacional, compra segura y garantía." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                Tu Estilo,
                <span className="block text-yellow-300">Nuestra Pasión</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100 max-w-lg">
                Descubre la colección más exclusiva de relojes, ropa y zapatos. 
                Productos premium con la mejor calidad y diseño.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/productos">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-purple-600 hover:bg-purple-50 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Explorar Productos
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contacto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-transform duration-300">
                    Contáctanos
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                alt="Colección de productos premium de Activa Store"
                src="https://images.unsplash.com/photo-1530611183773-0dccbb8740df?q=80&w=2070&auto=format&fit=crop" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Activa Store?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nos comprometemos a ofrecerte la mejor experiencia de compra con productos de calidad excepcional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección especial de los productos más populares y mejor valorados.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/productos">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-transform duration-300">
                Ver Todos los Productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
