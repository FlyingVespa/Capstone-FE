// libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useParams } from "react-router-dom";

import { Avatar, IconButton, Chip, Fab } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

// components
import {
  getProductData,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../../network/lib/products";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import TableLoader from "../Loaders/TableLoader";
import { defaultColumnDef, convertDate, chipColor } from "./agGridOptions,";
const URL = process.env.REACT_APP_API_URL;
////////////////////////////////////////////////////////////////////////////////////
const GridData = ({ data }) => {
  let params = useParams();
  let dispatch = useDispatch();

  const addProductModal = useSelector((s) => s.helper.addProductModal);
  const updateProductModal = useSelector((s) => s.helper.updateProductModal);

  const userId = data._id;
  const [formData, setFormData] = useState({});
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState();
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [colDefs, setColDefs] = useState([
    {
      field: "#",
      headerName: "#",
      minWidth: 30,
      valueGetter: "node.rowIndex + 1",
      rowDrag: true,
      sortable: false,
      filter: false,
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 30,
      cellRendererFramework: ({ value }) => (
        <div>
          <Avatar src={value} />
        </div>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      minWidth: 40,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 20,
    },
    {
      field: "units",
      headerName: "Units",
      minWidth: 20,
    },
    {
      field: "desc",
      headerName: "Description",
      minWidth: 20,
    },
    {
      minWidth: 30,
      field: "stocklevel",
      headerName: "Stock Level",
      cellRendererFramework: ({ value }) => (
        <div>
          <Chip label={value} color={chipColor(value)} />
        </div>
      ),
    },
    {
      field: "createdAt",
      minWidth: 40,
      headerName: "Date Added",
      cellRenderer: convertDate,
    },
    {
      field: "updatedAt",
      minWidth: 40,
      headerName: "Last Updated",
      cellRenderer: convertDate,
    },

    {
      field: "actions",
      headerName: "Actions",
      cellRendererFramework: ({ data }) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => {
              handleUpdate(data);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handleDelete(data);
            }}
          >
            <DeleteForever />
          </IconButton>
        </div>
      ),
    },
  ]);

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

  const handleUpdate = async (oldData) => {
    await setFormData(oldData);
    await handleUpdateModal();
  };

  const handleDelete = async (data) => {
    await deleteProduct(userId, data);
  };

  const handleUpdateProduct = async () => {
    if (selectedFile) {
      let fd = new FormData();
      await fd.append("image", selectedFile);
      await fd.append("name", selectedFile.name);
      await fd.append("product", formData.product);
      await fd.append("units", formData.units);
      await fd.append("description", formData.description);
      await fd.append("price", formData.price);
      await fd.append("status", formData.status);
      await updateProduct(userId, fd);
      // getProductData(userId, setRowData);
      handleUpdateModal();
    } else {
      await updateProduct(userId, formData);
      // getProductData(userId, setRowData);
      handleUpdateModal();
    }
  };

  const handleAddProduct = async () => {
    if (selectedFile !== undefined && selectedFile !== "") {
      let fd = new FormData();
      await fd.append("image", selectedFile);
      await fd.append("name", selectedFile.name);
      await fd.append("product", formData.product);
      await fd.append("units", formData.units);
      await fd.append("description", formData.description);
      await fd.append("price", formData.price);
      await fd.append("status", formData.status);
      await addProduct(userId, fd);
      // getProductData(userId, setRowData);
      handleAddModal();
    } else {
      await addProduct(userId, formData);
      // getProductData(userId, setRowData);
      handleAddModal();
    }
  };

  const onGridReady = async (params) => {
    console.log("AgGridWithUseState Grid Ready");
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.showLoadingOverlay();
    params.api.setDomLayout("autoHeight");
    window.onresize = () => {
      params.api.sizeColumnsToFit();
    };
    params.api.sizeColumnsToFit();
  };
  const [selectedFile, setSelectedFile] = useState();

  const fileChangedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("selected file", selectedFile);
  };
  useEffect(() => {
    getProductData(userId, setRowData);
  }, []);

  return (
    <div className="ag-theme-material m-5">
      <div className="my-3">
        <Fab color="primary" variant="extended" onClick={handleAddModal}>
          <AddIcon /> Add New Item
        </Fab>
      </div>
      <>
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
        {data && (
          <div className="table-container">
            <AgGridReact
              rowDragManaged={true}
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColumnDef}
              onGridReady={onGridReady}
              enableRangeSelection={true}
              frameworkComponents={{
                customLoadingOverlay: TableLoader,
              }}
              loadingOverlayComponent={`customLoadingOverlay`}
              className="mb-4"
            >
              <AgGridColumn field="#" rowDrag={true}></AgGridColumn>
              <AgGridColumn field="image"></AgGridColumn>
              <AgGridColumn field="name"></AgGridColumn>
              <AgGridColumn field="units"></AgGridColumn>
              <AgGridColumn field="description"></AgGridColumn>
              <AgGridColumn field="price"></AgGridColumn>
              <AgGridColumn field="status"></AgGridColumn>
              <AgGridColumn field="createdAt"></AgGridColumn>
              <AgGridColumn field="updatedAt"></AgGridColumn>
              <AgGridColumn field="actions"></AgGridColumn>
            </AgGridReact>
          </div>
        )}
      </>
    </div>
  );
};

export default GridData;
