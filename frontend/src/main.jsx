import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Import RMWC base styles for Material Design Web Components
import 'rmwc/styles'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
