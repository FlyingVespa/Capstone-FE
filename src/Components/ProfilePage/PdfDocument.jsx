import { useState, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { Spinner, Button } from "react-bootstrap";
import { GrDocumentPdf } from "react-icons/gr";

const PdfDocument = ({ title, document }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);

  if (!ready) {
    return null;
  } else {
    return (
      <BlobProvider document={document}>
        {({ loading, error }) => {
          if (loading) {
            return (
              <span>
                <Button variant="primary" disabled className="float-end">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading Price List...
                </Button>
              </span>
            );
          }
          if (!loading) {
            return (
              <Button download>
                Price List <GrDocumentPdf />
              </Button>
            );
          }
          if (error) {
            console.error(error);
            return <p>An error occurred</p>;
          }
          return null;
        }}
      </BlobProvider>
    );
  }
};

export default PdfDocument;
