"use client";

import React from "react";

export default function CompaniesPage() {
  const companies = [
    { 
      id: 1, 
      name: "Unilever", 
      description: "Leading supplier of groceries.", 
      image: "/images/Unilever-Logo.png" 
    },
    { 
      id: 2, 
      name: "Coca-Cola", 
      description: "refresh the world.", 
      image: "/images/Coca-Cola-Logo.png" 
    },
    { 
      id: 3, 
      name: "Elephant House", 
      description: "High-quality fabrics and more.", 
      image: "/images/elephant-house.jpg" 
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sales Representatives' Companies</h1>
      <div style={styles.grid}>
        {companies.map((company) => (
          <div key={company.id} style={styles.card}>
            <img src={company.image} alt={company.name} style={styles.image} />
            <h2 style={styles.cardTitle}>{company.name}</h2>
            <p style={styles.cardDescription}>{company.description}</p>
            <a href={`/shop-owners/companies/${company.id}`} style={styles.button}>
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
    color: "#666",
    marginBottom: "20px",
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
