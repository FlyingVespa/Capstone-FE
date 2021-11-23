import React, { useState, useEffect, useRef, useMemo } from "react";
import { Avatar } from "@mui/material";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Row, Col } from "react-bootstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import NameFieldComponent from "./NameFieldComponene";

// MODEL
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Autocomplete,
} from "@mui/material";

import Draggable from "react-draggable";

// MODEL END

const GridData = () => {
  //
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  //
  console.log("AgGridWithUseState Render");
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [visibilityColumn, setVisibilityColumn] = useState(false);
  const [frameworkComponents, setFrameworkComponents] = useState({
    nameFieldComponent: NameFieldComponent,
  });

  let imagesource = ({ value }) =>
    `<div style="height: 50px; width: 50px;  border: black solid 2px; border-radius: 15px; overflow: hidden ; display: block; margin-left: auto; margin-right: auto;">
        <img alt="product" className="grid-product-image" src=${value} style="  max-width: 100%; max-height: 100%;  display: block; margin-left: auto; margin-right: auto;" />
    </div>`;
  const [colDefs, setColDefs] = useState([
    {
      field: "drag",
      headerName: ".",
      lockPosition: true,
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

      cellRenderer: (data) => {
        return data.value ? new Date(data.value).toLocaleDateString() : "";
      },
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      cellRenderer: (data) => {
        return data.value ? new Date(data.value).toLocaleDateString() : "";
      },
    },
    {
      field: "delete",
      headerName: "Del",
      cellRenderer: "nameFieldComponent",
    },
  ]);

  const converted = new Date().toLocaleDateString();

  const getProductData = async (params) => {
    console.log("click");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/business/override/dashboard`
      );
      if (response.ok) {
        const productData = await response.json();
        setRowData(productData);
        console.log(productData);
      } else {
        throw new Error("Could access data, but something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  var gridOptions = {
    colDefs: colDefs,
    rowData: null,
    enableColResize: true,
    onColumnResized: function (params) {
      console.log(params);
    },
  };

  useEffect(() => getProductData(), []);

  const defaultColumnDef = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true,

    animateRows: true,
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

  const onNuttin = () => {
    gridApi.showLoadingOverlay();
    // const selectedNodes = gridApi.getSelectedNodes();
    // const selectedData = selectedNodes.map((node) => node.data);
    // const selectedDataString = selectedData
    //   .map(
    //     (node) => `${node.product} ${node.price} ${node.status} ${node.units} `
    //   )
    //   .join(", ");
    // alert(`Selected Nodes: ${selectedDataString}`);
  };

  const toggleColumn = () => {
    gridColumnApi.setColumnsVisible(["product", "price"], visibilityColumn);
    setVisibilityColumn(!visibilityColumn);
  };

  const onRemoveSelected = () => {
    const selectedData = gridApi.getSelectedRows();
    const res = gridApi.applyTransaction({ remove: selectedData });
    console.log(res);
  };
  const addProduct = () => {};
  return (
    <div className="ag-theme-material" style={{ height: 400 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add New Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            A product can only have one unique name, if product already exists
            update existing product
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="product"
            label="Product Name"
            fullWidth
            variant="standard"
          />
          <Row>
            <Col>
              <TextField
                autoFocus
                margin="dense"
                name="price"
                label="Price"
                variant="standard"
              />
            </Col>
            <Col>
              <Autocomplete
                autoFocus
                margin="dense"
                variant="standard"
                options={units}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Units"
                    variant="standard"
                    margin="dense"
                  />
                )}
              />
            </Col>
          </Row>
          <TextField
            autoFocus
            margin="dense"
            name="image"
            label="Image"
            variant="standard"
          />
          <Autocomplete
            autoFocus
            margin="dense"
            variant="standard"
            options={status}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Status"
                variant="standard"
                margin="dense"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>

      <button onClick={() => onRemoveSelected()}>Remove Selected</button>
      <Button onClick={onNuttin}>SlectedRows</Button>
      <Button onClick={toggleColumn}>Toggle Column</Button>
      <Button onClick={addProduct}>Add Product</Button>
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

        // frameworkComponents={frameworkComponents}
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
      <p>{converted}</p>
    </div>
  );
};

const units = [
  { label: "kg" },
  { label: "each" },
  { label: "g" },
  { label: "l" },
  { label: "ml" },
  { label: "mm" },
  { label: "cm" },
  { label: "m" },
];

const status = [
  { label: "High" },
  { label: "Low" },
  { label: "Out of Stock" },
  { label: "Medium" },
];
export default GridData;
