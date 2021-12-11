// libraries
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
// styling
import { Avatar, Button, IconButton, Chip, Box, Skeleton } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

// components
import {
  getProductData,
  deleteProduct,
  addUpdateProduct,
} from "../../network/lib/products";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import TableLoader from "../Loaders/TableLoader";
import { defaultColumnDef, convertDate, chipColor } from "./agGridOptions,";
const URL = process.env.REACT_APP_API_URL;

////////////////////////////////////////////////////////////////////////////////////
const GridData = ({ user }) => {
  let params = useParams();
  let dispatch = useDispatch();

  const addProductModal = useSelector((s) => s.helper.productModal);
  const updateProductModal = useSelector((s) => s.helper.updateModal);

  const userId = user._id;
  const [formData, setFormData] = useState({
    product: "Test",
    price: "1",
    amount: "1",
    units: "kg",
    status: "high",
    image: "",
  });
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState();
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  useEffect(() => {
    getProductData(userId, setRowData);
    console.log(userId);
  }, []);

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
      field: "amount",
      headerName: "amount",
      minWidth: 20,
    },
    {
      minWidth: 30,
      field: "status",
      headerName: "Status",
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
          <IconButton color="primary">
            <Edit onClick={() => handleUpdate(userId, data, setRowData)} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteProduct(data, userId, setRowData)}
          >
            <DeleteForever />
          </IconButton>
        </div>
      ),
    },
  ]);

  const handleAddModal = () => {
    dispatch({ type: "SET_MODAL", payload: !addProductModal });
  };
  const handleUpdateModal = () => {
    dispatch({ type: "SET_UPDATE_MODAL", payload: !updateProductModal });
  };
  const onChange = ({ target }) => {
    const { value, name } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (oldData) => {
    await setFormData(oldData);
    handleUpdateModal();
  };

  const handleFormSubmit = async () => {
    if (selectedFile !== undefined && selectedFile !== "") {
      let fd = new FormData();
      fd.append("image", selectedFile);
      fd.append("name", selectedFile.name);
      fd.append("product", formData.product);
      fd.append("units", formData.units);
      fd.append("amount", formData.amount);
      fd.append("price", formData.price);
      await addUpdateProduct(fd, userId);
    } else {
      addUpdateProduct(userId, formData, setRowData);
    }

  
  };

  const onGridReady = async (params) => {
    console.log("AgGridWithUseState Grid Ready");
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.showLoadingOverlay();
    params.api.setDomLayout("autoHeight");
    getProductData(userId, setRowData);
    window.onresize = () => {
      params.api.sizeColumnsToFit();
    };
    params.api.sizeColumnsToFit();
  };
  const [selectedFile, setSelectedFile] = useState();
  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  return (
    <div
      className="ag-theme-material"
      style={{ width: "100%", height: "100%;" }}
    >
      <Button variant="outlined" onClick={handleAddModal}>
        Add New Product
      </Button>

      {loading !== true ? (
        <>
          <AddProductModal
            open={!addProductModal}
            handleClose={handleAddModal}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
            fileChangedHandler={fileChangedHandler}
          />
          <UpdateProductModal
            open={!updateProductModal}
            handleClose={handleUpdateModal}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
            fileChangedHandler={fileChangedHandler}
          />

          <AgGridReact
            rowDragManaged={true}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColumnDef}
            onGridReady={onGridReady}
            enableRangeSelection={true}
            pagination={true}
            paginationPageSize={12}
            frameworkComponents={{
              customLoadingOverlay: TableLoader,
            }}
            loadingOverlayComponent={`customLoadingOverlay`}
          >
            <AgGridColumn field="#" rowDrag={true}></AgGridColumn>
            <AgGridColumn field="image"></AgGridColumn>
            <AgGridColumn field="product"></AgGridColumn>
            <AgGridColumn field="units"></AgGridColumn>
            <AgGridColumn field="price"></AgGridColumn>
            <AgGridColumn field="status"></AgGridColumn>
            <AgGridColumn field="createdAt"></AgGridColumn>
            <AgGridColumn field="updatedAt"></AgGridColumn>
            <AgGridColumn field="delete"></AgGridColumn>
          </AgGridReact>
        </>
      ) : (
        <TableLoader />
      )}
    </div>
  );
};

export default GridData;
