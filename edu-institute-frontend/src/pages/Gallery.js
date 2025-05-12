import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/PhotosVideosGallery.css';

const PhotosVideosGallery = () => {
  // Sample gallery data
  const sampleGalleryData = [
    {
      _id: '1',
      type: 'image',
      caption: 'Beautiful Sunset',
      imageUrl: 'https://via.placeholder.com/600x400.png?text=Sunset'
    },
    {
      _id: '2',
      type: 'image',
      caption: 'Mountain View',
      imageUrl: 'https://via.placeholder.com/600x400.png?text=Mountain+View'
    },
    {
      _id: '3',
      type: 'video',
      caption: 'Nature Documentary',
      imageUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      _id: '4',
      type: 'image',
      caption: 'City Skyline',
      imageUrl: 'https://via.placeholder.com/600x400.png?text=City+Skyline'
    },
    {
      _id: '5',
      type: 'video',
      caption: 'Ocean Waves',
      imageUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
  ];

  const [galleryData] = useState(sampleGalleryData); // Using static sample data
  const [selectedMedia, setSelectedMedia] = useState(null); // For modal
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering
  const [category, setCategory] = useState('all'); // Category filter

  // Filter gallery data based on search term and selected category
  const filteredData = galleryData.filter((media) => {
    const matchesCategory = category === 'all' || media.type === category;
    const matchesSearch = media.caption?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMediaClick = (media) => setSelectedMedia(media); // Open modal when media is clicked
  const handleCloseModal = () => setSelectedMedia(null); // Close modal

  return (
    <section className="photos-videos-gallery-section">
      <h2>Photo & Video Gallery</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Media"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <button onClick={() => setCategory('all')}>All</button>
        <button onClick={() => setCategory('image')}>Images</button>
        <button onClick={() => setCategory('video')}>Videos</button>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredData.map((media) => (
          <div key={media._id} className="media-card" onClick={() => handleMediaClick(media)}>
            {media.type === 'image' ? (
              <LazyLoadImage
                alt={media.caption}
                src={media.imageUrl}
                className="gallery-image"
                effect="blur"
                height={200}
              />
            ) : (
              <video className="gallery-video" controls>
                <source src={media.imageUrl} type="video/mp4" />
              </video>
            )}
            <h3>{media.caption}</h3>
          </div>
        ))}
      </div>

      {/* Modal to display selected media */}
      {selectedMedia && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.imageUrl} alt={selectedMedia.caption} className="modal-image" />
            ) : (
              <video className="modal-video" controls>
                <source src={selectedMedia.imageUrl} type="video/mp4" />
              </video>
            )}
            <button className="close-modal" onClick={handleCloseModal}>&times;</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotosVideosGallery;
