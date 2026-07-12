import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
//Strict Mode is a tool for highlighting potential problems in an application. 
// Like Fragment, StrictMode does not render any visible UI. 
// It activates additional checks and warnings for its descendants.

//BrowserRouter basically helps us to switch to different pages of the application without doing full
//page reloads. So, whenever the user wishes to load a different page of the website, the URl changes 
// and accordingly instead of reloading the full website and laoding another HTML page, the appropriate
// React component is loaded onto the screen.