'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/firebase'; // Adjust path to Firebase config file

const featureList = [
  'View Product List',
  'Add Product',
  'View Account',
];

type CompanyDetails = {
  companyName: string;
  email: string;
  companyLocation: string;
  phone: string;
};

type ProductDetails = {
  productName: string;
  category: string;
  price: number;
  imageUrl: string | null;
  email: string;
};

const CompanyDashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState(featureList[0]);
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Popup state
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null); // Company details state
  const [isEditing, setIsEditing] = useState(false); // Editing mode
  const [editDetails, setEditDetails] = useState<CompanyDetails | null>(null); // State for editing details
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Selected file for upload
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    productName: '',
    category: '',
    price: 0,
    imageUrl: null,
    email: '', 
  }); 

  const router = useRouter();

  const handleLogout = () => {
    try {
      if (confirm('Are you sure you want to logout?')) {
        document.cookie = 'userEmail=; path=/; max-age=-1'; // Remove the cookie
        router.push('/login'); // Redirect to login
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const email = getCookie('userEmail');
        if (!email) {
          console.warn('No email found in session.');
          return;
        }
  
        const db = getFirestore(app);
        const companyCollection = collection(db, 'company');
        const q = query(companyCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const companyData = querySnapshot.docs[0].data() as CompanyDetails;
          console.log('Fetched Company Details:', companyData); // Debugging
          setCompanyDetails(companyData);
        } else {
          console.warn('No company details found for this email.');
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
  
    fetchCompanyDetails();
  }, []);
  

  // Fetch products based on logged-in user email
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const email = getCookie('userEmail');
        if (!email) {
          console.warn('No email found in session.');
          return;
        }

        const db = getFirestore(app);
        const productCollection = collection(db, 'products');
        const q = query(productCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProducts(productData);
        } else {
          console.warn('No products found for this email.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (selectedFeature === 'View Product List') {
      fetchProducts();
    }
  }, [selectedFeature]);

  const handleEditClick = () => {
    setEditDetails(companyDetails); // Pre-fill form with current details
    setIsEditing(true);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    if (editDetails) {
      setEditDetails({ ...editDetails, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleEditProduct = (product: { productName: any; category: any; price: any; imageUrl: any; email: any; }) => {
    // Pre-fill the form with product details for editing
    setProductDetails({
      productName: product.productName,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl || null, // Optional
      email: product.email,
    });
  
    // Optionally, set a flag or open a modal for editing
    setIsEditingProduct(true);
  };
  

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
  
    try {
      const db = getFirestore(app);
      const productDocRef = doc(db, 'products', productId);
  
      // Delete the product document
      await deleteDoc(productDocRef);
  
      // Remove the product from the local state
      setProducts(products.filter((product) => product.id !== productId));
  
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };
  

  const handleDeactivateAccount = async () => {
    if (confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
      try {
        const db = getFirestore(app);

        if (companyDetails) {
          const companyDocRef = doc(db, 'company', companyDetails.email); // Assuming email is unique and used as document ID

          // Mark the account as deactivated (you could set a "status" field or remove the document entirely)
          await updateDoc(companyDocRef, {
            status: 'deactivated'  // Add a 'status' field to mark the account as deactivated
          });

          alert('Account deactivated successfully!');
          // Optionally log out after deactivating
          handleLogout();
        } else {
          console.error('Company details are null.');
          alert('Failed to deactivate account. Please try again.');
        }
      } catch (error) {
        console.error('Error deactivating account:', error);
        alert('Failed to deactivate account. Please try again.');
      }
    }
  };

  const handleSave = async () => {
    if (!editDetails || !companyDetails) return;

    try {
      const db = getFirestore(app);
      // Fetch the document ID using email
      const companyCollection = collection(db, 'company');
      const q = query(companyCollection, where('email', '==', companyDetails.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const companyDocRef = doc(db, 'company', querySnapshot.docs[0].id); // Get the document reference using the ID
        await updateDoc(companyDocRef, {
          companyName: editDetails.companyName,
          email: editDetails.email,
          companyLocation: editDetails.companyLocation,
          phone: editDetails.phone
        });
        setIsEditing(false);
        alert('Profile updated successfully!');
        window.location.reload();
      } else {
        console.error('Company details not found.');
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleAddProduct = async () => {
    if (!productDetails.productName || !productDetails.category || productDetails.price <= 0) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      const db = getFirestore(app);
  
      if (!companyDetails || !companyDetails.email) {
        alert('Your session seems to be invalid. Please log in again.');
        return;
      }
  
      // Add product to Firestore
      const productCollection = collection(db, 'products');
      await addDoc(productCollection, {
        productName: productDetails.productName,
        category: productDetails.category,
        price: productDetails.price,
        email: companyDetails.email, // Add the company email to link the product to the company
        createdAt: new Date().toISOString(), // Add a timestamp if needed
      });
  
      alert('Product added successfully!');
      // Reset form fields
      setProductDetails({
        productName: '',
        category: '',
        price: 0,
        imageUrl: null, // Optional; can be removed if not needed
        email: companyDetails.email,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };
  
  
  
  const renderFeature = () => {
    switch (selectedFeature) {
      case 'View Product List':
  return (
    <section className="bg-gray-800 text-gray-100 shadow-lg rounded-xl p-6">
      <h2 className="text-3xl font-semibold text-blue-400 mb-4">Product List</h2>
      {products.length > 0 ? (
        <ul className="divide-y divide-gray-700">
          {products.map((product) => (
            <li key={product.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">{product.productName}</p>
                <p className="text-sm text-gray-400">{product.category}</p>
                <p className="text-sm text-green-400">Price: ${product.price}</p>
              </div>
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex space-x-4">
                {/* Edit Button */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No products found.</p>
      )}
    </section>
  );


      case 'View Account':
        return (
          <section className="bg-gray-800 text-gray-100 shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-semibold text-blue-400 mb-4">Account Details</h2>
            {isEditing ? (
              <form className="space-y-4">
                <input
                  type="text"
                  name="companyName"
                  value={editDetails?.companyName || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  name="email"
                  value={editDetails?.email || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="companyLocation"
                  value={editDetails?.companyLocation || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg"
                  placeholder="Location"
                />
                <input
                  type="text"
                  name="phone"
                  value={editDetails?.phone || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg"
                  placeholder="Phone"
                />
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                <p className="text-lg mb-2">Name: {companyDetails?.companyName}</p>
                <p className="text-lg mb-2">Email: {companyDetails?.email}</p>
                <p className="text-lg mb-2">Location: {companyDetails?.companyLocation}</p>
                <p className="text-lg">Phone: {companyDetails?.phone}</p>
                <button
                  onClick={handleEditClick}
                  className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600"
                >
                  Edit Profile
                </button>
              </div>
            )}
            <button
              onClick={handleDeactivateAccount}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
            >
              Deactivate Account
            </button>
          </section>
        );

      default:
        return <p className="text-gray-400">Feature coming soon...</p>;
    }
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`); 
    if (parts.length === 2) {
      const part = parts.pop();
      if (part) {
        return part.split(';').shift();
      }
    }
  };

  return (
    <div className="company-dashboard bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Company Dashboard</h1>
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
            onClick={togglePanel}
          >
            Menu
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex gap-6 px-4 py-6">
        <div
          className={`bg-gray-800 text-white w-64 p-4 rounded-xl shadow-lg ${isPanelOpen ? 'block' : 'hidden'}`}
        >
          <ul>
            {featureList.map((feature, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedFeature(feature)}
                  className={`w-full text-left p-3 rounded-lg ${
                    selectedFeature === feature
                      ? 'bg-blue-500'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {feature}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <main className="flex-1">
          {renderFeature()}
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;
function setIsEditingProduct(arg0: boolean) {
  throw new Error('Function not implemented.');
}

