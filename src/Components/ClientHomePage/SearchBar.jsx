import React from "react";
import { Form, Container } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

function SearchBar() {
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
    </Container>
  );
}

export default SearchBar;
