import { render, screen } from '@testing-library/react';
import App from './App';
import Navbar from './Navbar';
import ShoppingCart from './ShoppingCart';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Navbar component', () => {
  render(<Navbar cartItems={[]} />);
  const navElement = screen.getByText(/TeeRex Store/i);
  expect(navElement).toBeInTheDocument();
});

test('renders ShoppingCart component', () => {
  render(<ShoppingCart cartItems={[]} removeFromCart={() => {}} />);
  const cartElement = screen.getByText(/Shopping Cart/i);
  expect(cartElement).toBeInTheDocument();
});