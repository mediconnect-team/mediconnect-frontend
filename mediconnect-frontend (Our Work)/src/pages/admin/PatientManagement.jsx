import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  Form,
  Table,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { Plus, Search, Eye, Pencil } from "react-bootstrap-icons";

const PatientManagement = () => {
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("Status");

  React.useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:9090/patients/all", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Status" || 
                          (statusFilter === "Active" && p.active) || 
                          (statusFilter === "Inactive" && !p.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#F5F7FB", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold" style={{ letterSpacing: "-.5px" }}>
            Patient Management
          </h2>
          <div className="text-muted" style={{ fontSize: "14px" }}>
            Manage patient details and status
          </div>
        </div>

        {/* <Button
          variant="dark"
          style={{
            borderRadius: "50px",
            padding: "10px 22px",
            fontWeight: "600",
          }}
        >
          <Plus size={18} className="me-2" />
          Add Patient
        </Button> */}
      </div>

      {/* Search */}
      <Card
        className="shadow-sm border-0 mb-4"
        style={{
          borderRadius: "18px",
          padding: "18px",
          background: "rgba(255,255,255,.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="d-flex gap-3">
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              style={{
                borderRadius: "12px",
              }}
              placeholder="Search by name or email…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Form.Select 
            style={{ maxWidth: "200px", borderRadius: "12px" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </Form.Select>
        </div>
      </Card>

      {/* Table */}
      <Card
        className="shadow-sm border-0"
        style={{
          borderRadius: "18px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <Table hover responsive className="mb-0">
          <thead
            style={{
              background: "#F2F4F8",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <tr>
              <th>Name</th>
              <th>Contacts</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Address</th>
              <th>Status</th>
              {/* <th></th> */}
            </tr>
          </thead>

          <tbody>
            {loading ? (
                <tr><td colSpan="8" className="text-center p-4">Loading...</td></tr>
            ) : filteredPatients.length === 0 ? (
                <tr><td colSpan="8" className="text-center p-4">No patients found.</td></tr>
            ) : (
                filteredPatients.map((p) => (
              <tr
                key={p.id}
                style={{
                  height: "65px",
                  verticalAlign: "middle",
                }}
              >
                <td>
                  <span className="fw-semibold">{p.name}</span>
                </td>

                <td>
                  <div style={{ fontSize: "14px" }}>{p.email}</div>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    {p.phone}
                  </div>
                </td>

                <td>{calculateAge(p.dob)}</td>
                <td>{p.gender || "N/A"}</td>
                <td>{p.bloodGroup || "N/A"}</td>
                <td>{p.address || "N/A"}</td>

                <td>
                  <Badge
                    bg={p.active ? "success" : "secondary"}
                    pill
                    style={{ fontSize: "13px" }}
                  >
                    {p.active ? "Active" : "Inactive"}
                  </Badge>
                </td>

                {/* <td className="text-end">
                  <Button
                    size="sm"
                    variant="light"
                    className="me-2"
                    style={{ borderRadius: "50px" }}
                  >
                    <Eye />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-dark"
                    style={{ borderRadius: "50px" }}
                  >
                    <Pencil />
                  </Button>
                </td> */}
              </tr>
            )))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default PatientManagement;
