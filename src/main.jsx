import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./i18n/i18nConfig.js"
import { RouterProvider } from 'react-router-dom'
import router from './routing/routes.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
