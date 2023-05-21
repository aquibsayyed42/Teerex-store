import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Grid, IconButton, Stack } from '@mui/material';
import { Remove, Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack'

function ShoppingCart({ cartItems, removeFromCart }) {
  const [quantities, setQuantities] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const updatedQuantities = {};
    cartItems.forEach((item) => {
      updatedQuantities[item.id] = quantities[item.id] || 1;
    });
    setQuantities(updatedQuantities);
  }, [cartItems]);

  const increaseQuantity = (itemId) => {
    if (quantities[itemId] < 5) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 1) + 1,
      }));
    } else {
      enqueueSnackbar("Max limit reached", {
        variant: "warning",
        autoHideDuration: 1500,
      });
    }
  };

  const decreaseQuantity = (itemId) => {
    if (quantities[itemId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    } else {
      removeFromCart(itemId);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const quantity = quantities[item.id] || 1;
      total += item.price * quantity;
    });
    return total;
  };

  const buyProduct = async () => {
    enqueueSnackbar(
      "Success. Redirecting to Homepage",
      {
        variant: "success",
        autoHideDuration: 2500
      }
    );

    setTimeout(function () {
      window.location.replace("/");
    }, 1000);
  }

  return (
    <main>
    <Box p={2} pl={4}>
      <Typography variant="h4" pt={2}>Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6" pt={1}>Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2} p={2}>
          <Stack direction="column">
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} mt={4} key={item.id}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <img src={item.imageURL} alt={item.name} style={{ width: 100, height: 100 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1">Price: {item.price}</Typography>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <IconButton onClick={() => decreaseQuantity(item.id)}>
                        <Remove />
                      </IconButton>
                      <Typography variant="body1">{quantities[item.id] || 1}</Typography>
                      <IconButton onClick={() => increaseQuantity(item.id)}>
                        <Add />
                      </IconButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </Grid>
                </Grid>

              </Grid>
            ))}
            <Grid item xs={12} sx={{ pt: "2" }}>
              <Typography variant="h6" pt={3} pb={2}>Total: {calculateTotal()}</Typography>
              <Button variant="contained" pt={2} onClick={async () => { await buyProduct(); }}>Buy</Button>
            </Grid>
          </Stack>
        </Grid>
      )}
    </Box>
    </main>
  );
}

export default ShoppingCart;