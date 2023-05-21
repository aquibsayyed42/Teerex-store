import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar({ cartItems }) {
  return (
    <nav>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            TeeRex Store
          </Link>
        </Typography>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Button sx={{ pr: 2 }} style={{ color: 'white' }}><h4>Home</h4></Button>
        </Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
          <Button sx={{ p: 2 }} style={{ color: 'white' }} startIcon={<ShoppingCartIcon />}>
            <h4>Cart</h4>
            <sup><Badge badgeContent={cartItems.length} color="secondary" sx={{ marginLeft: '0.7rem', bottom: 6 }} /></sup>
          </Button>
        </Link>

      </Toolbar>
    </AppBar>
    </nav>
  );
}

export default Navbar;