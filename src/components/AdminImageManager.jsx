import React, { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import { FaCloudUploadAlt, FaTrash, FaCheckCircle, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminImageManager({ onImagesUpdated }) {
  const [products] = useState(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState(initialProducts[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImages, setUploadedImages] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Load uploaded images from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('roshani_uploaded_images');
    if (stored) {
      setUploadedImages(JSON.parse(stored));
    }
  }, []);

  const handleImageUpload = (e, prodId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        const newImages = {
          ...uploadedImages,
          [prodId]: base64Data
        };
        setUploadedImages(newImages);
        localStorage.setItem('roshani_uploaded_images', JSON.stringify(newImages));
        
        // Notify parent App component to update state immediately
        if (onImagesUpdated) {
          onImagesUpdated(newImages);
        }

        setSuccessMsg(`Photograph for "${products.find(p => p.id === prodId).name}" updated successfully!`);
        setTimeout(() => setSuccessMsg(''), 4000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (prodId) => {
    const newImages = { ...uploadedImages };
    delete newImages[prodId];
    setUploadedImages(newImages);
    localStorage.setItem('roshani_uploaded_images', JSON.stringify(newImages));

    if (onImagesUpdated) {
      onImagesUpdated(newImages);
    }

    setSuccessMsg(`Image for "${products.find(p => p.id === prodId).name}" reset to placeholder.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to remove all uploaded product photographs?")) {
      setUploadedImages({});
      localStorage.removeItem('roshani_uploaded_images');
      if (onImagesUpdated) {
        onImagesUpdated({});
      }
      setSuccessMsg("All product photographs reset to boutique placeholders.");
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const currentImage = uploadedImages[selectedProductId] || '';

  // Filter products by search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Intro Header */}
      <div className="text-center space-y-4 mb-10">
        <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-bold">
          Boutique Asset Management
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-coffee font-semibold tracking-wide">
          Upload Real Product Photographs
        </h2>
        <div className="h-[2px] w-20 bg-gold mx-auto" />
        <p className="font-sans text-sm text-chocolate/70 leading-relaxed max-w-2xl mx-auto">
          We do not generate fake AI food images. Design the layout using your own photographs! Select any product below, click upload, and see it instantly projected in the interactive 3D viewer.
        </p>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 text-xs px-4 py-3 rounded-xl flex items-center space-x-2 mb-6"
        >
          <FaCheckCircle className="text-green-600 w-4 h-4 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </motion.div>
      )}

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Product Selector */}
        <div className="md:col-span-1 bg-cream border border-gold/15 p-5 rounded-2xl flex flex-col h-[500px]">
          <h4 className="font-serif text-base text-coffee font-bold tracking-wide mb-3">Select Product</h4>
          
          {/* Search Box */}
          <div className="relative mb-3.5">
            <FaSearch className="absolute left-3 top-3 text-chocolate/40 w-3.5 h-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sweets/snacks..."
              className="w-full bg-white border border-gold/20 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-gold transition-colors text-coffee"
            />
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1.5">
            {filteredProducts.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-300 ${
                  selectedProductId === p.id 
                    ? 'bg-gold border-gold text-charcoal' 
                    : 'bg-white border-gold/10 text-chocolate hover:bg-gold/5'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="font-serif font-bold text-xs truncate">{p.name}</p>
                  <p className={`text-[9px] font-sans uppercase tracking-wider font-semibold ${selectedProductId === p.id ? 'text-charcoal/60' : 'text-chocolate/50'}`}>
                    {p.category}
                  </p>
                </div>
                {uploadedImages[p.id] && (
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${selectedProductId === p.id ? 'bg-charcoal text-gold' : 'bg-green-100 text-green-800'}`}>
                    Photo
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetAll}
            className="w-full mt-4 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white text-red-600 py-2.5 rounded-xl transition-all duration-300 text-xs tracking-wider uppercase font-bold"
          >
            Clear All Photos
          </button>
        </div>

        {/* Right Side: Preview & Upload Controls */}
        <div className="md:col-span-2 space-y-6">
          {selectedProduct && (
            <div className="bg-cream border border-gold/20 p-6 sm:p-8 rounded-3xl space-y-6">
              {/* Product Info Header */}
              <div className="border-b border-gold/10 pb-4">
                <span className="text-[10px] font-sans tracking-widest uppercase text-gold bg-charcoal px-3 py-1 rounded-full inline-block font-semibold">
                  Category: {selectedProduct.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-coffee mt-2.5">{selectedProduct.name}</h3>
                <p className="text-xs text-chocolate/60 font-sans mt-1">Rs. {selectedProduct.priceOptions[0].price} per {selectedProduct.priceOptions[0].unit}</p>
              </div>

              {/* Uploader Box & Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* File Uploader */}
                <div className="border-2 border-dashed border-gold/25 hover:border-gold rounded-2xl p-6 text-center transition-colors duration-300">
                  <FaCloudUploadAlt className="w-10 h-10 text-gold mx-auto mb-3" />
                  <p className="font-sans text-xs font-semibold text-coffee mb-1">Select Sweet Photograph</p>
                  <p className="text-[10px] text-chocolate/50 mb-4">PNG, JPG or WEBP formats allowed</p>
                  
                  <label className="bg-gradient-to-r from-coffee to-chocolate hover:from-gold hover:to-gold-light hover:text-coffee text-cream border border-gold/20 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md font-sans text-xs tracking-widest uppercase font-bold cursor-pointer inline-block">
                    Browse File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, selectedProduct.id)}
                    />
                  </label>
                </div>

                {/* Uploaded Photo Preview */}
                <div className="space-y-3">
                  <p className="text-xs font-sans tracking-widest uppercase text-chocolate/60 font-semibold">Live Preview</p>
                  
                  {currentImage ? (
                    <div className="relative group rounded-2xl overflow-hidden border border-gold/20 shadow-md aspect-square max-w-[200px]">
                      <img 
                        src={currentImage} 
                        alt="Product preview" 
                        className="w-full h-full object-cover" 
                      />
                      <button
                        onClick={() => handleClearImage(selectedProduct.id)}
                        className="absolute top-2 right-2 bg-charcoal/80 hover:bg-red-600 text-cream p-2 rounded-full border border-gold/15 transition-colors duration-300"
                        title="Delete image"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-[#FFFDF9] border border-gold/15 rounded-2xl p-6 flex flex-col items-center justify-center text-center aspect-square max-w-[200px] border-dashed">
                      <div className="w-12 h-12 rounded-full bg-beige border border-gold/20 flex items-center justify-center mb-2.5">
                        <span className="text-gold font-serif text-lg font-bold">{selectedProduct.name.charAt(0)}</span>
                      </div>
                      <p className="text-[10px] text-chocolate/50 font-sans leading-relaxed">
                        Currently using beautiful gold medallion placeholder.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notice info */}
              <div className="bg-beige border border-gold/10 p-4 rounded-xl text-[11px] text-chocolate/70 leading-relaxed">
                <strong>💡 Quick Tip:</strong> The base64 file data is safely preserved inside your browser's local storage. This allows your custom photographs to persist instantly even if you reload the website or test it in developer mode!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
