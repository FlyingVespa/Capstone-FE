import { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

function SearchBar({ users }) {
  const [query, setQuery] = useState({});

  return (
    <Container className="searchBar">
      <Form action="">
        <div class="p-1 bg-light rounded rounded-pill shadow-sm my-5">
          <div class="input-group">
            <input
              type="search"
              placeholder="Search for a store by name, product or type..."
              aria-describedby="btn-search"
              class="form-control border-0 bg-light"
            />
            <div class="input-group-append">
              <button
                id="btn-search"
                type="submit"
                class="btn btn-link text-primary"
              >
                <IoSearch />
              </button>
            </div>
          </div>
        </div>
      </Form>

      {users &&
        users
          .filter((user) =>
            (user.name + user.surname)
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .map((user) => (
            <Link to={`/business/${user._id}`}>
              <div className={`d-flex align-items-center `}>
                <img
                  src={user.info.img_user}
                  onError={(e) =>
                    (e.target.src =
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png")
                  }
                  alt=""
                />
                <div>
                  {user.basic.name} {user.locaion.city}
                </div>
              </div>
            </Link>
          ))}
    </Container>
  );
}

export default SearchBar;
