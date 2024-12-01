import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white font-sans">
      <Head>
        <title>EZYREACH - Endless Efficiency in Sales</title>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-purple-500">EZYREACH</h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a href="#" className="hover:text-purple-400">Features</a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400">Pricing</a>
            </li>
            <li>
              <a href="/login" className="hover:text-purple-400">Login</a>
            </li>
            <li>
              <Link href="/register">
                <button className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-md">
                  Sign Up
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-20 px-4">
        {/* Logo Section */}
        <div className="mb-8">
          <img
            src="/images/logo.png"
            alt="EzyReach Logo"
            className="w-80 h-85 mx-auto" // Adjusted size to be larger
          />
        </div>

        <h2 className="text-5xl font-bold mb-4">
          Reach customers easily with <span className="text-purple-500">EZYREACH</span>
        </h2>
        <p className="text-gray-300 max-w-xl mb-8 text-lg">
          EZYREACH is a <span className="font-semibold">powerful platform</span> that connects sales representatives and shop owners, helping you find the right partnerships and grow your business effortlessly.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex space-x-4">
          <Link href="/shop-owners">
            <button className="bg-purple-600 hover:bg-purple-700 py-3 px-8 rounded-md text-lg">
              Get Started
            </button>
          </Link>
          <Link href="/sales-reps">
            <button className="border border-gray-400 py-3 px-8 rounded-md hover:bg-gray-800 text-lg">
              Register as Sales Rep →
            </button>
          </Link>
        </div>

        {/* 3D Logo */}
        <div className="mt-16">
          <div className="text-9xl text-purple-500">∞</div>
          <h3 className="mt-4 text-3xl font-bold">EZYREACH</h3>
          <p className="text-gray-400 text-lg">Endless Efficiency in Sales</p>
        </div>
      </main>
    </div>
  );
}
