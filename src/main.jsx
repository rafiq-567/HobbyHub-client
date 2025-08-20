import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'

// --- Import Toastify components and CSS ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// --- End Toastify Imports ---



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
     <ToastContainer
      position="top-right" // You can change this to 'bottom-left', 'top-center', etc.
      autoClose={5000}    // Toasts will disappear after 5 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // 'light', 'dark', or 'colored'
    />
  </StrictMode>,
)
