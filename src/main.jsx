
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './router/router.jsx'



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
