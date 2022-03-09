// Libraries
import { useState } from "react";
// Styling
import { TextField, FormLabel } from "@mui/material";
import { FormControl, InputGroup } from "react-bootstrap";

import { HiOutlineMail, HiOutlineDeviceMobile } from "react-icons/hi";

const ContactDetails = ({ f }) => {
  const [contactDetails, setContactDetails] = useState({
    public_email: "",
    cell: "",
  });
  const handleChange = ({ target }) => {
    setContactDetails({
      ...contactDetails,
      [target.id]: target.value,
    });
    f(contactDetails);
  };

  return (
    <div className="contact-details my-5">
      <FormLabel component="legend">Contact Details</FormLabel>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          <HiOutlineMail className="mx-2" /> Email
        </InputGroup.Text>
        <FormControl
          placeholder="Enter email visible for customers"
          id="public_email"
          variant="standard"
          helperText="This email will be shared with customers"
          value={contactDetails.public_email}
          onChange={handleChange}
          required
          fullWidth
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          <HiOutlineDeviceMobile className="mx-2" /> Mobile
        </InputGroup.Text>
        <FormControl
          placeholder="Enter email visible for customers"
          id="cell"
          variant="standard"
          helperText="This email will be shared with customers"
          value={contactDetails.cell}
          onChange={handleChange}
          required
          fullWidth
        />
      </InputGroup>
    </div>
  );
};

export default ContactDetails;
