import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Select, MenuItem, Grid, Button, Card, CardMedia, CardContent, Typography, Stack } from '@mui/material';

function ProductCatalog({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ color: '', type: '', price: '' });

  useEffect(() => {
    // Fetch products from API
    fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const { name, color, type, price } = product;
    const searchKeywords = searchText.toLowerCase().split(' ');
    const nameMatch = searchKeywords.some((keyword) => name.toLowerCase().includes(keyword));
    const colorMatch = !filters.color || color.toLowerCase() === filters.color.toLowerCase();
    const typeMatch = !filters.type || type.toLowerCase() === filters.type.toLowerCase();
    const priceMatch =
      !filters.price ||
      (filters.price === '0-250' && price >= 0 && price <= 250) ||
      (filters.price === '251-450' && price >= 251 && price <= 450) ||
      (filters.price === '450+' && price > 450);
    return nameMatch && colorMatch && typeMatch && priceMatch;
  });

  return (
    <section>
      <TextField
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search for Products"
        fullWidth
      />
      <Grid container my={3} justifyContent="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Grid>
            <FormControl fullWidth>
              <Select name="color" displayEmpty value={filters.color} onChange={handleFilterChange}>
                <MenuItem value="">All Colors</MenuItem>
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select name="type" displayEmpty value={filters.type} onChange={handleFilterChange}>
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Basic">Basic</MenuItem>
                <MenuItem value="Polo">Polo</MenuItem>
                <MenuItem value="Hoodie">Hoodie</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select name="price" displayEmpty value={filters.price} onChange={handleFilterChange}>
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="0-250">0 - 250</MenuItem>
                <MenuItem value="251-450">251 - 450</MenuItem>
                <MenuItem value="450+">450+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Stack>
      </Grid>
      <Grid container px={6}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} p={3}>
            <Card variant="outlined" p={3}>
              <CardMedia component="img" src={product.imageURL} alt={product.name} height="340" />
              <CardContent sx={{ pb: 0 }}>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body1"> Rs {product.price}</Typography>
              </CardContent>
              <Button sx={{ m: 2 }} variant="contained" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

export default ProductCatalog;