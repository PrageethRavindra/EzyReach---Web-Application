"use client";

import React from "react";

export default function ShopDetailsPage() {
  const shops = [
    { 
      id: 1, 
      name: "Sunrise Supermarket", 
      description: "Groceries and daily essentials.", 
      address: "123 Main Street, Colombo", 
      phone: "+94 112 345 678", 
      email: "contact@sunrise.com", 
      image: "/images/sunrise-supermarket.jpg" 
    },
    { 
      id: 2, 
      name: "City Fashion Store", 
      description: "Trendy clothing and accessories.", 
      address: "456 High Street, Kandy", 
      phone: "+94 112 987 654", 
      email: "info@cityfashion.com", 
      image: "/images/city-fashion.jpg" 
    },
    { 
      id: 3, 
      name: "Green Valley Pharmacy", 
      description: "Medicines and healthcare products.", 
      address: "789 Lake Road, Galle", 
      phone: "+94 112 543 210", 
      email: "support@greenvalley.com", 
      image: "/images/green-valley.jpg" 
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shop Details</h1>
      <div style={styles.grid}>
        {shops.map((shop) => (
          <div key={shop.id} style={styles.card}>
            <img src={shop.image} alt={shop.name} style={styles.image} />
            <h2 style={styles.cardTitle}>{shop.name}</h2>
            <p style={styles.cardDescription}>{shop.description}</p>
            <p style={styles.contactInfo}>
              <strong>Address:</strong> {shop.address}
              <br />
              <strong>Phone:</strong> {shop.phone}
              <br />
              <strong>Email:</strong> {shop.email}
            </p>
            <a href={`/shops/${shop.id}`} style={styles.button}>
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  cardTitle: {
    fontSize: "1.8rem",
    color: "#0070f3",
    fontWeight: "600",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "20px",
  },
  contactInfo: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  button: {
    display: "inline-block",
    padding: "12px 25px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0070f3",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
};
