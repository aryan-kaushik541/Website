import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Order = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace '/api/orders/' with your actual backend API endpoint to fetch order details
                const response = await fetch(`/api/orders/${orderId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div className="min-h-screen bg-gray-100 py-6 flex justify-center items-center">Loading order details...</div>;
    }

    if (error) {
        return <div className="min-h-screen bg-gray-100 py-6 flex justify-center items-center text-red-500">Error loading order: {error}</div>;
    }

    if (!order) {
        return <div className="min-h-screen bg-gray-100 py-6 flex justify-center items-center">Order not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex justify-center items-center">
            <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Details</h2>

                <div className="border-b pb-4 mb-4">
                    <p className="text-gray-700">
                        <span className="font-semibold">Order ID:</span> {order.id || order._id} {/* Assuming your order object has 'id' or '_id' */}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Order Date:</span> {new Date(order.created_at || order.order_date).toLocaleDateString()} {/* Adjust property name */}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Payment Method:</span> {order.payment_method}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Payment Status:</span> {order.payment_status}
                    </p>
                </div>

                <div className="border-b pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Shipping Address</h3>
                    <p className="text-gray-700">{order.shipping_address}</p>
                    <p className="text-gray-700">Mobile: {order.mobile_number}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Items</h3>
                    {order.order_items && order.order_items.map((item) => (
                        <div key={item.product_id} className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center">
                                <img
                                    src={`http://127.0.0.1:8000/${item.front_imges}`} {/* Adjust path as needed */}
                                    alt={item.title}
                                    className="w-16 h-16 rounded-md mr-4 object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="text-gray-700">₹{item.price * item.quantity}</p>
                        </div>
                    ))}
                    <div className="pt-4">
                        <p className="flex justify-between font-semibold text-gray-800">
                            <span>Total Amount:</span>
                            <span>₹{order.total_price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;