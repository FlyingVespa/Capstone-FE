import { useState, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { Spinner, Button } from "react-bootstrap";
import { GrDocumentPdf } from "react-icons/gr";

const PDFDocumentProvider = ({ title, document }) => {
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
                <Button
                  variant="primary"
                  disabled
                  className="float-end"
                  size="sm"
                >
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
            return (
              <Button variant="outline-warning" size="sm" disabled>
                Error to create <GrDocumentPdf /> Pricelist
              </Button>
            );
          }
          return null;
        }}
      </BlobProvider>
    );
  }
};

export default PDFDocumentProvider;
