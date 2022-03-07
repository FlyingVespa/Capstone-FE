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
        {({ url, loading, error }) => {
          if (loading) {
            return (
              <span>
                <Button
                  variant="outline-secondary"
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
                  />
                  Loading Price List...
                </Button>
              </span>
            );
          }
          if (!loading) {
            return (
              <Button variant="outline-success" className="float-end" size="sm">
                <a
                  href={url}
                  variant="outline-success"
                  download
                  size="sm"
                  id="pdf-button"
                >
                  Price List <GrDocumentPdf />
                </a>
              </Button>
            );
          }
          if (error) {
            console.error(error);
            return (
              <Button
                variant="outline-warning"
                size="sm"
                disabled
                className="float-end"
              >
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
