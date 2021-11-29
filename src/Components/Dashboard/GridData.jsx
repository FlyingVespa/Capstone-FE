// libraries
import axios from "axios";
import { handleFormSubmit } from "../../network/fetch.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
// styling
import { Avatar, Button, IconButton } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

// components
import AddUpdateProductModal from "./AddUpdateProductModal";
import { defaultColumnDef } from "./agGridOptions,";
const URL = process.env.REACT_APP_API_URL;

////////////////////////////////////////////////////////////////////////////////////
const initialValue = {
  product: "",
  price: "",
  amount: "",
  units: "",
  status: "",
  image: "",
};
const GridData = () => {
  const loggedUser = useSelector((s) => s.users.loggedUser);
  const userId = loggedUser._id;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  const onChange = ({ target }) => {
    const { value, name } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const convertDate = (data) => {
    return data.value ? new Date(data.value).toLocaleDateString() : "";
  };

  // const handleFormSubmit = () => {
  //   if (formData.id) {
  //     axios
  //       .put(`${URL}/business/${userId}/products/${formData.id}`, formData)
  //       .then((res) => {
  //         console.log(JSON.stringify(res.data));
  //         getProductData();
  //         handleClose();
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } else {
  //     axios
  //       .post(`${URL}/business/${userId}/products`, formData)
  //       .then((res) => {
  //         console.log(JSON.stringify(res.data));
  //         getProductData();
  //         handleClose();
  //       })

  //       .then(
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: "Product Successfully Added",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         })
  //       )
  //       .catch(
  //         (error) =>
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "error",
  //             title: "Could not add product, please try again",
  //             showConfirmButton: false,
  //             timer: 3500,
  //           }) && handleClose()
  //       );
  //   }
  // };

  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
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
      cellRenderer: "nameFieldComponent",
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
          <IconButton
            color="error"
            onClick={() => handleProductDelete(data.id)}
          >
            <DeleteForever />
          </IconButton>
        </div>
      ),
    },
  ]);

  const handleProductDelete = (productId) => {
    axios
      .delete(`${URL}/business/${userId}/products/${productId}`)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        getProductData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProductData = async () => {
    try {
      const response = await fetch(`${URL}/business/${userId}/products`);
      if (response.ok) {
        const productData = await response.json();
        setRowData(productData);
        console.log(productData);
        console.log("üser", userId);
      } else {
        throw new Error("Could access data, but something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getProductData(), []);

  const onGridReady = async (params) => {
    console.log("AgGridWithUseState Grid Ready");
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    window.onresize = () => {
      params.api.sizeColumnsToFit();
    };
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="ag-theme-material" style={{ height: 600 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Product
      </Button>

      <AddUpdateProductModal
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
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
        <AgGridColumn field="unit"></AgGridColumn>
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
