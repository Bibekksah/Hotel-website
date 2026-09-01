import React, { useState } from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewSystem from './ReviewSystem';
import { initialProducts } from '../data/products';

export default function ProductModal({ product, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'reviews'
  const [currentProduct, setCurrentProduct] = useState(product);

  // Sync state if product changes
  React.useEffect(() => {
    setCurrentProduct(product);
    setActiveTab('details');
  }, [product]);

  if (!isOpen || !currentProduct) return null;

  // Find related products (same category, excluding current product)
  const relatedProducts = initialProducts
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 3);

  // Switch product helper
  const handleSwitchProduct = (newProd) => {
    setCurrentProduct(newProd);
    setActiveTab('details');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative bg-cream border border-gold/30 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-charcoal/40 hover:bg-gold text-cream hover:text-charcoal transition-all duration-300 border border-gold/10"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          {/* Left Side: Product Visuals Panel */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-gradient-to-b from-[#2C1810] to-[#161616] flex flex-col justify-between border-b md:border-b-0 md:border-r border-gold/15 shrink-0 overflow-y-auto">
            <div className="space-y-6">
              {/* Visual Display Screen */}
              <div className="flex-1 flex items-center justify-center min-h-[280px] relative">
                <div className="aspect-square w-full max-w-[320px] flex items-center justify-center relative bg-charcoal/20 border border-gold/10 rounded-full p-6 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_80%)]" />
                  
                  {/* Golden Platter stand representation */}
                  <div className="absolute bottom-6 w-36 h-2 bg-gold/30 blur-sm rounded-full" />
                  <div className="absolute bottom-7 w-32 h-1 bg-gold/10 rounded-full border border-gold/20" />

                  {currentProduct.image ? (
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-56 h-56 object-cover rounded-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500 z-10 border-2 border-gold/30"
                    />
                  ) : (
                    <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-[#3D2517] to-[#2C1810] border border-gold/30 flex flex-col items-center justify-center p-4 z-10 text-center">
                      <span className="text-gold font-serif text-5xl font-bold tracking-widest mb-1">
                        {currentProduct.name.charAt(0)}
                      </span>
                      <p className="text-[9px] text-[#F7E9D0]/40 font-sans uppercase tracking-[0.15em] max-w-[100px]">
                        Roshani Chaat House
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Related Products list inside modal */}
            {relatedProducts.length > 0 && (
              <div className="pt-6 border-t border-gold/15 mt-6">
                <p className="text-[10px] font-sans tracking-widest uppercase text-gold/60 font-semibold mb-3 text-center md:text-left">
                  Explore Related Delicacies
                </p>
                <div className="flex gap-3 justify-center md:justify-start">
                  {relatedProducts.map(rel => (
                    <button
                      key={rel.id}
                      onClick={() => handleSwitchProduct(rel)}
                      className="flex items-center space-x-2.5 bg-charcoal/40 hover:bg-gold/10 border border-gold/15 hover:border-gold/30 p-2 rounded-xl text-left transition-all duration-300 max-w-[130px] overflow-hidden"
                    >
                      {rel.image ? (
                        <img src={rel.image} alt={rel.name} className="w-8 h-8 rounded-full object-cover border border-gold/20 shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-coffee border border-gold/20 text-gold flex items-center justify-center font-bold text-xs shrink-0">{rel.name.charAt(0)}</div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-cream font-medium font-serif truncate">{rel.name}</p>
                        <p className="text-[9px] text-gold truncate">Rs. {rel.priceOptions[0].price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Product Details & Reviews (Scrollable Panel) */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
            <div className="flex-1 space-y-6">
              {/* Header Info */}
              <div>
                <span className="text-[10px] font-sans tracking-widest uppercase text-chocolate/55 font-bold bg-beige border border-gold/10 px-3 py-1 rounded-full inline-block mb-3">
                  {currentProduct.category} Item
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-coffee tracking-wide">
                  {currentProduct.name}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-gold text-sm">
                    <FaStar className="w-3.5 h-3.5 fill-current mr-1" />
                    <span className="font-bold text-coffee">{currentProduct.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-chocolate/30 text-xs">•</span>
                  <span className="text-chocolate/60 text-xs font-sans font-medium">{currentProduct.reviewsCount} verified customer reviews</span>
                </div>
              </div>

              {/* Sub-Tabs: Detail Specs vs Reviews list */}
              <div className="flex border-b border-gold/15 w-full">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 px-4 font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 relative ${
                    activeTab === 'details' ? 'text-gold' : 'text-chocolate/50 hover:text-chocolate'
                  }`}
                >
                  Product Details
                  {activeTab === 'details' && (
                    <motion.div layoutId="modalTabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 px-4 font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 relative ${
                    activeTab === 'reviews' ? 'text-gold' : 'text-chocolate/50 hover:text-chocolate'
                  }`}
                >
                  Customer Reviews
                  {activeTab === 'reviews' && (
                    <motion.div layoutId="modalTabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              <div className="pt-2">
                {activeTab === 'details' ? (
                  /* SPECIFICATIONS TAB */
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="font-serif text-sm text-coffee font-semibold tracking-wider">Product Story</h5>
                      <p className="text-sm text-chocolate/85 font-sans leading-relaxed">
                        {currentProduct.description}
                      </p>
                    </div>

                    {/* Price list grid */}
                    <div className="space-y-2">
                      <h5 className="font-serif text-sm text-coffee font-semibold tracking-wider">Pricing Configuration</h5>
                      <div className="grid grid-cols-2 gap-3 max-w-sm">
                        {currentProduct.priceOptions.map((opt, idx) => (
                          <div key={idx} className="bg-cream border border-gold/15 p-3 rounded-xl shadow-sm text-center">
                            <p className="text-[10px] text-chocolate/40 uppercase tracking-widest">Per {opt.unit}</p>
                            <p className="font-serif font-bold text-coffee text-base mt-0.5">Rs. {opt.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ingredients tags */}
                    <div className="space-y-2">
                      <h5 className="font-serif text-sm text-coffee font-semibold tracking-wider">Fine Ingredients</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProduct.ingredients.map((ing, idx) => (
                          <span key={idx} className="bg-beige border border-gold/10 text-chocolate/85 text-xs px-3 py-1 rounded-full font-medium">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nutrition facts table grid */}
                    {currentProduct.nutrition && (
                      <div className="space-y-2.5">
                        <h5 className="font-serif text-sm text-coffee font-semibold tracking-wider">Nutrition Information</h5>
                        <div className="grid grid-cols-4 gap-2 bg-cream border border-gold/10 p-4 rounded-2xl shadow-sm">
                          {Object.entries(currentProduct.nutrition).map(([key, val]) => (
                            <div key={key} className="text-center">
                              <p className="text-[9px] text-chocolate/40 uppercase tracking-wider font-semibold">{key}</p>
                              <p className="text-xs font-serif font-bold text-coffee mt-0.5">{val}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* REVIEWS TAB */
                  <div className="max-h-[50vh] overflow-y-auto pr-2">
                    <ReviewSystem productId={currentProduct.id} />
                  </div>
                )}
              </div>
            </div>

            {/* Footer buttons inside details pane */}
            <div className="pt-6 border-t border-gold/10 mt-6 flex justify-between items-center text-xs text-chocolate/40 font-sans">
              <span>Roshani Chaat House</span>
              <span>Golbazar, Nepal</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
