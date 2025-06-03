import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Import RMWC base styles for Material Design Web Components
import 'rmwc/styles'
// Import Icon styles
import '@rmwc/icon/styles'
// Import TabBar and Tab styles
import '@rmwc/tabs/styles'
// Import List styles for mobile collapsible list
import '@rmwc/list/styles'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Register service worker for caching articles.json
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      // Ask the service worker to check for new articles after registration
      setTimeout(() => {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage('checkForNewArticles');
        }
      });
      // Listen for update notification
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'articles-updated') {
          // Optionally, reload or notify user
          console.log('New articles data available.');
          // You could show a toast or reload articles here
        }
      });
    });
  });
}
