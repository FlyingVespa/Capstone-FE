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
} from "react-bootstrap";
import "./carousel.css";
import GeneralMap from "./HomePage/GeneralMap";
import BusinessCard from "./HomePage/BusinessCard";
const HomePage = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [companies, setCompanies] = useState([]);
  const [searchCategory, setSearchCategory] = useState("business");
  const [radioValue, setRadioValue] = useState("1");

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
    try {
      const res = await axios.get(`${URL}/business`);
      let data = await res.data;
      await setCompanies(data);
      console.log("companies", companies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllBusinessTypes();
  }, []);

  return (
    <div id="page">
      <Container className="homepage mt-5">
        <h1></h1>
        <Row>
          <Col xs={5}>
            <Row>
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
                            onChange={(e) =>
                              setRadioValue(e.currentTarget.value)
                            }
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
              {companies && (
                <>
                  {companies.slice(0, 7).map((item, i) => (
                    <Col lg={6} md={12} id="buscard" className="p-1">
                      <BusinessCard item={item} />
                    </Col>
                  ))}
                </>
              )}
            </Row>
          </Col>
          <Col xs={7}>
            {/* <GeneralMap companies={companies} searchCategory={searchCategory} /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
