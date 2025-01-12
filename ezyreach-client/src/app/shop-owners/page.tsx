"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const featureList = [
  "Dashboard Overview",
  "Partnership Management",
  "Product Management",
  "Order Management",
  "Analytics and Reports",
  "Shop Profile Management",
  "Communication Tools",
  "Support and Feedback",
];

const ShopOwnerDashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState(featureList[0]);
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Popup state
  const router = useRouter();

  const handleLogout = () => {
    try {
      if (confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const renderFeature = () => {
    switch (selectedFeature) {
      case "Dashboard Overview":
        return (
          <section className="dashboard-overview bg-gray-800 text-gray-100 shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-semibold text-blue-400 mb-4">
              Dashboard Overview
            </h2>
            <div className="stats grid grid-cols-2 gap-6">
              <div className="bg-blue-700 text-blue-100 p-6 rounded-xl shadow">
                <p className="text-lg">Total Sales</p>
                <p className="text-3xl font-bold">$0.00</p>
              </div>
              <div className="bg-green-700 text-green-100 p-6 rounded-xl shadow">
                <p className="text-lg">Active Partnerships</p>
                <p className="text-3xl font-bold">0</p>
              </div>
            </div>
            <div className="notifications mt-6">
              <p className="text-gray-400">No new notifications.</p>
            </div>
          </section>
        );
      case "Partnership Management":
        return (
          <section className="partnership-management bg-gray-800 text-gray-100 shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-semibold text-green-400 mb-4">
              Partnership Management
            </h2>
            <div className="flex gap-4">
              <button className="bg-green-500 text-white py-2 px-6 rounded-lg shadow hover:bg-green-600">
                View Partnership Requests
              </button>
              <button className="bg-green-500 text-white py-2 px-6 rounded-lg shadow hover:bg-green-600">
                Active Partnerships
              </button>
            </div>
          </section>
        );
      default:
        return (
          <section className="p-6 text-gray-400">
            <h2 className="text-xl">Select a feature from the menu.</h2>
          </section>
        );
    }
  };

  return (
    <div className="shop-owner-dashboard bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="bg-gray-800 p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Shop Owner Dashboard</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
          onClick={togglePanel}
        >
          Menu
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content flex-1 p-8">{renderFeature()}</main>

      {/* Popup Panel */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50"
          onClick={togglePanel}
        >
          <nav
            className="bg-gray-800 w-3/4 max-w-sm p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-gray-400 hover:text-gray-200 text-lg mb-6"
              onClick={togglePanel}
            >
              Close &times;
            </button>
            <ul className="space-y-4">
              {featureList.map((feature) => (
                <li key={feature}>
                  <button
                    className={`w-full text-left py-3 px-6 rounded-lg font-medium transition-all ${
                      selectedFeature === feature
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    }`}
                    onClick={() => {
                      setSelectedFeature(feature);
                      togglePanel();
                    }}
                  >
                    {feature}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <button
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg shadow hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ShopOwnerDashboard;
