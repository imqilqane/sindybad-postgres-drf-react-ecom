import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from  './components/Home/Home.jsx'
import SingleProduct from './components/SingleProduct/SingleProduct'
import Cart from  './components/Cart/Cart'
import Address from './components/Checkout/Address'
import Singin from './components/Singin/Singin'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product/:slug' element={<SingleProduct/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/checkout/add-shipping-info' element={<Address/>}></Route>
          <Route path='/sing-in' element={<Singin/>}></Route>

        </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();