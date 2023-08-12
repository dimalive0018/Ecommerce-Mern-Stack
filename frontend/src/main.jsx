import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/Auth.jsx'
import { SearchProvider } from './context/Search.jsx';
import { CartProvider } from './context/Cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <React.StrictMode>
            <Layout>
              <App />
            </Layout>
            <Toaster
              toastOptions={{
                duration: 2000,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </React.StrictMode>
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
)