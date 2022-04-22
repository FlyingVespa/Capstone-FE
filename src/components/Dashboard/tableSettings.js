import { useDispatch, useSelector } from "react-redux";

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

// styling
import { Button } from "react-bootstrap";

// components
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

import Avatar from "@mui/material/Avatar";
import { deleteProduct, updateProduct } from "../../network/lib/products";
import { styled } from "@mui/material/styles";
import empty from "../../assets/images/empty.svg";

export const CustomToolbar = () => {
  let dispatch = useDispatch();
  const addProductModal = useSelector((s) => s.helper.addProductModal);
  const handleAddModal = () => {
    dispatch({ type: "SET_ADD_MODAL", payload: !addProductModal });
  };
  return (
    <>
      <GridToolbarContainer
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button color="primary" onClick={handleAddModal}>
          Add record
        </Button>
        <div>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    </>
  );
};

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

//  to export
export const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <img src={empty} style={{ height: "400px" }} alt="no_rows" />
    </StyledGridOverlay>
  );
};
