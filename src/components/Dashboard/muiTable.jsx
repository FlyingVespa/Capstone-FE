import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";

import { useSnackbar } from "notistack";

// styling
import { Container, Table, Button, Form, ButtonGroup } from "react-bootstrap";
// components
import { styled } from "@mui/material/styles";
import empty from "../../assets/images/empty.svg";

import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";

import Avatar from "@mui/material/Avatar";

import {
  getProductData,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../../network/lib/products";
const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

//  to export
function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <img src={empty} style={{ height: "400px" }} />
    </StyledGridOverlay>
  );
}

const DATATABLE = () => {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((s) => s.users.user);
  let userId = user._id;
  const fileChangedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("selected file", selectedFile);
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/business/${user._id}/products`
      );
      await setProducts(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "image",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.value} />
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Product",
      flex: 1.5,
      editable: true,
      position: "sticky",
    },

    {
      field: "description",
      headerName: "Description",
      type: "number",
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title={params.value} placement="bottom-end">
              <p>{params.value}</p>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      sortable: false,
      flex: 0.5,
      align: "center",
    },
    {
      field: "units",
      headerName: "Units",
      sortable: true,
      flex: 0.5,
      align: "center",
    },
    {
      align: "center",
      field: "status",
      headerName: "Stock Level",
      sortable: false,
      flex: 1.3,
      renderCell: (params) => {
        switch (params.value) {
          case "high":
            return (
              <p className="stocklevel" data-status="high">
                High
              </p>
            );
          case "medium":
            return (
              <p className="stocklevel" data-status="medium">
                Medium
              </p>
            );
          case "low":
            return (
              <p className="stocklevel" data-status="low">
                Low
              </p>
            );
          case "out-of-stock":
            return (
              <p className="stocklevel" data-status="out-of-stock">
                Out Of Stock
              </p>
            );
          default:
            <p className="stocklevel">Unkown</p>;
            break;
        }
      },
    },
    {
      align: "center",
      field: "_id",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() =>
                deleteProduct(
                  params.row.businessId,
                  params.row._id,
                  fetchProducts
                )
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="small">
              <EditIcon fontSize="small" onClick={() => passdata(params.row)} />
            </IconButton>
          </>
        );
      },
    },
  ];

  const passdata = async (params) => {
    await setFormData(params);
    handleUpdateModal();
  };
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [selectionModel, setSelectionModel] = useState([]);

  const addProductModal = useSelector((s) => s.helper.addProductModal);
  const updateProductModal = useSelector((s) => s.helper.updateProductModal);

  const handleAddModal = () => {
    dispatch({ type: "SET_ADD_MODAL", payload: !addProductModal });
  };
  const handleUpdateModal = () => {
    dispatch({ type: "SET_UPDATE_MODAL", payload: !updateProductModal });
  };
  const onChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(target.value);
  };

  const handleUpdateProduct = async () => {
    if (selectedFile) {
      let fd = new FormData();
      fd.append("image", selectedFile);
      await fd.append("name", selectedFile.name);
      fd.append("product", formData.name);
      fd.append("units", formData.units);
      fd.append("description", formData.description);
      fd.append("price", formData.price);
      fd.append("status", formData.status);
      await updateProduct(userId, formData._id, formData);
      await handleUpdateModal();
      setTimeout(() => fetchProducts(), 1000);
    } else {
      await updateProduct(userId, formData._id, formData);
      handleUpdateModal();
      setTimeout(() => fetchProducts(), 1000);
    }
  };

  const handleAddProduct = async () => {
    if (selectedFile !== undefined && selectedFile !== "") {
      let fd = new FormData();
      await fd.append("image", selectedFile);
      // await fd.append("name", selectedFile.name);
      await fd.append("name", formData.product);
      await fd.append("units", formData.units);
      await fd.append("description", formData.description);
      await fd.append("price", formData.price);
      await fd.append("status", formData.status);
      await addProduct(userId, fd);
      await handleAddModal();
      setTimeout(() => fetchProducts(), 1000);
    } else {
      await addProduct(userId, formData);
      handleAddModal();
      setTimeout(() => fetchProducts(), 1000);
    }
  };

  return (
    <>
      <Container>
        <div style={{ height: "65vh", width: "100%" }}>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddModal}
          >
            Add record
          </Button>
          {products && !loading && (
            <DataGrid
              // autoHeight={false}
              disableSelectionOnClick
              rows={products}
              columns={columns}
              autoPageSize={true}
              pageSize={15}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row._id}
              editMode="row"
              rowHeight={45}
              components={{
                Toolbar: GridToolbar,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              sx={{
                boxShadow: 5,
                backgroundColor: "#fff",
                borderRadius: 3,
                borderColor: "grey.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                m: 2,
                padding: 2,
              }}
            />
          )}
        </div>
      </Container>
      <AddProductModal
        open={addProductModal}
        handleAddModal={handleAddModal}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleAddProduct}
        fileChangedHandler={fileChangedHandler}
      />
      <UpdateProductModal
        open={updateProductModal}
        handleUpdateModal={handleUpdateModal}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleUpdateProduct}
        fileChangedHandler={fileChangedHandler}
      />
    </>
  );
};
export default DATATABLE;
