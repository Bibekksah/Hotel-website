import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload, FaWifi, FaMobileAlt, FaCheck, FaCopy } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';

export default function QRCodeModal({ isOpen, onClose }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const menuUrl = new URL('/menu', window.location.origin).toString();
      setCurrentUrl(menuUrl);

      // Generate standard, camera-scannable QR code
      QRCode.toDataURL(menuUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: '#161616',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      })
        .then((url) => {
          setQrDataUrl(url);
        })
        .catch((err) => {
          console.error('QR code generation error:', err);
        });
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const downloadLink = document.createElement('a');
    downloadLink.download = 'Roshani_Chaat_House_Menu_QR.png';
    downloadLink.href = qrDataUrl;
    downloadLink.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-cream border border-gold/30 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-charcoal/30 hover:bg-gold text-cream hover:text-charcoal transition-all duration-300 border border-gold/15"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center space-x-1.5 bg-gold/15 border border-gold/30 px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest text-gold uppercase">
              <FaWifi className={isOnline ? 'text-green-600' : 'text-amber-600'} />
              <span>{isOnline ? 'Online • Ready to Sync' : 'Offline Mode Active'}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-coffee tracking-wide">
              Scan for Offline Menu Access
            </h3>
            <p className="text-xs text-chocolate/75 font-sans leading-relaxed">
              Scan this QR code with any phone camera to open and browse the full menu instantly.
            </p>
          </div>

          {/* QR Code Container Plate */}
          <div className="bg-gradient-to-b from-[#2C1810] to-[#161616] border-2 border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-inner mb-6">
            {/* Real Camera-Scannable QR Code */}
            <div className="bg-white p-3 rounded-xl shadow-2xl relative border-2 border-gold/40 flex items-center justify-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Roshani Chaat House Menu QR Code"
                  className="w-52 h-52 object-contain"
                />
              ) : (
                <div className="w-52 h-52 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                </div>
              )}
            </div>

            <span className="font-sans text-[10px] tracking-widest uppercase text-gold/80 font-bold mt-4">
              Roshani Chaat House • Golbazar
            </span>
          </div>

          {/* Offline Usage Instructions */}
          <div className="bg-beige border border-gold/15 p-4 rounded-xl space-y-2 mb-6">
            <h4 className="font-serif text-xs text-coffee font-bold tracking-wider uppercase flex items-center space-x-1.5">
              <FaMobileAlt className="text-gold" />
              <span>How to Use Without Internet:</span>
            </h4>
            <ol className="text-[11px] text-chocolate/80 space-y-1.5 font-sans list-decimal list-inside pl-1">
              <li><strong>Scan</strong> the QR code above using your mobile camera or Google Lens.</li>
              <li>Tap <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong> in your browser menu.</li>
              <li>Open the app anytime – <strong>works 100% offline</strong> without Wi-Fi or mobile data!</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDownloadQR}
              className="flex-1 bg-gradient-to-r from-coffee to-chocolate hover:from-gold hover:to-gold-light hover:text-coffee border border-gold/30 text-cream py-3 rounded-xl font-sans text-xs tracking-wider uppercase font-bold flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <FaDownload className="w-3.5 h-3.5" />
              <span>Download QR</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="px-4 bg-white hover:bg-gold/10 border border-gold/25 text-chocolate py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
              title="Copy link"
            >
              {copied ? <FaCheck className="text-green-600 w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Link'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
