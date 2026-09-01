import React from 'react';
import { motion } from 'framer-motion';
import rchLogo from '../photos/logo/RCH.png';

// Floating 3D Orbs & Levitating Elements
export default function Floating3DScene() {
  const floatingElements = [
    { id: 1, x: '5%', y: '15%', size: 48, duration: 7, delay: 0, text: '🍮' },
    { id: 2, x: '88%', y: '22%', size: 60, duration: 9, delay: 1, text: '✨' },
    { id: 3, x: '82%', y: '70%', size: 52, duration: 8, delay: 2, text: '🥮' },
    { id: 4, x: '8%', y: '78%', size: 56, duration: 10, delay: 1.5, text: '🍯' },
    { id: 5, x: '50%', y: '5%', size: 40, duration: 11, delay: 0.5, text: '👑' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 3D Floating Particles */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [-15, 20, -15],
            x: [-10, 15, -10],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay,
          }}
          style={{ left: el.x, top: el.y }}
          className="absolute flex items-center justify-center opacity-30 hover:opacity-70 transition-opacity"
        >
          <div
            className="rounded-full bg-gradient-to-tr from-gold/20 to-coffee/40 border border-gold/30 backdrop-blur-md flex items-center justify-center text-gold shadow-[0_10px_25px_rgba(212,175,55,0.25)]"
            style={{ width: el.size, height: el.size }}
          >
            <span className="text-xl">{el.text}</span>
          </div>
        </motion.div>
      ))}

      {/* Floating 3D Glowing Ambient Light Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chocolate/20 rounded-full blur-3xl pointer-events-none"
      />
    </div>
  );
}
