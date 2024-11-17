// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link href="/">
          <a style={styles.logoText}>EZYREACH</a>
        </Link>
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link href="/home">
            <a style={styles.navLink}>Home</a>
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/about">
            <a style={styles.navLink}>About</a>
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/services">
            <a style={styles.navLink}>Services</a>
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/contact">
            <a style={styles.navLink}>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

// Styles for the navigation bar
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#050D2B',
    padding: '1rem 2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '1.8rem',
    color: '#FF00E2',
    fontWeight: 'bold',
  },
  logoText: {
    textDecoration: 'none',
    color: '#FF00E2',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
  },
  navItem: {
    textAlign: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#FFFFFF',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
};

