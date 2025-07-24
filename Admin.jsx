
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Package, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useProducts } from '@/contexts/ProductContext.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    brand: '',
    image: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
  };

  const categories = [
    { value: 'relojes', label: 'Relojes' },
    { value: 'ropa', label: 'Ropa' },
    { value: 'zapatos', label: 'Zapatos' }
  ];

  const stats = [
    { title: 'Total Productos', value: products.length, icon: Package, color: 'bg-blue-500' },
    { title: 'Valor Inventario', value: `$${products.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2)}`, icon: DollarSign, color: 'bg-green-500' },
    { title: 'Categorías', value: new Set(products.map(p => p.category)).size, icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Marcas', value: new Set(products.map(p => p.brand)).size, icon: Users, color: 'bg-orange-500' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', price: '', brand: '', image: '' });
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.brand) {
      toast({ title: "Campos requeridos", description: "Por favor completa todos los campos obligatorios", variant: "destructive" });
      return;
    }

    const productData = { ...formData, price: parseFloat(formData.price), image: formData.image || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400` };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setFormData({ name: product.name, category: product.category, price: product.price.toString(), brand: product.brand, image: product.image });
    setEditingProduct(product);
    setIsAddingProduct(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Panel de Administración - Activa Store</title>
        <meta name="description" content="Panel de administración para gestionar productos, inventario y configuraciones de la tienda." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona tu inventario y productos de Activa Store</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Cerrar Sesión</Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}><stat.icon className="w-6 h-6 text-white" /></div>
                <div className="ml-4"><p className="text-sm text-gray-600">{stat.title}</p><p className="text-2xl font-bold text-gray-900">{stat.value}</p></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
                {!isAddingProduct && (<Button onClick={() => setIsAddingProduct(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"><Plus className="w-4 h-4 mr-2" />Nuevo</Button>)}
              </div>
              {isAddingProduct && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><Label htmlFor="name">Nombre del Producto *</Label><Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Ej: Reloj Elegante" required /></div>
                  <div><Label htmlFor="category">Categoría *</Label><Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}><SelectTrigger><SelectValue placeholder="Seleccionar categoría" /></SelectTrigger><SelectContent>{categories.map((category) => (<SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>))}</SelectContent></Select></div>
                  <div><Label htmlFor="brand">Marca *</Label><Input id="brand" value={formData.brand} onChange={(e) => handleInputChange('brand', e.target.value)} placeholder="Ej: Nike, Rolex, Zara" required /></div>
                  <div><Label htmlFor="price">Precio ($) *</Label><Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} placeholder="99.99" required /></div>
                  <div><Label htmlFor="image">URL de Imagen</Label><Input id="image" value={formData.image} onChange={(e) => handleInputChange('image', e.target.value)} placeholder="https://ejemplo.com/imagen.jpg" /><p className="text-xs text-gray-500 mt-1">Opcional: Se usará una imagen por defecto.</p></div>
                  <div className="flex space-x-2"><Button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">{editingProduct ? 'Actualizar' : 'Agregar'}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button></div>
                </form>
              )}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800">💡 <strong>Tip:</strong> La descripción del producto se generará automáticamente usando IA.</p></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b border-gray-100"><h2 className="text-xl font-semibold text-gray-900">Lista de Productos ({products.length})</h2></div>
              <div className="divide-y divide-gray-100">
                {products.length > 0 ? products.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                        <p className="text-lg font-bold text-purple-600">${product.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 line-clamp-2">{product.description}</div>
                  </motion.div>
                )) : (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay productos</h3>
                    <p className="text-gray-600 mb-6">Comienza agregando tu primer producto al inventario.</p>
                    <Button onClick={() => setIsAddingProduct(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"><Plus className="w-4 h-4 mr-2" />Agregar Primer Producto</Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
