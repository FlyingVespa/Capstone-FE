import { useState, useEffect, useRef } from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";


function SavedStores({ user }) {
  const [selected, setSelected] = useState("");

function SavedStores({ user }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const select = useSelector((s) => s.selected);
  const { pathname } = useLocation();

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
      <Row>
        {user.map((a) => (
          <Col>

            <Image
              id="newstore"
              src={a.info.img_user}
              value={a.basic.name}
              onClick={(e) => setSelected(e.target.value)}
            />

            <Link to={`/business/${a._id}`}>
              <Image
                id="newstore"
                src={a.info.img_user}
                name={a._id}
                onClick={handleSelect}
              />
            </Link>

          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SavedStores;
