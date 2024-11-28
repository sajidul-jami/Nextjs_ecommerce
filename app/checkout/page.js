'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  const { clearCart } = useCart();

  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [useExistingLocation, setUseExistingLocation] = useState(false); // Default to false initially

  useEffect(() => {
    // Parse the "products" query parameter
    const productsParam = searchParams.get('products');
    if (!productsParam) {
      alert('No products selected!');
      router.push('/cart');
      return;
    }

    try {
      const parsedProducts = JSON.parse(decodeURIComponent(productsParam));
      if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
        throw new Error();
      }
      setProducts(parsedProducts);

      // Determine default delivery location and selection
      if (user?.location) {
        setDeliveryLocation(user.location);
        setUseExistingLocation(true); // Default to existing location when it exists
      } else {
        setUseExistingLocation(false); // Default to new location when no existing location
      }
    } catch (error) {
      console.error('Error parsing products:', error);
      alert('Invalid product data!');
      router.push('/cart');
    }
  }, [searchParams, router, user]);

  const handleSubmit = async () => {
    try {
      const salesDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const validUserId = user?.id || 1;

      // Prepare the product data in the form of { id, quantity } pairs
      const productsData = products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));

      if (!deliveryLocation.trim()) {
        alert('Please provide a valid delivery location.');
        return;
      }

      // Send the product details along with delivery location
      const response = await fetch('http://localhost:3005/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: validUserId,
          products: productsData,
          sales_date: salesDate,
          location: deliveryLocation,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      alert('Purchase confirmed!');
      clearCart(); // Clear the cart after successful purchase
      router.push('/'); // Redirect to home page or confirmation page
    } catch (error) {
      console.error('Error while processing purchase:', error);
      alert('An error occurred while confirming the purchase.');
    }
  };

  if (!products.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-auto w-auto p-4 bg-purple-100 rounded-md m-[10px] flex flex-col text-black">
      <h1 className="text-2xl mb-4">Checkout</h1>
      {products.map((product) => (
        <div key={product.id} className="flex flex-col mb-4">
          <h2 className="text-xl">Name: {product.name}</h2>
          <p>Price: ৳{product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}

      <h2 className="text-xl mt-6">Delivery Location</h2>
      <div className="mb-4">
        {user?.location ? (
          <>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={useExistingLocation}
                onChange={() => {
                  setUseExistingLocation(true);
                  setDeliveryLocation(user.location);
                }}
              />
              <span>Use Existing Location: {user.location}</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                checked={!useExistingLocation}
                onChange={() => {
                  setUseExistingLocation(false);
                  setDeliveryLocation(''); // Clear the delivery location for new entry
                }}
              />
              <span>Use a New Location:</span>
            </label>
            {!useExistingLocation && (
              <textarea
                className="w-full p-2 border rounded mt-2"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="Enter new delivery location"
              />
            )}
          </>
        ) : (
          <textarea
            className="w-full p-2 border rounded mt-2"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder="Enter new delivery location"
          />
        )}
      </div>

      <div className="flex justify-start">
        <button
          onClick={handleSubmit}
          className="py-2 px-4 bg-green-500 text-white rounded-md"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default function WrappedCheckoutPage() {
  return (
    <React.Suspense fallback={<p>Loading checkout...</p>}>
      <CheckoutPage />
    </React.Suspense>
  );
}
