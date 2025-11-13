import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Press from './pages/Press.jsx'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/press', element: <Press /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
