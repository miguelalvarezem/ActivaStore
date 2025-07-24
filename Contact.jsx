
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Building, Mail } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.75rem',
};

const center = {
  lat: 10.2504,
  lng: -68.0024
};

const Contact = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  });

  const contactInfo = [
    { icon: Phone, text: '+58 424-4650162', href: 'tel:+584244650162' },
    { icon: Phone, text: '+58 414-3417583', href: 'tel:+584143417583' },
    { icon: MapPin, text: 'Naguanagua, La Campiña, Carabobo, Venezuela' },
    { icon: Mail, text: 'contacto@activastore.com', href: 'mailto:contacto@activastore.com' }
  ];

  return (
    <>
      <Helmet>
        <title>Contacto - Activa Store</title>
        <meta name="description" content="Ponte en contacto con nosotros. Encuentra nuestra ubicación, teléfonos y más información sobre Activa Store." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Contáctanos</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Estamos aquí para ayudarte. No dudes en comunicarte con nosotros.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info and "Quienes Somos" */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-purple-600" />
                  ¿Quiénes Somos?
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  En Activa Store, nos dedicamos a ofrecerte una selección curada de accesorios personales que definen tu estilo. Creemos que cada detalle cuenta, por eso seleccionamos solo productos de la más alta calidad en relojes, ropa y zapatos. Nuestra pasión es ayudarte a expresar tu individualidad con piezas únicas y duraderas.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <info.icon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                      {info.href ? (
                         <a href={info.href} className="ml-3 text-gray-700 hover:text-purple-800 transition-colors">{info.text}</a>
                      ) : (
                         <span className="ml-3 text-gray-700">{info.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100"
            >
               {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              ) : <div>Cargando mapa...</div>}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
