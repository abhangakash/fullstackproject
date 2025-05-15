import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";

const DepartmentsAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add or edit
  const [currentDept, setCurrentDept] = useState({ name: "", short: "", description: "" });
  const [error, setError] = useState("");

  // Fetch departments from backend API
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/departments`);
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleShowAdd = () => {
    setModalMode("add");
    setCurrentDept({ name: "", short: "", description: "" });
    setShowModal(true);
    setError("");
  };

  const handleShowEdit = (dept) => {
    setModalMode("edit");
    setCurrentDept(dept);
    setShowModal(true);
    setError("");
  };

  const handleClose = () => {
    setShowModal(false);
    setError("");
  };

  // Add or update department API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentDept.name || !currentDept.short) {
      setError("Name and Short code are required");
      return;
    }

    try {
      const res = await fetch(
        modalMode === "add"
          ? `${process.env.REACT_APP_API_URL}/api/departments`
          : `${process.env.REACT_APP_API_URL}0/api/departments/${currentDept._id}`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentDept),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Failed to save department");
        return;
      }

      fetchDepartments();
      setShowModal(false);
    } catch (err) {
      setError("Server error");
    }
  };

  // Delete department API call
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/departments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Failed to delete department");
        return;
      }

      fetchDepartments();
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div>
      <h3>Manage Departments</h3>
      <Button variant="primary" className="mb-3" onClick={handleShowAdd}>
        Add Department
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Short Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No departments found
              </td>
            </tr>
          ) : (
            departments.map((dept) => (
              <tr key={dept._id}>
                <td>{dept.name}</td>
                <td>{dept.short}</td>
                <td>{dept.description}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleShowEdit(dept)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(dept._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Add Department" : "Edit Department"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="deptName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department full name"
                value={currentDept.name}
                onChange={(e) => setCurrentDept({ ...currentDept, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="deptShort">
              <Form.Label>Short Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Short code (e.g. CS, IT)"
                value={currentDept.short}
                onChange={(e) => setCurrentDept({ ...currentDept, short: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="deptDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Department description"
                value={currentDept.description}
                onChange={(e) => setCurrentDept({ ...currentDept, description: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {modalMode === "add" ? "Add" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentsAdmin;
