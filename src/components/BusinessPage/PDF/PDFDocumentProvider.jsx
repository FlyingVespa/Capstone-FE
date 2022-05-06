import { useState, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import {
  Spinner,
  Button,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { GrDocumentPdf } from "react-icons/gr";
import pdfIcon from "../../../assets/icons/file-pdf.svg";

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
                <Button variant="outline-secondary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    size="sm"
                  />
                </Button>
              </span>
            );
          }
          if (!loading) {
            return (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    click to download <strong>Price List</strong>.
                  </Tooltip>
                }
              >
                <Button variant="outline-success" className="float-end">
                  <a
                    href={url}
                    variant="outline-success"
                    download
                    size="sm"
                    id="pdf-button"
                  >
                    <Image src={pdfIcon} alt="pdf-icon" />
                  </a>
                </Button>
              </OverlayTrigger>
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
