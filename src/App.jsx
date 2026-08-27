import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import Floating3DScene from './components/Floating3DScene';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { initialProducts } from './data/products';
import { getProductDisplayImage } from './utils/productImages';
import rchLogo from './photos/logo/RCH.png';

// Premium Preloader Component
function Preloader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#161616] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="absolute inset-0 bg-luxury-bg-pattern opacity-5 pointer-events-none" />
      <div className="space-y-4 max-w-sm">
        {/* Animated Royal Logo Monogram */}
        <motion.div
          initial={{ scale: 0.8, rotateY: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], rotateY: [0, 360, 360], opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center mx-auto bg-coffee shadow-2xl relative overflow-hidden p-1"
        >
          <div className="absolute inset-1 rounded-full border border-gold/40 animate-ping opacity-25" />
          <img src={rchLogo} alt="Roshani Logo" className="w-full h-full object-cover rounded-full" />
        </motion.div>
        
        {/* Text Fade in */}
        <div className="space-y-1">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-serif text-2xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            Roshani Chaat House
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-cream/60"
          >
           Luxury Hotel
          </motion.p>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-48 h-[1px] bg-gold/10 mx-auto rounded-full overflow-hidden mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-full bg-gold"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(() =>
    initialProducts.map((product) => ({
      ...product,
      image: product.image || getProductDisplayImage(product)
    }))
  );

  // Shared Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProducts(
      initialProducts.map((product) => ({
        ...product,
        image: product.image || getProductDisplayImage(product)
      }))
    );
  }, []);

  const handleOpenProduct = (product) => {
    // Make sure we pass the product from current state which has uploaded images
    const currentProductState = products.find(p => p.id === product.id) || product;
    setSelectedProduct(currentProductState);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col justify-between relative"
          >
            <Floating3DScene />
            <Navbar />
            
            <main className="flex-grow">
              <Suspense 
                fallback={
                  <div className="flex justify-center items-center py-20 min-h-[50vh]">
                    <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home onOpenProduct={handleOpenProduct} />} />
                  <Route path="/menu" element={<Menu products={products} onOpenProduct={handleOpenProduct} />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />

            {/* Global detailed popup */}
            <ProductModal 
              product={selectedProduct} 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}
