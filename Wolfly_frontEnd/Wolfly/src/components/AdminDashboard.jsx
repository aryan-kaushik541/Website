// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await api.get('products/');
                setProducts(productsResponse.data);

                const ordersResponse = await api.get('orders/');
                setOrders(ordersResponse.data);

                const usersResponse = await api.get('users/');
                setUsers(usersResponse.data);

                const categoriesResponse = await api.get('categories/');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {/* Display product, order, user, category lists, forms, and statistics */}
            <h3>Products</h3>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            <h3>Orders</h3>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>Order ID: {order.id}</li>
                ))}
            </ul>
            {/* etc. */}
        </div>
    );
};

export default AdminDashboard;