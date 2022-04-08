// libraries
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

// styling
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  ButtonGroup,
  ToggleButton,
  Card,
  Spinner,
} from "react-bootstrap";
import "./carousel.css";
import GeneralMap from "./HomePage/GeneralMap";
import BusinessCard from "./HomePage/BusinessCard";
import BusinessCardLoader from "./Loaders/BusinessCardLoader";
const HomePage = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [companies, setCompanies] = useState([]);
  const [searchCategory, setSearchCategory] = useState("business");
  const [radioValue, setRadioValue] = useState("1");
  const [loading, setLoading] = useState(false);

  const radios = [
    { name: "Product", value: "product" },
    { name: "Service", value: "service" },
    { name: "Business", value: "business" },
  ];
  function handleChange({ target }) {
    setSearchCategory(target.value);
  }
  function handleSubmit(event) {
    alert("Your favorite flavor is: " + searchCategory);
    event.preventDefault();
  }

  const fetchAllBusinessTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/business`);
      let data = await res.data;
      await setCompanies(data);
      setLoading(false);
      console.log("companies", res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBusinessTypes();
  }, []);

  return (
    <Container className="home page">
      <Row>
        <Col md={4}>
          <Row>
            *{" "}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      className="mx-2"
                      id="main-search-input"
                    />
                    <ButtonGroup className="mx-2">
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant={"outline-success"}
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                    <Button id="main-search-btn">Search</Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <h4 className="mt-2">Recently Added Businesses</h4>
          <Row id="businesscard">
            {loading ? (
              <BusinessCardLoader />
            ) : (
              companies && (
                <>
                  {companies.slice(0, 7).map((item, i) => (
                    <Col id="tsts">
                      <BusinessCard item={item} />
                    </Col>
                  ))}
                </>
              )
            )}
          </Row>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>

          {/* <GeneralMap companies={companies} searchCategory={searchCategory} /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
