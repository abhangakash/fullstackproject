import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Image,
} from "react-bootstrap";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    branch: "",
    description: "",
    fullDetails: "",
    image: null, // file input
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
      setError("");
    } catch (err) {
      setError(err.message || "Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleShowAdd = () => {
    setEditCourse(null);
    setFormData({
      title: "",
      branch: "",
      description: "",
      fullDetails: "",
      image: null,
    });
    setShowModal(true);
  };

  const handleShowEdit = (course) => {
    setEditCourse(course);
    setFormData({
      title: course.title,
      branch: course.branch,
      description: course.description,
      fullDetails: course.fullDetails,
      image: null, // reset image input on edit
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditCourse(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("branch", formData.branch);
      formPayload.append("description", formData.description);
      formPayload.append("fullDetails", formData.fullDetails);
      if (formData.image) formPayload.append("image", formData.image);

      const method = editCourse ? "PUT" : "POST";
      const url = editCourse
        ? `${process.env.REACT_APP_API_URL}/api/courses/${editCourse._id}`
        : `${process.env.REACT_APP_API_URL}/api/courses`;

      const res = await fetch(url, {
        method,
        body: formPayload,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save course");
      }

      handleClose();
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/courses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete course");
      fetchCourses();
    } catch (err) {
      alert(err.message || "Error deleting course");
    }
  };

  return (
    <div className="mt-4">
      <h3>Course Management</h3>
      <Button className="mb-3" onClick={handleShowAdd}>
        + Add New Course
      </Button>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Branch</th>
              <th>Description</th>
              <th>Full Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id}>
                  <td>
                    {course.imageUrl ? (
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        thumbnail
                        style={{ maxWidth: "100px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{course.title}</td>
                  <td>{course.branch}</td>
                  <td>{course.description}</td>
                  <td>{course.fullDetails}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleShowEdit(course)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editCourse ? "Edit Course" : "Add New Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formCourseTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourseBranch">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                as="select"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                <option value="CS">Computer Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="ENTC">Electronics & Telecommunication</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="AERO">Aeronautics</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourseDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter short description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourseFullDetails">
              <Form.Label>Full Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter full details about the course"
                name="fullDetails"
                value={formData.fullDetails}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCourseImage" className="mb-3">
              <Form.Label>Course Image (optional)</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {editCourse ? "Update Course" : "Add Course"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseManagement;
