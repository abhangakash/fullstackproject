import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";

const AdminFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
    contactInfo: "",
    email: "",
    photo: null,
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/faculty`);
      setFacultyList(res.data);
    } catch (err) {
      setError("Failed to load faculty data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      designation: "",
      department: "",
      contactInfo: "",
      email: "",
      photo: null,
    });
    setCurrentFaculty(null);
    setShowModal(true);
  };

  const openEditModal = (faculty) => {
    setModalMode("edit");
    setCurrentFaculty(faculty);
    setFormData({
      name: faculty.name,
      designation: faculty.designation,
      department: faculty.department,
      contactInfo: faculty.contactInfo || "",
      email: faculty.email || "",
      photo: null,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentFaculty(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("designation", formData.designation);
    data.append("department", formData.department);
    data.append("contactInfo", formData.contactInfo);
    data.append("email", formData.email);
    if (formData.photo) {
      data.append("image", formData.photo); // NOTE: uses `image` for backend compatibility
    }

    try {
      if (modalMode === "add") {
        await axios.post(`${API_URL}/api/faculty/add`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (modalMode === "edit" && currentFaculty) {
        await axios.put(`${API_URL}/api/faculty/${currentFaculty._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchFaculty();
      handleCloseModal();
    } catch (err) {
      alert("Error saving faculty data");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure to delete this faculty?")) return;

  try {
    const res = await axios.delete(`${API_URL}/api/faculty/${id}`);
    console.log("Delete response:", res.data); // optional logging

    // Remove the deleted faculty from the list without full refetch
    setFacultyList((prevList) => prevList.filter((faculty) => faculty._id !== id));

    // Optionally show success alert
    alert("Faculty deleted successfully.");
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Error deleting faculty");
  }
};

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h3>Faculty Management</h3>
      <Button variant="primary" onClick={openAddModal} className="mb-3">
        Add New Faculty
      </Button>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Contact Info</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No faculty found.
              </td>
            </tr>
          ) : (
            facultyList.map((faculty) => (
              <tr key={faculty._id}>
                <td>{faculty.name}</td>
                <td>{faculty.designation}</td>
                <td>{faculty.department}</td>
                <td>{faculty.contactInfo || "-"}</td>
                <td>{faculty.email || "-"}</td>
                <td>
                  <img
                    src={faculty.photo || faculty.image} // Handle both fields
                    alt={faculty.name}
                    style={{ width: "60px", borderRadius: "5px" }}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(faculty)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(faculty._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Add New Faculty" : "Edit Faculty"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Designation *</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department *</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Info</Form.Label>
              <Form.Control
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Photo {modalMode === "edit" ? "(Upload to replace)" : "*"}</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleInputChange}
                accept="image/*"
                {...(modalMode === "add" ? { required: true } : {})}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitLoading}>
              {submitLoading ? "Saving..." : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminFaculty;
