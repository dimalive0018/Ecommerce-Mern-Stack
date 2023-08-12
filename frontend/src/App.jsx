import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PageNotFound from './pages/NotFound'
import Sign from './pages/Sign'
import Dashboard from './pages/User/Dash'
import PrivateRoute from './components/Routes/Private'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDash'
import PrivateRouteAdmin from './components/Routes/Admin'
import Search from './pages/Search'
import Product from './pages/Product'
import Category from './pages/Category'
import Cart from './pages/Cart'
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product/:slug' element={<Product />} />
        <Route path='/categories/:slug' element={<Category />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='dashboard/user' element={<Dashboard />} />
        </Route>
        <Route path='/' element={<PrivateRouteAdmin />}>
          <Route path='dashboard/admin' element={<AdminDashboard />} />
        </Route>
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </HelmetProvider>
  )
}