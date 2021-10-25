import { useState, useEffect, useRef } from "react";
import { Container, Image, Col, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";

function SavedStores({ user }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const select = useSelector((s) => s.selected);
  // const { pathname } = useLocation();
  const [carouselIndex, setIndex] = useState(0);

  const users = Object.keys(user);
  const handleCarouselSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleSelect = (e) => {
    setSelected(e.target.name);
  };

  useEffect(() => {
    dispatch({
      type: "SELECT_BUSINESS",
      payload: selected,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="savedStores">
      <p>Saved Stores</p>
      {user && (
        <Carousel
          touch="true"
          variant="dark"
          interval={15000}
          activeIndex={carouselIndex}
          onSelect={handleCarouselSelect}
        >
          <Carousel.Item>
            <Row>
              {users.map((u) => (
                <Col>
                  <Link to={`/business/${u._id}`}>
                    {/* <Image
                      sx={{ width: 80, height: 80 }}
                      alt="Local_Business"
                      src={u.info.img_user}
                      name={u._id}
                      onClick={handleSelect}
                    /> */}
                  </Link>
                  <p>{u.email}</p>
                  {/* <p>{u.location?.city}</p> */}
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        </Carousel>
      )}
      {/* <Row>
        {user.map((a) => (
          <Col>
            <Link to={`/business/${a._id}`}>
              <Avatar
                alt="Local_Business"
                src={a.info.img_user}
                name={a._id}
                onClick={handleSelect}
              />
            </Link>
          </Col>
        ))}
      </Row> */}
    </Container>
  );
}

export default SavedStores;
