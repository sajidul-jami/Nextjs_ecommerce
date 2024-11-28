'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext'; // Assuming you have this context to manage user login

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { user } = useUser(); // Get the user data from UserContext
  const [selectedItems, setSelectedItems] = useState([]);
  const router = useRouter();

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('You must be logged in to proceed to checkout.');
      router.push('login_signup/login'); // Redirect to login page if not logged in
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one item to purchase.');
      return;
    }

    const selectedProducts = cart.filter((item) => selectedItems.includes(item.id));
    console.log(selectedProducts);
    router.push(`/checkout?products=${encodeURIComponent(JSON.stringify(selectedProducts))}`);
  };

  return (
    <div className="bg-black text-white py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">The cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-200">{item.name}</h3>
                    <p className="text-gray-400">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-semibold text-gray-200 mr-4">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-2xl font-bold text-gray-200">
            Total: $
            {cart.reduce(
              (total, item) =>
                selectedItems.includes(item.id) ? total + item.price * item.quantity : total,
              0
            )}
          </h3>
          <div className="flex justify-start mt-8">
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
