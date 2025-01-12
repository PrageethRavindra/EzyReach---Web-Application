// Shop Owner Dashboard Component

import React from 'react';

const ShopOwnerDashboard = () => {
    return (
        <div className="shop-owner-dashboard bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shop Owner Dashboard</h1>

            {/* Dashboard Overview */}
            <section className="dashboard-overview bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Dashboard Overview</h2>
                <div className="stats grid grid-cols-2 gap-4">
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
                        <p className="text-lg">Total Sales</p>
                        <p className="text-2xl font-bold">$0.00</p>
                    </div>
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
                        <p className="text-lg">Active Partnerships</p>
                        <p className="text-2xl font-bold">0</p>
                    </div>
                </div>
                <div className="notifications mt-4">
                    <p className="text-gray-600">No new notifications.</p>
                </div>
            </section>

            {/* Partnership Management */}
            <section className="partnership-management bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Partnership Management</h2>
                <div className="flex gap-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View Partnership Requests</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Active Partnerships</button>
                </div>
            </section>

            {/* Product Management */}
            <section className="product-management bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Management</h2>
                <div className="flex gap-4 flex-wrap">
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add Product</button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Update Product</button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete Product</button>
                    <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Upload Catalog</button>
                </div>
            </section>

            {/* Order Management */}
            <section className="order-management bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Management</h2>
                <div className="flex gap-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View Orders</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Track Delivery</button>
                </div>
            </section>

            {/* Analytics and Reports */}
            <section className="analytics-reports bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analytics and Reports</h2>
                <div className="flex gap-4">
                    <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">View Sales Insights</button>
                    <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">View Partnership Performance</button>
                </div>
            </section>

            {/* Shop Profile Management */}
            <section className="profile-management bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shop Profile Management</h2>
                <div className="flex gap-4">
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Update Shop Details</button>
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Upload Shop Logo/Banner</button>
                </div>
            </section>

            {/* Communication Tools */}
            <section className="communication-tools bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Communication Tools</h2>
                <div className="flex gap-4">
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">Messaging System</button>
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">View Notifications</button>
                </div>
            </section>

            {/* Support and Feedback */}
            <section className="support-feedback bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Support and Feedback</h2>
                <div className="flex gap-4">
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Help Center</button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Submit Feedback</button>
                </div>
            </section>
        </div>
    );
};

export default ShopOwnerDashboard;
