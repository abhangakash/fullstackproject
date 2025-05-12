import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: Add blur effect for smooth loading
import '../styles/PhotosVideosGallery.css';

const sampleData = [
  { id: 1, type: 'image', src: 'https://via.placeholder.com/300x200?text=Sample+Image+1', title: 'Sample Image 1' },
  { id: 2, type: 'image', src: 'https://via.placeholder.com/300x200?text=Sample+Image+2', title: 'Sample Image 2' },
  { id: 3, type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Sample Video 1' },
  { id: 4, type: 'image', src: 'https://via.placeholder.com/300x200?text=Sample+Image+3', title: 'Sample Image 3' },
  { id: 5, type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Sample Video 2' },
];

const PhotosVideosGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  const filteredData = sampleData.filter((media) => {
    const matchesCategory = category === 'all' || media.type === category;
    const matchesSearch = media.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      
      {/* Gallery Grid with Lazy Loading */}
      <div className="gallery-grid">
        {filteredData.map((media) => (
          <div key={media.id} className="media-card" onClick={() => handleMediaClick(media)}>
            {media.type === 'image' ? (
              <LazyLoadImage
                alt={media.title}
                src={media.src}
                className="gallery-image"
                effect="blur"
                height={200}
              />
            ) : (
              <video className="gallery-video" controls>
                <source src={media.src} type="video/mp4" />
              </video>
            )}
            <h3>{media.title}</h3>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.src} alt={selectedMedia.title} className="modal-image" />
            ) : (
              <video className="modal-video" controls>
                <source src={selectedMedia.src} type="video/mp4" />
              </video>
            )}
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotosVideosGallery;