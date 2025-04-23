import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Import RMWC base styles for Material Design Web Components
import 'rmwc/styles'
// Import TabBar and Tab styles
import '@rmwc/tabs/styles'
// Import List styles for mobile collapsible list
import '@rmwc/list/styles'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
