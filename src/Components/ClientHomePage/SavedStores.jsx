import React from "react";
<<<<<<< Updated upstream
=======
import { useState, useEffect, useRef } from "react";
>>>>>>> Stashed changes
import { Container, Image, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

<<<<<<< Updated upstream
function SavedStores({ users }) {
=======
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
>>>>>>> Stashed changes
  return (
    <Container className="savedStores">
      <p>Saved Stores</p>
      <Row>
        {users.map((user) => (
          <Col>
<<<<<<< Updated upstream
            <Image src={user.info.img_user} />
            <p>{user.basic.name}</p>
=======
            <Link to={`/business/${a._id}`}>
              <Image
                id="newstore"
                src={a.info.img_user}
                name={a._id}
                onClick={handleSelect}
              />
            </Link>
>>>>>>> Stashed changes
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SavedStores;
