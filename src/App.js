import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import { useSnackbar } from 'notistack'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = (product) => {
    if (cartItems.includes(product)) {
      enqueueSnackbar(
        "Product already in cart",
        {
          variant: "none",
          autoHideDuration: 1500
        }
      );
    }
    else {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path='/' element={<ProductCatalog addToCart={addToCart} />} />
        <Route path='/cart' element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
