import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SearchOutput = ({ user }) => {
  return (
    <Link to={`/business/${user._id}`}>
      <div className="d-flex">
        <Avatar src={user.info.img_user} />
        <p>{user.basic.name}</p>
      </div>
    </Link>
  );
};

export default SearchOutput;
