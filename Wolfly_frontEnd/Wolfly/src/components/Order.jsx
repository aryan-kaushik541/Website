import React from "react";
import { useSelector } from "react-redux";
import { getToken } from "../services/LocalStorageToken";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const OrderPage = () => {
  const { access_token } = getToken();
  const cartItems = useSelector((state) => state.cart.items);
  const selectedAddress = useSelector((state) => state.address.selected); // assuming Redux

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/place-order/",
        {
          address_id: selectedAddress.id,
          items: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Shipping Address:</h3>
        <p>{selectedAddress.village_or_town}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
        <p>{selectedAddress.country} 📞 {selectedAddress.phone}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Items:</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-semibold mt-2">Total: ₹{totalPrice}</div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderPage;
