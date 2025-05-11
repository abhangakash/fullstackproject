import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../styles/Gallery.css";

const galleryImages = [
  {
    imgSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    title: "Campus View",
    description: "A beautiful view of our campus.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1581090700227-1e8b64b8c27c",
    title: "Classroom Learning",
    description: "Modern classrooms equipped with smart learning.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    title: "Student Interaction",
    description: "Students engaging in group activities.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    title: "Library",
    description: "A well-stocked library with a variety of books.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1501594907350-e0795b8277fd",
    title: "Auditorium",
    description: "Our grand auditorium, the venue for major events.",
  },
  // Add more images as needed...
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Our Campus Gallery</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {galleryImages.map((image, index) => (
          <Col key={index}>
            <Card className="gallery-card">
              <Card.Img variant="top" src={image.imgSrc} alt={image.title} />
              <Card.Body>
                <Card.Title>{image.title}</Card.Title>
                <Card.Text>{image.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Gallery;
