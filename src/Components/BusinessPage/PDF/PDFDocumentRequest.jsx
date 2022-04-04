// Libraries
import React, { useState } from "react";
import { useSelector } from "react-redux";
// Styling
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";

// Components
import PDFDocumentProvider from "./PDFDocumentProvider";
import PDFDocumentProducts from "./PDFDocumentProducts";
import pdfIcon from "../../../assets/icons/file-pdf.svg";

//** Componet **//
const PDFDocumentRequest = ({ productsData, profileData, date }) => {
  const [error, setError] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [pdfData, setPdfData] = useState(productsData);
  const [profile, setProfileData] = useState(profileData);
  const [attempts, setAttempts] = useState(0);

  const productDetails = useSelector((s) => s.product.allProducts);
  const currentBusinessProfile = useSelector((s) => s.users.user);

  const fetchData = () => {
    setRequesting(true);
    try {
      console.log("Requesting DocumentData");
      setPdfData(productDetails);
      setProfileData(currentBusinessProfile);
      setRequesting(false);
    } catch (error) {
      setError(true);
      setRequesting(false);
      setAttempts(attempts + 1);
      console.error(error);
    }
  };
  return (
    <>
      {!requesting && !pdfData && !error && (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-top`}>
              click to compile <strong>Price List</strong>.
            </Tooltip>
          }
        >
          <Button
            id="pdf-button"
            onClick={() => fetchData()}
            variant="secondary"
          >
            <Image src={pdfIcon} alt="pdf-icon" />
          </Button>
        </OverlayTrigger>
      )}
      {requesting && <span>retrieving document...</span>}
      {pdfData && !requesting && !error && (
        <PDFDocumentProvider
          title={`"Pricelist" + ${profile.businessname}`}
          document={
            <PDFDocumentProducts data={pdfData} profile={profile} date={date} />
          }
        />
      )}
      {!requesting && error && (
        <>
          <span>There has been an error. </span>
          {attempts < 3 ? (
            <span className="clickable" onClick={() => fetchData()}>
              Please try again.
            </span>
          ) : (
            <span>Please try again later.</span>
          )}
        </>
      )}
    </>
  );
};

export default PDFDocumentRequest;
