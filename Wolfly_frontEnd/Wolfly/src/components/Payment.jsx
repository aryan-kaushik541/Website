import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

        if (!orderDetails) {
            navigate("/checkout"); // fallback if no order data
            return;
        }

        const initiatePayment = async () => {
            try {
                const response = await fetch('/api/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: orderDetails.totalAmount * 100,
                        currency: 'INR',
                    }),
                });
                const orderData = await response.json();

                const options = {
                    key: 'YOUR_RAZORPAY_KEY_ID',
                    amount: orderData.amount,
                    currency: orderData.currency,
                    order_id: orderData.id,
                    name: 'Your Store Name',
                    description: 'Payment for your order',
                    handler: async (response) => {
                        const verificationRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                ...response,
                            }),
                        });

                        const verificationData = await verificationRes.json();

                        if (verificationData.success) {
                            localStorage.removeItem("products");
                            localStorage.removeItem("orderDetails");
                            navigate("/Order");
                        } else {
                            alert("Payment verification failed");
                            navigate("/checkout");
                        }
                    },
                    prefill: {
                        name: 'User',
                        email: 'user@example.com',
                        contact: orderDetails.mobile,
                    },
                    theme: {
                        color: '#38A169',
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } catch (err) {
                console.error(err);
                alert("Payment initialization failed.");
                navigate("/checkout");
            }
        };

        initiatePayment();
    }, [navigate]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <p className="text-xl">Redirecting to payment gateway...</p>
        </div>
    );
};

export default Payment;
