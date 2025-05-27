import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Form, Row, Col, Image } from "react-bootstrap";
import { CSVLink } from "react-csv";

const RegistrationsView = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setRegistrations(data);
        setFiltered(data);
      } catch (err) {
        setError("Failed to fetch registrations.");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/register/${id}`, {
        method: "DELETE",
      });
      const updated = filtered.filter((r) => r._id !== id);
      setRegistrations(updated);
      setFiltered(updated);
    } catch (err) {
      alert("Error deleting record");
    }
  };

  // Filter registrations on search
  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      setFiltered(registrations);
      setCurrentPage(1);
      return;
    }

    const filteredData = registrations.filter((r) => {
      return (
        r.name.toLowerCase().includes(term) ||
        (r.parentName && r.parentName.toLowerCase().includes(term)) ||
        (r.phone && r.phone.includes(term)) ||
        (r.altPhone && r.altPhone.includes(term)) ||
        (r.email && r.email.toLowerCase().includes(term))
      );
    });

    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, registrations]);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  return (
    <div className="p-4">
      <h3>All Registrations</h3>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="search"
            placeholder="Search by name, parent, phone, or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <CSVLink data={filtered} filename="registrations.csv" className="btn btn-success">
            Export CSV
          </CSVLink>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Parent Name</th>
                <th>Phone</th>
                <th>Alt Phone</th>
                <th>Email</th>
                <th>Class</th>
                <th>DOB</th>
                <th>Village</th>
                <th>Taluka</th>
                <th>District</th>
                <th>Declaration</th>
                <th>Photo</th>
                <th>Registered At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan="14" className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                currentRecords.map((reg) => (
                  <tr key={reg._id}>
                    <td>{reg.name}</td>
                    <td>{reg.parentName || "-"}</td>
                    <td>{reg.phone || "-"}</td>
                    <td>{reg.altPhone || "-"}</td>
                    <td>{reg.email || "-"}</td>
                    <td>{reg.studentClass || "-"}</td>
                    <td>{reg.dob ? new Date(reg.dob).toLocaleDateString() : "-"}</td>
                    <td>{reg.address?.village || "-"}</td>
                    <td>{reg.address?.taluka || "-"}</td>
                    <td>{reg.address?.district || "-"}</td>
                    <td>{reg.declaration ? "Yes" : "No"}</td>
                    <td style={{ textAlign: "center" }}>
                      {reg.profilePic ? (
                        <Image
                          src={`${process.env.REACT_APP_API_URL}/${reg.profilePic}`}
                          alt="Profile Pic"
                          thumbnail
                          style={{ maxWidth: 60, maxHeight: 60 }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{new Date(reg.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(reg._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div>
              <Button
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>{" "}
              <Button
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationsView;
