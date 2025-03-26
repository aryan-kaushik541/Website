import React, { useState, useEffect } from "react";
import Address from "./Address"; // Import Address Component

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [shippingCharge, setShippingCharge] = useState(50);
  const [deliveryCharge, setDeliveryCharge] = useState(20);

  useEffect(() => {
    // Fetch cart from localStorage (Simulating a cart system)
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const getTotalPrice = () => {
    const productTotal = cart.reduce((acc, item) => acc + item.discount_price * item.quantity, 0);
    return productTotal + shippingCharge + deliveryCharge;
  };

  const handlePlaceOrder = () => {
    if (!address || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }
    alert("Order placed successfully!");
    localStorage.removeItem("cart"); // Clear cart after order
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>

        {/* Product Summary */}
        <div className="border-b pb-4 mb-4">
          {cart.length === 0 ? (
            <p className="text-red-600">Your cart is empty!</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-2">
                <div className="flex items-center gap-4">
                  <img src={item.front_imges} alt={item.title} className="w-16 h-16 rounded-lg" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-600">₹{item.discount_price} x {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{item.discount_price * item.quantity}</p>
              </div>
            ))
          )}
        </div>

        {/* Address Section */}
        <Address address={address} setAddress={setAddress} mobile={mobile} setMobile={setMobile} />

        {/* Pricing Summary */}
        <div className="border-t pt-4">
          <p className="flex justify-between text-lg font-semibold">
            <span>Shipping Charge:</span> <span>₹{shippingCharge}</span>
          </p>
          <p className="flex justify-between text-lg font-semibold">
            <span>Delivery Charge:</span> <span>₹{deliveryCharge}</span>
          </p>
          <p className="flex justify-between text-xl font-bold mt-2">
            <span>Total Price:</span> <span>₹{getTotalPrice()}</span>
          </p>
        </div>

        {/* Place Order Button */}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 mt-4 rounded-lg text-lg"
          onClick={handlePlaceOrder}
        >
          ✅ Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
