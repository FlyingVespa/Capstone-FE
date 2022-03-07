// Libraries
import React, { useState } from "react";
import { useSelector } from "react-redux";
// Styling

// Components
import PDFDocumentProvider from "./PDFDocumentProvider";
import PDFDocumentProducts from "./PDFDocumentProducts";

//** Componet **//
const PDFDocumentRequest = ({ productsData, profileData }) => {
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
    <p>
      {!requesting && !pdfData && !error && (
        <span className="clickable" onClick={() => fetchData()}>
          Request this document
        </span>
      )}
      {requesting && <span>retrieving document...</span>}
      {pdfData && !requesting && !error && (
        <PDFDocumentProvider
          title="Cost Disclosure Document"
          document={<PDFDocumentProducts data={pdfData} profile={profile} />}
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
    </p>
  );
};

export default PDFDocumentRequest;
