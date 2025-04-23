import React, { useState, useEffect, useContext } from "react";
import Address from "./Address";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import emptyCart from '../Images/cart.png';

import { useGetCartItemQuery, useDeleteCartItemMutation, useUpdateCartItemQuantityMutation,useGetAddressQuery } from "../services/userAuthApi";
import { Appstate } from "../App";
import { getToken } from "../services/LocalStorageToken";
import { ToastContainer, toast } from "react-toastify";

const Checkout = () => {
    const useAppState = useContext(Appstate);
    const { slug } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [shippingCharge, setShippingCharge] = useState(40);
    const [deliveryCharge, setDeliveryCharge] = useState(60);
    const [showPayment, setShowPayment] = useState(true);
    const [product, setProduct] = useState(true);
    const [totalProductPrice, setTotalProductPrice] = useState(0);
    const [singleProduct, setSingleProduct] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("online"); // Default to online payment
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { access_token } = getToken();
    const { data: cartData, error,refetch } = useGetCartItemQuery(access_token);
    const { data:getAddress, error:add_error,refetch:add_refatch } = useGetAddressQuery(access_token);
    const [deleteCartItem] = useDeleteCartItemMutation(access_token);
    const [updatetoquantity] = useUpdateCartItemQuantityMutation(access_token)
  
    



    


    useEffect(() => {
        
        if (cartData) {
           
            setCartItems(cartData);
            const totalPrice = cartData.reduce((acc, item) => acc + (item.product.discount_price * item.quantity), 0);
            setTotalProductPrice(totalPrice);
            useAppState.setAddCartLength(cartData.length)
            refetch();
        }
    }, [cartData]);

    const getTotalPrice = () => {
        return totalProductPrice + shippingCharge + deliveryCharge;
    };

    const handleRemoveItem = async (itemId) => {

        try {
            await deleteCartItem({ itemId, access_token });
            // After successful deletion, update the cart state
            const updatedCart = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCart);

            // Update total price after state update
            setTotalProductPrice(updatedCart.reduce((acc, item) => acc + (item.product.discount_price * item.quantity), 0));
            useAppState.setAddCartLength(updatedCart.length)
            refetch();
        } catch (error) {
            console.error("Error deleting item:", error);
        }

    }
    const handlePlaceOrder = async () => {
        // if (!address || !mobile) {
        //     setErrorMessage("Please provide address and mobile number.");
        //     return;
        // }

        if (paymentMethod === "online") {
            // --- Online Payment Integration (Conceptual) ---
            setIsLoading(true);
            setErrorMessage("");
            try {
                // In a real application, you would send order details to your backend
                // and initiate the payment process with the chosen gateway.
                // For example, using Razorpay:
                const response = await fetch('/api/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: getTotalPrice() * 100, // Amount in paise
                        currency: 'INR',
                        // ... other order details
                    }),
                });
                const orderData = await response.json();

                const options = {
                    key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual key
                    amount: orderData.amount,
                    currency: orderData.currency,
                    order_id: orderData.id,
                    name: 'Your Store Name',
                    description: 'Payment for your order',
                    // image: 'URL_TO_YOUR_LOGO',
                    handler: async (response) => {
                        // Payment successful, verify signature on the backend
                        const verificationResponse = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                // ... other order details
                            }),
                        });
                        const verificationData = await verificationResponse.json();
                        if (verificationData.success) {
                            localStorage.removeItem("products"); // Clear cart
                            navigate("/Order"); // Redirect to success page
                        } else {
                            setErrorMessage("Payment failed. Please try again.");
                        }
                        setIsLoading(false);
                    },
                    prefill: {
                        name: 'User Name', // You might want to get this from user info
                        email: 'user@example.com', // Same here
                        contact: mobile,
                    },
                    theme: {
                        color: '#38A169',
                    },
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } catch (error) {
                console.error("Error initiating online payment:", error);
                setErrorMessage("Failed to initiate online payment.");
                setIsLoading(false);
            }
            // --- End Online Payment Integration ---
        } else if (paymentMethod === "cod") {
            // --- Cash on Delivery Logic ---
            setIsLoading(true);
            setErrorMessage("");
            console.log(cartItems)
            try {
                // Send order details to your backend to create a COD order
                const orderData = {
                    address_id:1,
                    product:cartItems.map(item => ({
                        "slug":item.product.slug,"quantity":item.quantity
                    })),
                    
                };
                console.log(orderData)
                const response = await fetch('http://127.0.0.1:8000/orders/createorder/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization':`Bearer ${access_token}`
                     },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    localStorage.removeItem("products"); // Clear cart
                    navigate("/Order"); // Redirect to success page
                } else {
                    const errorData = await response.json();
                    setErrorMessage(`Failed to place COD order: ${errorData.message || 'Something went wrong'}`);
                }
            } catch (error) {
                console.error("Error placing COD order:", error);
                setErrorMessage("Failed to place COD order.");
            } finally {
                setIsLoading(true);
            }
            //-- End Cash on Delivery Logic ---
        }
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // product increment
    const increment = async (currElement) => {

        const itemId = currElement.id;
        const quantity = currElement.quantity + 1;
        await updatetoquantity({ itemId, quantity, access_token });

        // After successful update, refetch cart items to reflect changes
        const updatedCart = cartData.map(item => item.id === itemId ? { ...item, quantity } : item);
        setCartItems(updatedCart);
        

        let total =0
        updatedCart.map((item)=>{
            total+=(item.product.discount_price*item.quantity)
            
        })
        setTotalProductPrice(total)
    
        

    }
    // product increment
    const decrement = async (currElement) => {
        
         
        const itemId = currElement.id;

        const quantity = currElement.quantity - 1;
     
        if (!quantity==0){
            await updatetoquantity({ itemId, quantity, access_token });

            // After successful update, refetch cart items to reflect changes
            const updatedCart = cartData.map(item => item.id === itemId ? { ...item, quantity } : item);
            setCartItems(updatedCart);
            let total =0
            updatedCart.map((item)=>{
                total+=(item.product.discount_price*item.quantity)
                
            })
            setTotalProductPrice(total)
        }

        
           
       
    }
    return (

        <div className="min-h-screen bg-white p-6 flex justify-center items-center">
            {
                cartItems.length !== 0 ?
                    <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 border border-gray-200">

                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">🛒 Checkout</h2>

                        <div className="border-b pb-6 mb-6">
                            {cartItems.length === 0 ? (
                                <p className="text-red-600 text-center text-lg">Your cart is empty!</p>
                            ) : (
                                cartItems.map((item) => (

                                    <div key={item.id} className="flex flex-col border-b py-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={`http://127.0.0.1:8000/${item.product.front_imges}`}
                                                    alt={item.product_title}
                                                    className="w-20 h-20 rounded-lg shadow-md"
                                                />
                                                <div>
                                                    <p className="font-bold text-lg">{item.product.title}</p>
                                                    <p className="text-gray-600">
                                                        ₹{item.product.discount_price} x {item.quantity}
                                                    </p>
                                                </div>
                                                <div className='grid items-center grid-cols-3 my-3 mx-0 border-2 border-gray-500 rounded-lg'>

                                                    <button className='py-1 px-4 font-bold border-r-2 border-gray-500  text-lg' onClick={() => decrement(item)} >-</button>

                                                    <p className='py-1 px-4 text-center text-lg'>{item.quantity}</p>

                                                    <button className='py-1 px-4 font-bold border-l-2 border-gray-500 text-lg' onClick={() => increment(item)} >+</button>

                                                </div>


                                            </div>
                                            <p className="font-bold text-lg text-green-600">
                                                ₹{item.product.discount_price * item.quantity}
                                            </p>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-700">Brand Name: {item.product.brand.name}</p>
                                        </div>

                                    </div>
                                ))
                            )}
                        </div>

                        <Address address={address} setAddress={setAddress} mobile={mobile} setMobile={setMobile} />

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Payment Method:
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="online"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={handlePaymentMethodChange}
                                    className="mr-2"
                                />
                                <label htmlFor="online" className="mr-4">Online Payment</label>

                                <input
                                    type="radio"
                                    id="cod"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={handlePaymentMethodChange}
                                    className="mr-2"
                                />
                                <label htmlFor="cod">Cash on Delivery</label>
                            </div>
                        </div>

                        <div className="border-t pt-6 text-lg">
                            {singleProduct ? (
                                <>
                                    <p className="flex justify-between font-semibold text-gray-700">
                                        <span>Product Price:</span> <span className="text-gray-800">₹{singleProduct.discount_price?.toLocaleString('en-IN') || '0.00'}</span>
                                    </p>
                                    <p className="flex justify-between font-semibold text-gray-700">
                                        <span>🚚 Shipping Charge:</span> <span className="text-green-600">₹{shippingCharge}</span>
                                    </p>
                                    <p className="flex justify-between font-semibold text-gray-700">
                                        <span>📦 Delivery Charge:</span> <span className="text-green-600">₹{deliveryCharge}</span>
                                    </p>
                                    <p className="flex justify-between text-2xl font-bold mt-4 text-gray-800">
                                        <span>💰 Total Price:</span> <span className="text-green-700">₹{(singleProduct.discount_price + shippingCharge + deliveryCharge)?.toLocaleString('en-IN') || '0.00'}</span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="flex justify-between font-semibold text-gray-700">
                                        <span>Product Total:</span> <span className="text-gray-800">₹{totalProductPrice?.toLocaleString('en-IN') || '0.00'}</span>
                                    </p>
                                    <p className="flex justify-between font-semibold text-gray-700">
                                        <span>🚚 Shipping Charge:</span> <span className="text-green-600">₹{shippingCharge}</span>
                                    </p>
                                    <p className="flex justify-between font-semibold text-gray-700">
                                        <span>📦 Delivery Charge:</span> <span className="text-green-600">₹{deliveryCharge}</span>
                                    </p>
                                    <p className="flex justify-between text-2xl font-bold mt-4 text-gray-800">
                                        <span>💰 Total Price:</span> <span className="text-green-700">₹{getTotalPrice()?.toLocaleString('en-IN') || '0.00'}</span>
                                    </p>
                                </>
                            )}
                        </div>

                        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                        <button
                            className={`w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 mt-6 rounded-lg text-xl shadow-md transform transition hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handlePlaceOrder}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : `✅ Place Order with ${paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}`}
                        </button>

                    </div>
                    :
                    <div className="flex justify-center items-center h-96">
                        <img src={emptyCart} alt="Empty Cart" className="w-64 opacity-50" />
                    </div>
            }
        </div>

    );

};

export default Checkout;