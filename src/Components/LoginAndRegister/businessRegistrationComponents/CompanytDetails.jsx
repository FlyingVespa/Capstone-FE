// Libraries
import { useState } from "react";
// Styling
import { FormLabel } from "@mui/material";
import { FormControl, InputGroup } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import { HiOutlineMail, HiOutlineDeviceMobile } from "react-icons/hi";
import { BiBuildingHouse } from "react-icons/bi";

const CompanyDetails = ({ f }) => {
  const [checked, setChecked] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({
    public_email: "",
    cell: "",
    bio: "",
    services: "",
    shipping: false,
  });

  const handleChange = ({ target }) => {
    setCompanyDetails({
      ...companyDetails,
      [target.id]: target.value,
    });
    f(companyDetails);
  };

  const handleShipping = ({ target }) => {
    setCompanyDetails({
      ...companyDetails,
      shipping: !companyDetails.shipping,
    });
  };

  return (
    <div className="contact-details my-5">
      <FormLabel component="legend">Company Details</FormLabel>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          <HiOutlineMail className="mx-2" /> Email
        </InputGroup.Text>
        <FormControl
          placeholder="Enter email visible for customers"
          id="public_email"
          variant="standard"
          helperText="This email will be shared with customers"
          value={companyDetails.public_email}
          onChange={handleChange}
          required
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
          value={companyDetails.cell}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <BiBuildingHouse className="mx-2" /> About
        </InputGroup.Text>
        <FormControl
          placeholder="Give short description of your business"
          id="bio"
          value={companyDetails.bio}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup className="mb-3 align-baseline">
        <div>
          <Checkbox
            checked={companyDetails.shipping}
            onChange={handleShipping}
            inputProps={{ "aria-label": "controlled" }}
          />
          <span>Do you deliver?</span>
        </div>
      </InputGroup>
      {/* <InputGroup className="mb-3">
        <InputGroup.Text>
          <BiBuildingHouse className="mx-2" /> About
        </InputGroup.Text>
        <FormControl
          placeholder="Give short description of your business"
          id="services"
          value={companyDetails.services}
          onChange={handleChange}
          required
        />
      </InputGroup> */}
    </div>
  );
};

export default CompanyDetails;
