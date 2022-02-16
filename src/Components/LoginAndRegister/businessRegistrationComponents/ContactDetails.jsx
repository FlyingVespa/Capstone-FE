import { TextField, FormLabel } from "@mui/material";
import { Row, Col } from "react-bootstrap";

const ContactDetails = ({ d, f }) => {
  return (
    <div className="contact-details my-5">
      <FormLabel component="legend">Contact Details</FormLabel>
      <TextField
        placeholder="Enter email visible for customers"
        id="pub_email"
        name="contact"
        label="Email"
        variant="standard"
        helperText="This email will be shared with customers"
        onChange={f}
        value={d.pub_email}
        required
        fullWidth
      />

      <Row>
        <Col sm={12} md={6}>
          <TextField
            id="cell"
            name="contact"
            placeholder="Enter mobile"
            label="Mobile number"
            variant="standard"
            helperText="Required"
            onChange={f}
            value={d.cell}
            fullWidth
          />
        </Col>
        <Col sm={12} md={6}>
          <TextField
            id="tel"
            name="contact"
            placeholder="Enter landline"
            label="Landline number"
            variant="standard"
            helperText="Optional"
            onChange={f}
            value={d.tel}
            fullWidth
          />
        </Col>
        <Col sm={12} md={6}>
          <TextField
            id="insta"
            name="contact"
            placeholder="Enter WhatsApp Number"
            label="Mobile number"
            variant="standard"
            helperText="Optional"
            onChange={f}
            value={d.insta}
            fullWidth
          />
        </Col>
        <Col sm={12} md={6}>
          <TextField
            id="whatsapp"
            name="contact"
            placeholder="Enter whatsApp number"
            label="WhatsApp"
            variant="standard"
            helperText="Optional"
            onChange={f}
            value={d.whatsapp}
            fullWidth
          />
        </Col>
      </Row>
    </div>
  );
};

export default ContactDetails;
