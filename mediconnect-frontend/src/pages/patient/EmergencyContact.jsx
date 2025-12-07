import { Card, Button, Badge, Container, Row, Col, Alert } from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function EmergencyContacts() {

  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: "Spouse",
      phone: "(555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main St, City, State 12345",
      primary: true
    },
    {
      id: 2,
      name: "Michael Johnson",
      relationship: "Father",
      phone: "(555) 987-6543",
      altPhone: "(555) 111-2222",
      altType: "Alternate",
      email: "michael.johnson@email.com",
      primary: false
    }
  ];

  return (
    <Container className="py-4">

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>Emergency Contacts</h2>
          <p className="text-muted">
            Manage your emergency contact information for medical situations
          </p>
        </div>

        <Button variant="dark">+ Add Contact</Button>
      </div>

      {/* PRIMARY BANNER */}
      {contacts.find(c => c.primary) && (
        <Alert variant="warning" className="mt-3">
          <strong>Primary Emergency Contact</strong><br />
          {contacts.find(c => c.primary).name} ({contacts.find(c => c.primary).relationship}) - 
          {contacts.find(c => c.primary).phone}
        </Alert>
      )}

      {/* CONTACT CARDS */}
      {contacts.map(contact => (
        <Card key={contact.id} className="mt-3 shadow-sm">
          <Card.Body>
            <Row>
              <Col md={8}>
                <h5 className="fw-bold">
                  {contact.name}{" "}
                  <Badge bg="secondary">{contact.relationship}</Badge>{" "}
                  {contact.primary && <Badge bg="warning" text="dark">Primary</Badge>}
                </h5>

                <div className="mt-2 text-muted">
                  <p><FiPhone /> {contact.phone}</p>

                  {contact.altPhone && (
                    <p><FiPhone /> {contact.altPhone} 
                      {contact.altType && <Badge bg="light" text="dark" className="ms-2">{contact.altType}</Badge>}
                    </p>
                  )}

                  <p><FiMail /> {contact.email}</p>

                  {contact.address && (
                    <p><FiMapPin /> {contact.address}</p>
                  )}
                </div>
              </Col>

              <Col className="d-flex justify-content-end align-items-start gap-2">
                {!contact.primary && (
                  <Button variant="outline-secondary">Set Primary</Button>
                )}

                <Button variant="outline-dark">Edit</Button>
                <Button variant="outline-danger">Delete</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

    </Container>
  );
}
