// libraries
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

// styling
import { Container, Col, Row, Carousel } from "react-bootstrap";
import "./carousel.css";
import GeneralMap from "./GeneralMap";
import BusinessCard from "./BusinessCard";
const GeneralPage = () => {
  // var month=new Array(12);
  // month[0]="January";
  // month[1]="February";
  // month[2]="March";
  // month[3]="April";
  // month[4]="May";
  // month[5]="June";
  // month[6]="July";
  // month[7]="August";
  // month[8]="September";
  // month[9]="October";
  // month[10]="November";
  // month[11]="December";

  // var weekday=new Array(7);
  // weekday[0]="Sunday";
  // weekday[1]="Monday";
  // weekday[2]="Tuesday";
  // weekday[3]="Wednesday";
  // weekday[4]="Thursday";
  // weekday[5]="Friday";
  // weekday[6]="Saturday";
  const URL = process.env.REACT_APP_API_URL;
  const [companies, setCompanies] = useState([]);

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
      <Container className="homepage">
        <h1>Find & Buy Local</h1>
        <Row>
          <GeneralMap companies={companies} />
        </Row>

        <h4 className="mt-2">Recently Added Businesses</h4>
        {companies && (
          <div className="row_posters">
            {companies.slice(0, 7).map((item, i) => (
              <>
                <BusinessCard item={item} />
              </>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default GeneralPage;
