import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";

// styling
import { Container, Button } from "react-bootstrap";
// components
import { styled } from "@mui/material/styles";
import empty from "../../assets/images/empty.svg";

import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";

import Avatar from "@mui/material/Avatar";

import { deleteProduct, updateProduct } from "../../network/lib/products";
import { CustomToolbar, CustomNoRowsOverlay } from "./tableSettings.js";

const DATATABLE = () => {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState();

  const addProductModal = useSelector((s) => s.helper.addProductModal);
  const updateProductModal = useSelector((s) => s.helper.updateProductModal);
  const user = useSelector((s) => s.users.user);

  // const userId = user._id;

  const handleAddModal = () => {
    dispatch({ type: "SET_ADD_MODAL", payload: !addProductModal });
  };
  const handleUpdateModal = async (params) => {
    dispatch({ type: "SET_UPDATE_MODAL", payload: !updateProductModal });
  };

  const onChangeSetFormData = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
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

  const handleEdit = async (params) => {
    await setFormData(params);
    handleUpdateModal();
  };

  useEffect(() => {
    fetchProducts();
    console.log(selectedFile);
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
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                handleEdit(params.row);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Container>
        <div style={{ height: "65vh", width: "100%" }}>
          {products && !loading && (
            <DataGrid
              autoHeight={true}
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
                Toolbar: CustomToolbar,
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
        fetchProducts={fetchProducts}
      />
      <UpdateProductModal
        open={updateProductModal}
        handleUpdateModal={handleUpdateModal}
        fetchProducts={fetchProducts}
        onChangeSetFormData={onChangeSetFormData}
        data={formData}
      />
    </>
  );
};
export default DATATABLE;
