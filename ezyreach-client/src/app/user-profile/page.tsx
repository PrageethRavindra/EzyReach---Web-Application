'use client';

import { useState } from 'react';

export default function UserProfile() {
  // Initial User Data
  const [user, setUser] = useState({
    name: 'Jeremy Rose',
    user_type: 'Product Designer',
    location: 'New York, NY',
    ranking: 8.6,
    profileImage: '/profile-pic.jpg', // Placeholder for uploaded image
    phone: '+1 123 456 7890',
    email: 'hello@jeremyrose.com',
    website: 'www.jeremyrose.com',
    skills: ['Branding', 'UI/UX', 'Web Design', 'Packaging', 'Print & Editorial'],
  });

  // State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{ 
    name: string; 
    user_type: string; 
    location: string; 
    ranking: number; 
    profileImage: string | File; 
    phone: string; 
    email: string; 
    website: string; 
    skills: string[]; 
  }>({ ...user });
  const [previewImage, setPreviewImage] = useState(user.profileImage);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // Update the preview image
      setFormData({ ...formData, profileImage: file }); // Save the file for API upload
    }
  };

  // Save Changes
  const saveProfile = () => {
    setUser({ ...formData, profileImage: typeof formData.profileImage === 'string' ? formData.profileImage : URL.createObjectURL(formData.profileImage) }); // Save updated data
    setIsEditing(false); // Exit edit mode
  };

  // Cancel Edit
  const cancelEdit = () => {
    setFormData(user); // Reset to original data
    setPreviewImage(user.profileImage); // Reset preview image
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-serif text-pink-500">EZYREACH</h1>
      </header>

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Profile Image and Info */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-700 p-8 text-center">
          <img
            src={previewImage}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full border-4 border-white object-cover"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4 text-sm text-gray-300 file:bg-gray-700 file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer hover:file:bg-gray-600"
            />
          )}
          {!isEditing ? (
            <>
              <h2 className="text-2xl mt-4">{user.name}</h2>
              <p className="text-purple-200">{user.user_type}</p>
              <p>{user.location}</p>
            </>
          ) : (
            <div className="mt-4 space-y-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full bg-gray-700 p-2 rounded"
                placeholder="Name"
              />
              <input
                type="text"
                name="user_type"
                value={formData.user_type}
                onChange={handleInputChange}
                className="block w-full bg-gray-700 p-2 rounded"
                placeholder="user_type"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="block w-full bg-gray-700 p-2 rounded"
                placeholder="Location"
              />
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="p-8">
          <h3 className="text-pink-500 text-lg mb-4">About</h3>
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full bg-gray-700 p-2 rounded"
                placeholder="Phone"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full bg-gray-700 p-2 rounded"
                placeholder="Email"
              />
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="block w-full bg-gray-700 p-2 rounded"
                placeholder="Website"
              />
            </div>
          ) : (
            <>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${user.email}`} className="text-purple-300">
                  {user.email}
                </a>
              </p>
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300"
                >
                  {user.website}
                </a>
              </p>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="p-4 text-center">
          {isEditing ? (
            <>
              <button
                onClick={saveProfile}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
