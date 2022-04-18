// libraries
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [showOpen, setShowOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("business");
  const [filterData, setFilteredData] = useState([]);
  const [radioValue, setRadioValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

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
      console.log("data", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBusinessTypes();
  }, []);

  async function handleClick(checkbox) {
    if (checkbox.checked) {
      await setShowOpen(true);
      // companies.filter( item => )
    } else {
      await setShowOpen(false);
    }
  }
  const [searchQuery, setSearchQuery] = useState("");

  const checkService = async (item) => {
    setFilteredData(
      companies.filter(
        item.companydetails.store_services.map((service) =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  };

  useEffect(() => {
    console.log("data props", searchQuery);
    // setFilteredData(
    //   companies.filter((item) =>
    //     item.businessname.toLowerCase().includes(searchQuery.toLowerCase())
    //   )
    // );
    switch (radioValue) {
      case "business":
        setFilteredData(
          companies.filter((item) =>
            item.companydetails.store_services.map((service) =>
              service.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        );
        break;
      case "product":
        setFilterProducts(
          allProducts.filter((item) =>
            item.name.map((product) =>
              product.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        );
        break;

      default:
        break;
    }
  }, [searchQuery, companies]);

  useEffect(() => {
    filterProducts.filter((item) => item.products.tolo);
  });

  return (
    <Container className="homepage">
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  className="mx-2"
                  id="main-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                value={showOpen}
                onClick={(e) => handleClick(e.target)}
              />
            </Form.Group>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Col md={4}>
          <Row id="businesscard">
            {loading ? (
              <BusinessCardLoader />
            ) : (
              companies && (
                <>
                  {filterData.map((item, i) => (
                    <BusinessCard item={item} checked={showOpen} />
                  ))}
                </>
              )
            )}
          </Row>
        </Col>
        <Col md={8}>
          <GeneralMap companies={filterData} searchCategory={searchCategory} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
