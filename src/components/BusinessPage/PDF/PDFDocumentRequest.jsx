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
const PDFDocumentRequest = ({ data, products }) => {
  const [error, setError] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [pdfData, setPdfData] = useState(products);
  const [attempts, setAttempts] = useState(0);

  const currentBusinessProfile = useSelector((s) => s.users.user);
  const getDate = new Date();
  const date = getDate.toLocaleString();
  const fetchData = () => {
    setRequesting(true);
    try {
      console.log("Requesting DocumentData");
      setPdfData(products);
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
          title={`"Pricelist" + ${data.businessname}`}
          document={
            <PDFDocumentProducts data={data} products={pdfData} date={date} />
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
