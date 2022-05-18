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
import { previousThursday } from "date-fns";
const HomePage = () => {
  let log = console.log();
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
  const [filterCompanyData, setFiltereCompanyData] = useState([]);

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
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/products`);
      let data = await res.data;
      await setAllProducts(data);
      console.log("products", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBusinessTypes();
  }, []);
  useEffect(() => {
    fetchAllProducts();
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

  // useEffect(() => {
  //   console.log("data props", searchQuery);
  //   // setFilteredData(
  //   //   companies.filter((item) =>
  //   //     item.businessname.toLowerCase().includes(searchQuery.toLowerCase())
  //   //   )
  //   // );
  //   switch (radioValue) {
  //     case "business":
  //       return setFilteredData(
  //         companies.products.filter((product) => product.name == searchQuery)
  //       );
  //       break;
  //     case "product":
  //       setFilterProducts(
  //         companies.products.filter((item) =>
  //           item.products.map((product) =>
  //             product.toLowerCase().includes(searchQuery.toLowerCase())
  //           )
  //         )
  //       );
  //       break;

  //     default:
  //       break;
  //   }
  // }, [searchQuery, companies]);

  const handleQueryInput = ({ target }) => {
    setSearchQuery(target.value);
  };

  // search all products
  //  return items that contains query save in value searchValue
  // take companies filter searchValues - save in new value
  const filterAllProducts = async () => {
    // let searchedProducts = allProducts.filter((item) =>
    //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // console.log("sP", searchedProducts);
    // let mappedSP = searchedProducts.map((product) => product._id);
    // console.log("mappedSP", mappedSP);

    // let newComp = mappedSP.filter((com) =>
    //   companies.map((c) => c.products.includes(com))
    // );
    // console.log("nC", newComp);
    setLoading(true);
    try {
      const res = await axios.get(
        `${URL}/business?search=${searchQuery.trim()}`
      );
      let data = await res.data;
      await setCompanies(data);
      console.log("data", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //
  // const filterAllProducts = async () => {
  //   if (allProducts.length > 0) {
  //     let filterProductsWithQuery = allProducts.filter((item) =>
  //       item.name.toLowerCase().includes(searchQuery)
  //     );
  //     let pushOnlyBusinessId = filterProductsWithQuery.map(
  //       (item) => item.businessId
  //     );
  //     const listUniqueBusinessIDonly = Array.from(new Set(pushOnlyBusinessId));
  //     console.log("listUniqueBusinessIDonly", listUniqueBusinessIDonly);
  //     console.log("companies", companies);
  //     if (listUniqueBusinessIDonly) {
  //       let arr;
  //       let res = companies.map((element) => {
  //         listUniqueBusinessIDonly.map((el) => element._id === el);
  //         arr = element;
  //       });

  //       setFiltereCompanyData(res);
  //       console.log("res", res);
  //       console.log("arr", arr);
  //     }

  //     return companies.filter((o) =>
  //       Object.keys(o).some((k) => o[k].toLowerCase().includes(searchQuery))
  //     );
  //   }
  // };

  const logS = async () => {
    console.log(searchQuery);
  };
  return (
    <Container className="homepage">
      <Row></Row>
      <Row>
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    className="mx-2"
                    id="main-search-input"
                    value={searchQuery}
                    onChange={handleQueryInput}
                  />
                  {/* <ButtonGroup className="mx-2">
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
                  </ButtonGroup> */}
                  <Button
                    id="main-search-btn"
                    onClick={() => filterAllProducts()}
                  >
                    Search
                  </Button>
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
          <Row id="businesscard">
            {/* {loading ? (
              <BusinessCardLoader />
            ) : (
              filterCompanyData && (
                <>
                  {filterCompanyData.map((item, i) => (
                    <BusinessCard item={item} checked={showOpen} />
                  ))}
                </>
              )
            )} */}
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
