'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart } = useCart(); // Access removeFromCart from context
  const [selectedItems, setSelectedItems] = useState([]);
  const router = useRouter();

  // Function to toggle selection of items
  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId)); // Deselect the item
    } else {
      setSelectedItems([...selectedItems, itemId]); // Select the item
    }
  };

  // Assuming `user` is coming from a context or authentication state
  const user = true; // Replace this with actual user check (e.g., context or state)

  const handleBuyNow = () => {
    if (!user) {
      alert("You need to be logged in to make a purchase!");
      router.push("/login_signup/login");  // Redirect to the login page
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one item to purchase.');
      return;
    } else {
      // Filter all selected items from the cart
      const selectedProducts = cart.filter((item) => selectedItems.includes(item.id));

      // Map through selected products and build query string for all items
      const itemParams = selectedProducts.map(item => 
        `id=${encodeURIComponent(item.id)}&name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&quantity=${encodeURIComponent(item.quantity)}`
      ).join('&');
      console.log(itemParams);

      // Redirect to the checkout page with all selected items
      router.replace(`/checkout?${itemParams}`);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white py-10 px-6">
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
                    onClick={() => removeFromCart(item.id)} // Call removeFromCart when clicked
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
            {cart.reduce((total, item) => {
              if (selectedItems.includes(item.id)) {
                return total + item.price * item.quantity;
              }
              return total;
            }, 0)}
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
