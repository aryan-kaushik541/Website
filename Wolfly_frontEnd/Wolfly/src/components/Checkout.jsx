import React, { useState, useEffect } from "react";
import Address from "./Address";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const Checkout = () => {
    const { slug } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [shippingCharge, setShippingCharge] = useState(40);
    const [deliveryCharge, setDeliveryCharge] = useState(60);
    const [showPayment, setShowPayment] = useState(true);
    const [totalProductPrice, setTotalProductPrice] = useState(0);
    const [singleProduct, setSingleProduct] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("online"); // Default to online payment
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        try {
            let parsedCart = [];
            let productTotal = 0;

            if (slug) {
                const slugList = slug.split(',');
                const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

                slugList.forEach((singleSlug) => {
                    const product = storedProducts.find((p) => p.slug === singleSlug);
                    if (product) {
                        parsedCart.push({ ...product, quantity: 1 });
                        productTotal += product.discount_price || 0;
                    }
                });

                if (parsedCart.length === 1) {
                    setSingleProduct(parsedCart[0]);
                } else {
                    setSingleProduct(null);
                }
            } else {
                const storedCart = localStorage.getItem("products");
                parsedCart = storedCart ? JSON.parse(storedCart) : [];
                productTotal = parsedCart.reduce(
                    (acc, item) => acc + (item.discount_price || 0) * (item.quantity || 1),
                    0
                );
                setSingleProduct(null);
            }

            setCart(parsedCart);
            setTotalProductPrice(productTotal);

        } catch (error) {
            console.error("Error parsing cart data:", error);
            setCart([]);
            setTotalProductPrice(0);
        }
    }, [slug]);

    const getTotalPrice = () => {
        return totalProductPrice + shippingCharge + deliveryCharge;
    };

    const handlePlaceOrder = async () => {
        if (!address || !mobile) {
            setErrorMessage("Please provide address and mobile number.");
            return;
        }

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
                            navigate("/order-success"); // Redirect to success page
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
            try {
                // Send order details to your backend to create a COD order
                const orderData = {
                    products: cart.map(item => ({
                        product_id: item.id,
                        quantity: item.quantity,
                        price: item.discount_price,
                    })),
                    total_price: getTotalPrice(),
                    shipping_address: address,
                    mobile_number: mobile,
                    payment_method: "COD",
                };

                 const response = await fetch('/api/place-order', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
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

    return (
        <div className="min-h-screen bg-white p-6 flex justify-center items-center">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 border border-gray-200">

                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">🛒 Checkout</h2>

                <div className="border-b pb-6 mb-6">
                    {cart.length === 0 ? (
                        <p className="text-red-600 text-center text-lg">Your cart is empty!</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex flex-col border-b py-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`http://127.0.0.1:8000/${item.front_imges}`}
                                            alt={item.title}
                                            className="w-20 h-20 rounded-lg shadow-md"
                                        />
                                        <div>
                                            <p className="font-bold text-lg">{item.title}</p>
                                            <p className="text-gray-600">
                                                ₹{item.discount_price} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-lg text-green-600">
                                        ₹{item.discount_price * item.quantity}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-700">{item.decription}</p>
                                    <p className="text-sm text-gray-700">Details: {item.details}</p>
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
        </div>
    );
};

export default Checkout;