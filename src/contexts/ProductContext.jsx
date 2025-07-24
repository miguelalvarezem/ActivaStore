
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast.js';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de ProductProvider');
  }
  return context;
};

const generateAIDescription = (product) => {
  const descriptions = {
    relojes: [
      "Un elegante reloj que combina sofisticación y funcionalidad. Perfecto para cualquier ocasión, desde reuniones de negocios hasta eventos sociales.",
      "Diseño atemporal que refleja tu personalidad única. Este reloj es más que un accesorio, es una declaración de estilo.",
      "Precisión suiza en cada segundo. Un reloj que no solo marca el tiempo, sino que define tu presencia.",
    ],
    ropa: [
      "Prenda confeccionada con los mejores materiales para garantizar comodidad y durabilidad. Ideal para lucir impecable en cualquier momento.",
      "Diseño contemporáneo que se adapta a tu estilo de vida. Una pieza versátil que complementa perfectamente tu guardarropa.",
      "Calidad premium que se siente desde el primer uso. Esta prenda está diseñada para quienes valoran la excelencia.",
    ],
    zapatos: [
      "Calzado diseñado para brindar máximo confort sin sacrificar el estilo. Cada paso será una experiencia de lujo.",
      "Construcción artesanal que garantiza durabilidad y elegancia. Estos zapatos son la perfecta combinación de forma y función.",
      "Diseño ergonómico que se adapta perfectamente a tus pies. Comodidad todo el día con un estilo incomparable.",
    ]
  };

  const categoryDescriptions = descriptions[product.category] || descriptions.ropa;
  const randomDescription = categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
  
  return `${randomDescription} ${product.name} - ${product.brand || 'Marca Premium'}. Precio especial: $${product.price}`;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        const initialProducts = [
          { id: 1, name: "Reloj Clásico Elegante", category: "relojes", price: 299.99, brand: "TimeStyle", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
          { id: 2, name: "Camisa Casual Premium", category: "ropa", price: 89.99, brand: "FashionHub", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
          { id: 3, name: "Zapatos Deportivos Pro", category: "zapatos", price: 159.99, brand: "SportMax", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" }
        ].map(p => ({ ...p, description: generateAIDescription(p) }));
        setProducts(initialProducts);
      }
    } catch (error) {
      console.error("Error al cargar productos de localStorage", error);
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error("Error al guardar productos en localStorage", error);
    }
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = { ...productData, id: Date.now(), description: generateAIDescription(productData) };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    toast({ title: "¡Producto agregado! ✨", description: `${newProduct.name} ha sido agregado.` });
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, ...productData, description: generateAIDescription({ ...product, ...productData }) } : product
      )
    );
    toast({ title: "Producto actualizado 📝", description: "El producto ha sido actualizado." });
  };

  const deleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    toast({ title: "Producto eliminado 🗑️", description: "El producto ha sido eliminado." });
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const value = { products, addProduct, updateProduct, deleteProduct, getProductsByCategory, generateAIDescription };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
