import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Form, Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";

const RegistrationsView = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`);
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

  useEffect(() => {
    const applyFilters = () => {
      let result = registrations;

      if (search) {
        result = result.filter(
          (r) =>
            r.fullName.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (branchFilter) {
        result = result.filter((r) => r.branch === branchFilter);
      }

      if (yearFilter) {
        result = result.filter((r) => r.year === yearFilter);
      }

      setFiltered(result);
      setCurrentPage(1); 
    };

    applyFilters();
  }, [registrations, search, branchFilter, yearFilter]);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  return (
    <div className="p-4">
      <h3>All Registrations</h3>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            onChange={(e) => setBranchFilter(e.target.value)}
            value={branchFilter}
          >
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ENTC">ENTC</option>
            <option value="Mechanical">Mechanical</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            onChange={(e) => setYearFilter(e.target.value)}
            value={yearFilter}
          >
            <option value="">All Years</option>
            <option value="First">First Year</option>
            <option value="Second">Second Year</option>
            <option value="Third">Third Year</option>
            <option value="Final">Final Year</option>
          </Form.Select>
        </Col>
        <Col md={2}>
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
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Registered At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                currentRecords.map((reg) => (
                  <tr key={reg._id}>
                    <td>{reg.fullName}</td>
                    <td>{reg.email}</td>
                    <td>{reg.phone}</td>
                    <td>{reg.branch}</td>
                    <td>{reg.year}</td>
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
                disabled={currentPage === totalPages}
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
