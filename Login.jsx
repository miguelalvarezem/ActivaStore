
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { Lock, AtSign } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      toast({
        title: "¡Bienvenido! 👋",
        description: "Has iniciado sesión correctamente.",
      });
      navigate('/admin');
    } else {
      setError('Email o contraseña incorrectos.');
      toast({
        title: "Error de autenticación",
        description: "El email o la contraseña son incorrectos.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login de Administrador - Activa Store</title>
        <meta name="description" content="Página de inicio de sesión para administradores de Activa Store." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="text-center mb-8">
              <img
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/10467770-580a-47d5-86f7-b125f6e804f5/9d548f0727937af861c8f154446b85e0.jpg"
                alt="Logo Activa Store"
                className="w-32 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-800">Acceso de Administrador</h1>
              <p className="text-gray-500">Ingresa tus credenciales para continuar</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3">
                Ingresar
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
