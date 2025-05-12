import React, { useState } from 'react';
import axios from 'axios';

const GalleryUploader = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);

    try {
      await axios.post('http://localhost:5000/gallery/upload', formData);
      alert('Uploaded!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default GalleryUploader;
