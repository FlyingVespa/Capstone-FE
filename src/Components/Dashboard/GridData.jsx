// libraries
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
// styling
import { Avatar, Button, IconButton, Chip } from "@mui/material";
import { red, teal, lightGreen, orange, grey } from "@mui/material/colors";
import { DeleteForever, Edit } from "@mui/icons-material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

// components
import {
  getProductData,
  deleteProduct,
  addUpdateProduct,
} from "../../network/lib/products";
import AddUpdateProductModal from "./AddUpdateProductModal";
import { defaultColumnDef, convertDate } from "./agGridOptions,";
const URL = process.env.REACT_APP_API_URL;

////////////////////////////////////////////////////////////////////////////////////
const GridData = () => {
  const initialValue = {};
  let params = useParams();
  let dispatch = useDispatch();
  const loggedUser = useSelector((s) => s.users.loggedUser);
  const modalStatus = useSelector((s) => s.helper.productModal);
  const userId = loggedUser._id;
  const [formData, setFormData] = useState({
    product: "Test",
    price: "1",
    amount: "1",
    units: "kg",
    status: "high",
    image: "",
  });
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  let chipColor = (value) => {
    switch (value) {
      case "medium":
        return "secondary";
      case "low":
        return "warning";
      case "high":
        return "success";
      case "out-of-stock":
        return "error";
      case "":
        return "secondary";
      default:
        return "secondary";
    }
  };
  const [colDefs, setColDefs] = useState([
    {
      field: "#",
      headerName: "#",
      minWidth: 30,
      valueGetter: "node.rowIndex + 1",
      // checkboxSelection: true,
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
            <Edit onClick={() => handleUpdate(data)} />
          </IconButton>
          <IconButton color="error" onClick={() => deleteProduct(data, userId)}>
            <DeleteForever />
          </IconButton>
        </div>
      ),
    },
  ]);

  const [previewSource, setPreviewSource] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageUpload = () => {
    if (formData.image) {
      let fd = new FormData();
      fd.append("image", formData.image);
    }
  };

  const handleProductModal = () => {
    dispatch({ type: "SET_PRODUCT_MODAL", payload: !modalStatus });
  };

  const onChange = ({ target }) => {
    const { value, name } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleProductModal();
  };

  const handleFormSubmit = async () => {
    await addUpdateProduct(formData, selectedFile, userId);
    getProductData();
    handleProductModal();
  };

  useEffect(() => getProductData(userId, setRowData), []);

  const onGridReady = async (params) => {
    console.log("AgGridWithUseState Grid Ready");
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    window.onresize = () => {
      params.api.sizeColumnsToFit();
    };
    params.api.sizeColumnsToFit();
  };
  const [selectedFile, setSelectedFile] = useState();
  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    let fd = new FormData();
    fd.append("image", file);
    fd.append("name", file.name)
    setPreviewSource(file);
    setFormData({ image: fd });

    console.log(file);
    console.log("file", formData);
  };

  return (
    <div className="ag-theme-material" style={{ height: 400 }}>
      <Button variant="outlined" onClick={handleProductModal}>
        Add New Product
      </Button>

      <AddUpdateProductModal
        open={modalStatus}
        handleClose={handleProductModal}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
        fileChangedHandler={fileChangedHandler}
        previewSource={previewSource}
      />

      <AgGridReact
        rowDragManaged={true}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColumnDef}
        onGridReady={onGridReady}
        enableRangeSelection={true}
        pagination={true}
        paginationPageSize={10}
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
    </div>
  );
};

export default GridData;
