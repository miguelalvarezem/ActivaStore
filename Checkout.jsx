
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MapPin, CreditCard, MessageCircle, ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.75rem',
};

const defaultCenter = {
  lat: 10.2504,
  lng: -68.0024
};

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: '',
    notes: ''
  });
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  });

  const onMapClick = useCallback((event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const paymentMethods = [
    { value: 'pago-movil', label: '📱 Pago Móvil', emoji: '📱' },
    { value: 'transferencia', label: '🏦 Transferencia Bancaria', emoji: '🏦' },
    { value: 'binance', label: '₿ Binance Pay', emoji: '₿' },
    { value: 'zinli', label: '💳 Zinli', emoji: '💳' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    const productList = cartItems.map(item => 
      `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const paymentMethodEmoji = paymentMethods.find(pm => pm.value === formData.paymentMethod)?.emoji || '💳';
    const locationLink = `https://www.google.com/maps?q=${markerPosition.lat},${markerPosition.lng}`;
    
    return `🛍️ *NUEVO PEDIDO - ACTIVA STORE* 🛍️

👤 *Cliente:* ${formData.name}
📞 *Teléfono:* ${formData.phone}
📧 *Email:* ${formData.email}

📍 *Dirección de Entrega (Texto):*
${formData.address}

🗺️ *Ubicación en Mapa:*
${locationLink}

🛒 *Productos:*
${productList}

💰 *Total:* $${getCartTotal().toFixed(2)}

${paymentMethodEmoji} *Método de Pago:* ${paymentMethods.find(pm => pm.value === formData.paymentMethod)?.label || 'No seleccionado'}

${formData.notes ? `📝 *Notas adicionales:*\n${formData.notes}` : ''}

¡Gracias por elegir Activa Store! 🎉`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'phone', 'email', 'address', 'paymentMethod'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    const message = generateWhatsAppMessage();
    const phoneNumber = "584244650162";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    
    toast({
      title: "¡Pedido enviado! 🎉",
      description: "Tu pedido ha sido enviado por WhatsApp. Te contactaremos pronto.",
    });

    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No hay productos en el carrito</h2>
          <p className="text-lg text-gray-600 mb-8">Agrega algunos productos antes de proceder al checkout.</p>
          <Link to="/productos"><Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">Explorar Productos</Button></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Checkout - Activa Store</title>
        <meta name="description" content="Completa tu compra de forma segura y rápida. Múltiples métodos de pago disponibles." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/carrito" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"><ArrowLeft className="w-4 h-4 mr-2" />Volver al carrito</Link>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">Completa tu información para procesar el pedido</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Personal</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Nombre Completo *</Label><Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Tu nombre completo" required /></div>
                <div><Label htmlFor="phone">Teléfono *</Label><Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="+58 424 465 0162" required /></div>
                <div className="md:col-span-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="tu@email.com" required /></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dirección de Entrega</h2>
              <div className="space-y-4">
                <div><Label htmlFor="address">Dirección de Referencia *</Label><Input id="address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Calle, edificio, punto de referencia" required /></div>
                <div className="mt-4">
                  <Label>Selecciona tu ubicación en el mapa *</Label>
                  <p className="text-xs text-gray-500 mb-2">Haz clic en el mapa para fijar tu ubicación exacta de entrega.</p>
                  {isLoaded ? (
                    <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={13} onClick={onMapClick}>
                      <Marker position={markerPosition} />
                    </GoogleMap>
                  ) : <div>Cargando mapa...</div>}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4"><CreditCard className="w-5 h-5 inline mr-2" />Método de Pago</h2>
              <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}><SelectTrigger><SelectValue placeholder="Selecciona tu método de pago" /></SelectTrigger><SelectContent>{paymentMethods.map((method) => (<SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>))}</SelectContent></Select>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notas Adicionales</h2>
              <Textarea value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} placeholder="Instrucciones especiales, referencias, etc." rows={3} />
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen del Pedido</h2>
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">{cartItems.map((item) => (<div key={item.id} className="flex justify-between items-center"><div className="flex-1"><p className="font-medium text-sm">{item.name}</p><p className="text-xs text-gray-500">Cantidad: {item.quantity}</p></div><p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p></div>))}</div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">${getCartTotal().toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Envío</span><span className="font-medium text-green-600">A convenir</span></div>
                  <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-purple-600">${getCartTotal().toFixed(2)}</span></div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg"><p className="text-sm text-green-800"><MessageCircle className="w-4 h-4 inline mr-1" />Tu pedido será enviado por WhatsApp para confirmar los detalles de pago y entrega.</p></div>
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Pedido por WhatsApp
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
