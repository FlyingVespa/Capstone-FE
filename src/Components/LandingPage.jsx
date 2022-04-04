// Libraries
import { useState, useEffect } from "react";
import cities from "cities.json";
// styling
import shopping from "../assets/images/shopping.svg";
import "./ClientHomePage/clienthomepage.css";
import {
  Container,
  Col,
  Button,
  InputGroup,
  Row,
  Image,
  FormControl,
  FloatingLabel,
  FormSelect,
  Form,
} from "react-bootstrap";
import { setOptions } from "leaflet";
// Components

const LandingPage = () => {
  const [defaultCity, setDefaultCity] = useState("messina");
  const [filterData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("messina");
  const [ops, setOptions] = useState([]);
  const style0 = {
    display: "flex",
    border: " 2px solid red",
    justifyContent: "center",
    alignItems: "center",
    flexFflow: "row wrap",
  };
  const style1 = {
    flexGrow: "1",
  };

  const style2 = {
    border: " 2px solid blue",
    borderRadius: "10px",
    backgroundColor: "#FFF",
  };
  const style3 = {
    border: " 2px solid pink",
    borderRadius: "10px",
    backgroundColor: "#FFF",
  };
  const style4 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: " 2px solid pink",
    borderRadius: "10px",
    backgroundColor: "#FFF",
  };
  let data = cities;

  function checkStockLevel() {
    if (filterData.length > 0 && filterData.length < 5) {
      setOptions(filterData.map((item) => item.name));
    }
  }

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    checkStockLevel();
  }, [searchQuery, data]);
  console.log(filterData);
  console.log(ops);
  return (
    <div style={style0}>
      <Container>
        <Row>
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 1 }}
          >
            <h1>Support the area where you live, work and play</h1>
          </Col>
          <Col
            style={{ marginTop: 0 }}
            xs={{ span: 12, order: 3 }}
            md={{ span: 12, order: 2 }}
            lg={{ span: 6, order: 3 }}
          >
            <Row className="g-2">
              <Col md>
                <FormControl
                  id="product_search"
                  color="success"
                  label="Search Products"
                  type="search"
                  placeholder="Search catalog"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  size="small"
                  className="m-2"
                />
              </Col>
              <input
                list="datalistOptions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Form.Select id="datalistOptions">
                {filterData.length > 0 && filterData.length < 5 ? (
                  filterData.map((item) => <p>{item.name}</p>)
                ) : (
                  <p>null</p>
                )}
              </Form.Select>
              <Col md>
                <Button>Shop Locally</Button>
              </Col>
            </Row>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 12, order: 3 }}
            lg={{ span: 6, order: 2 }}
          >
            <Image src={shopping} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
