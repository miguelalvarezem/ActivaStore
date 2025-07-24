
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'relojes':
        return '⌚';
      case 'ropa':
        return '👕';
      case 'zapatos':
        return '👟';
      default:
        return '🛍️';
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden product-card border border-gray-100"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
            {getCategoryIcon(product.category)} {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={() => {
              // Vista rápida del producto
              alert(`Vista rápida de ${product.name}\n\n${product.description}`);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          <p className="text-sm text-gray-700 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-600">
            ${product.price}
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
