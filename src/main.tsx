import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  // Immediately register service worker for background and web push notifications
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((reg) => {
      console.log('OrderVerify Service Worker registered:', reg.scope);
      reg.update().catch(() => {});
    }).catch((err) => {
      console.warn('Service Worker registration warning:', err);
    });
  }

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = String(event.reason?.message || event.reason || '');
    if (reasonStr.includes('Pending promise was never set')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msgStr = String(event.message || event.error?.message || '');
    if (msgStr.includes('Pending promise was never set')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return true;
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

