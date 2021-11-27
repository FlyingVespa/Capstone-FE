// libraries
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useParams, useHistory } from "react-router-dom";
// styling
import { Button } from "@mui/material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
// components
import NameFieldComponent from "./NameFieldComponene";
import AddProduct from "./AddProduct";
const URL = process.env.REACT_APP_API_URL;

////////////////////////////////////////////////////////////////////////////////////

const GridData = () => {
  let history = useHistory();
  let params = useParams();
  let dispatch = useState();

  const user = useSelector((s) => s.users.user);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertDate = (data) => {
    return data.value ? new Date(data.value).toLocaleDateString() : "";
  };

  console.log("AgGridWithUseState Render");
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [visibilityColumn, setVisibilityColumn] = useState(false);

  let imagesource = ({ value }) =>
    `<div id="grid-ag-image">
        <img alt="product" id="grid-product-image" src=${value} style="" />
    </div>`;
  const [colDefs, setColDefs] = useState([
    {
      field: "drag",
      headerName: "",
      width: 30,
      rowDrag: true,
    },
    {
      field: "number",
      headerName: "No.",

      checkboxSelection: true,
      rowDrag: true,
    },
    {
      field: "image",
      headerName: "Image",
      cellRenderer: imagesource,
    },
    {
      field: "product",
      headerName: "Product",
    },
    {
      field: "price",
      headerName: "Price",
    },
    {
      field: "units",
      headerName: "Units",
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: "nameFieldComponent",
    },
    {
      field: "createdAt",
      headerName: "Date Added",
      cellRenderer: convertDate,
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      cellRenderer: convertDate,
    },

    {
      field: "delete",
      headerName: "Del",
      cellRenderer: "nameFieldComponent",
    },
  ]);

  const getProductData = async () => {
    let userId = user.data._id;

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

  const defaultColumnDef = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = async (params) => {
    console.log("AgGridWithUseState Grid Ready");
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
    window.onresize = () => {
      params.api.sizeColumnsToFit();
    };
  };

  // const toggleColumn = () => {
  //   gridColumnApi.setColumnsVisible(["product", "price"], visibilityColumn);
  //   setVisibilityColumn(!visibilityColumn);
  // };

  // const onRemoveSelected = () => {
  //   const selectedData = gridApi.getSelectedRows();
  //   const res = gridApi.applyTransaction({ remove: selectedData });
  //   console.log(res);
  // };

  return (
    <div className="ag-theme-material" style={{ height: 400 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Product
      </Button>
      <AddProduct handleClose={handleClose} open={open} />

      <AgGridReact
        rowSelection="multiple"
        rowData={rowData}
        pagination={true}
        rowDragManaged={true}
        animateRows={true}
        paginationAutoPageSize={25}
        columnDefs={colDefs}
        defaultColDef={defaultColumnDef}
        onGridReady={onGridReady}
      >
        <AgGridColumn field="drag"></AgGridColumn>
        <AgGridColumn field="number"></AgGridColumn>
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
