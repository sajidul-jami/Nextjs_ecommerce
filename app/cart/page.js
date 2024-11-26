'use client';

import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div style={{ marginTop: '20px', padding: '20px' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
    </div>
  );
}
