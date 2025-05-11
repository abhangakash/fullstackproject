import React, { useState } from 'react';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://your-backend-url.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Cloudinary URL:', data.url);
      setImageUrl(data.url); // Save image URL to state
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div>
      <h3>Upload an Image</h3>
      <input type="file" onChange={handleImageUpload} />
      
      {imageUrl && (
        <div>
          <p>Image Uploaded Successfully:</p>
          <img src={imageUrl} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
