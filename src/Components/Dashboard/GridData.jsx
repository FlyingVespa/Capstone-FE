import React, { useState, useEffect, useRef, useMemo } from "react";
import { Avatar } from "@mui/material";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Button } from "react-bootstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
const GridData = () => {
  console.log("AgGridWithUseState Render");
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [visibilityColumn, setVisibilityColumn] = useState(false);

  let imagesource = ({ value }) =>
    `<div style="height: 50px; width: 50px;  border: black solid 2px; border-radius: 15px; overflow: hidden ; display: block; margin-left: auto; margin-right: auto;">
        <img alt="product" className="grid-product-image" src=${value} style="  max-width: 100%; max-height: 100%;  display: block; margin-left: auto; margin-right: auto;" />
    </div>`;
  const [colDefs, setColDefs] = useState([
    {
      field: "number",
      headerName: "No.",
      width: 30,
      checkboxSelection: true,
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
      field:"delete",
      headerName:"Del",
      cellRenderer:`<button ty>Delete</button>`

    }
  ]);
  const getDate = new Date();
  const converted = getDate.toLocaleDateString();

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
    suppressVerticalScroll: true,
    enableColResize: true,
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
    gridApi.sizeColumnsToFit();
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

  return (
    <div className="ag-theme-material" style={{ height: 400 }}>
      <Button onClick={onNuttin}>SlectedRows</Button>
      <Button onClick={toggleColumn}>Toggle Column</Button>
      <AgGridReact
        rowSelection="multiple"
        rowData={rowData}
        pagination={true}
        paginationAutoPageSize={25}
        columnDefs={colDefs}
        defaultColDef={defaultColumnDef}
        onGridReady={onGridReady}
      >
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
export default GridData;
