import React, { useState } from 'react';
import { FaEye, FaImages, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      category: 'preparation',
      title: 'Boiling Fresh Dairy',
      aspect: 'vertical',
      desc: 'Slow-cooking fresh, whole milk in massive copper cauldrons (kadahi) to reduce it into rich, grainy khuwa paste.',
      quote: '"Patience yields the perfect texture."'
    },
    {
      id: 2,
      category: 'products',
      title: 'Kaju Katli Perfection',
      aspect: 'horizontal',
      desc: 'Diamond-shaped cashew fudges hand-adorned with delicate, edible pure silver leaf (vark) under perfect lighting.',
      quote: '"The shine of pure celebration."'
    },
    {
      id: 3,
      category: 'festivals',
      title: 'Deepawali Gift Box',
      aspect: 'standard',
      desc: 'A gorgeous, velvet-lined custom sweet gift box wrapped in premium gold foil ribbons, packed with assorted luxury pedas.',
      quote: '"Gifting premium love."'
    },
    {
      id: 4,
      category: 'kitchen',
      title: 'Polished Brass Utensils',
      aspect: 'standard',
      desc: 'Our state-of-the-art kitchen utilizes sterilized traditional brass and copper vessels to preserve authentic mineral flavors.',
      quote: '"Where health meets heritage."'
    },
    {
      id: 5,
      category: 'preparation',
      title: 'Jeri Syrup Glazing',
      aspect: 'vertical',
      desc: 'Deep-fried golden spiral jeris dipped directly into hot, saffron-infused cardamom sugar syrup for a crispy glaze.',
      quote: '"Crisp outside, juicy inside."'
    },
    {
      id: 6,
      category: 'staff',
      title: 'Our Master Halwai',
      aspect: 'horizontal',
      desc: 'Sweet Master Chef Hari Bahadur supervising the morning batch of Lal Mohan. 25+ years of sweet-making experience.',
      quote: '"Craft refined by decades."'
    },
    {
      id: 7,
      category: 'products',
      title: 'Saffron Cream Sandwich',
      aspect: 'standard',
      desc: 'Premium cream sweets consisting of soft chhena sheets loaded with heavy clotted cream and topped with crushed pistachios.',
      quote: '"The luxury dessert tier."'
    },
    {
      id: 8,
      category: 'festivals',
      title: 'Dashain Special Peda',
      aspect: 'standard',
      desc: 'Special thick cardamom pedas prepared specifically for Nepal\'s biggest festival, stamped with traditional floral prints.',
      quote: '"Tastes like home."'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  const getFilterClass = (filterId) => (
    `px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold border transition-all duration-300 ${
      activeFilter === filterId
        ? 'bg-gold text-charcoal border-gold shadow-md'
        : 'bg-cream text-chocolate border-gold/10 hover:bg-gold/5'
    }`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ================= HEADER SECTION ================= */}
      <div className="text-center space-y-4 mb-12">
        <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-bold">
          Visual Heritage
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-coffee font-semibold tracking-wide">
          Artisanal Sweet Boutique Gallery
        </h2>
        <div className="h-[2px] w-20 bg-gold mx-auto" />
        <p className="font-sans text-sm text-chocolate/75 max-w-2xl mx-auto leading-relaxed">
          Step into our kitchen, inspect our cooking processes, and see how our master sweet makers (Halwais) handcraft traditional Nepali and Indian sweets with love.
        </p>
      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button onClick={() => setActiveFilter('all')} className={getFilterClass('all')}>All Albums</button>
        <button onClick={() => setActiveFilter('products')} className={getFilterClass('products')}>Sweets Boutique</button>
        <button onClick={() => setActiveFilter('preparation')} className={getFilterClass('preparation')}>Sweets Cooking</button>
        <button onClick={() => setActiveFilter('kitchen')} className={getFilterClass('kitchen')}>Boutique Kitchen</button>
        <button onClick={() => setActiveFilter('festivals')} className={getFilterClass('festivals')}>Festival Packs</button>
        <button onClick={() => setActiveFilter('staff')} className={getFilterClass('staff')}>Artisan Halwais</button>
      </div>

      {/* ================= MASONRY STYLE GALLERY GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
        {filteredItems.map((item) => {
          let rowSpan = 'row-span-1';
          let colSpan = 'col-span-1';

          if (item.aspect === 'vertical') rowSpan = 'row-span-2';
          if (item.aspect === 'horizontal') colSpan = 'sm:col-span-2';

          return (
            <motion.div
              layout
              key={item.id}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={`${rowSpan} ${colSpan} cursor-pointer group relative overflow-hidden bg-gradient-to-b from-[#2C1810] to-[#161616] border border-gold/15 hover:border-gold/45 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
              
              {/* Premium Luxury Background Pattern for visual style */}
              <div className="absolute inset-0 bg-luxury-bg-pattern opacity-5 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />

              {/* View Overlay Icon */}
              <div className="absolute right-5 top-5 p-2.5 bg-gold text-charcoal rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg scale-90 group-hover:scale-100">
                <FaEye className="w-3.5 h-3.5" />
              </div>

              {/* Top Section */}
              <div className="relative z-10 space-y-2">
                <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-gold font-bold">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-cream tracking-wide group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h4>
              </div>

              {/* Bottom Section */}
              <div className="relative z-10 space-y-3">
                <p className="text-xs text-cream/70 font-sans leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
                <p className="text-[11px] font-serif italic text-gold-light border-t border-gold/15 pt-2.5">
                  {item.quote}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= LIGHTBOX PREVIEW MODAL ================= */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-charcoal/90 backdrop-blur-md"
            />

            {/* Lightbox Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-cream border border-gold/30 p-6 sm:p-10 rounded-3xl w-full max-w-2xl shadow-2xl z-10 text-center space-y-6 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-charcoal text-cream hover:bg-gold hover:text-charcoal rounded-full border border-gold/15 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <span className="text-[10px] font-sans tracking-[0.25em] text-gold bg-charcoal px-4 py-1.5 rounded-full inline-block font-semibold uppercase">
                  {selectedItem.category} Showcase
                </span>
                
                {/* Simulated Premium Photography frame */}
                <div className="w-full aspect-video bg-gradient-to-b from-[#2C1810] to-[#161616] border border-gold/25 rounded-2xl flex flex-col items-center justify-center relative p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
                  <FaImages className="w-12 h-12 text-gold/45 mb-3" />
                  <p className="font-serif italic text-gold text-lg max-w-md">
                    {selectedItem.quote}
                  </p>
                  <p className="text-[10px] text-cream/30 font-sans tracking-widest uppercase mt-4">
                    Roshani Sweet Hotel & Boutique Photography
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="font-serif text-2xl font-bold text-coffee tracking-wide">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-chocolate/80 font-sans leading-relaxed max-w-lg mx-auto">
                  {selectedItem.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/10 flex justify-between items-center text-xs text-chocolate/40 font-sans">
                <span>Roshani Sweet Boutique</span>
                <span>Janakpurdham, Nepal</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
