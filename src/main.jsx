import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register Service Worker for Offline PWA Support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Roshani Menu SW registered:', reg.scope))
      .catch((err) => console.warn('Roshani Menu SW reg failed:', err));
  });
} else if ('serviceWorker' in navigator) {
  // Register in dev mode too for testing offline features
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Roshani Menu SW registered (dev):', reg.scope))
      .catch((err) => console.warn('Roshani Menu SW reg failed:', err));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

