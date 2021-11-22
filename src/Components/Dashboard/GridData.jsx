import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Button } from "react-bootstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

function GridData() {
  dateFormatter(params) {
    return moment(params.value).format('MM/DD/YYYY HH:mm');
  }
 const [rowData, setRowData] = useState([]);
const getDate = new Date()
const converted = getDate.toLocaleDateString();
  const columnDefs = [
   
    { field: "product", headerName: "Product" },
    { field: "price", headerName: "Price" },
    { field: "units", headerName: "Units" },
    { field: "status", headerName: "Status" },
    { field: "image", headerName: "Image" },
    { field: "createdAt", headerName: "Date Added" },
    { field: "updatedAt", headerName: "Last Updated", cellRenderer: (data) => {
      return data.value ? (new Date(data.value)).toLocaleDateString() : ''; }}
  ];
 
// useEffect(() =>onGridReady(),[  ])
  const onGridReady = async (params) => {
    console.log("click");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/business/override/dashboard`
      );
      if (response.ok) {
        const productData = await response.json();
       await params.api.applyTransaction({add: productData})
        setRowData(productData);
        console.log(productData);
      } else {
        throw new Error("Could access data, but something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultColumnDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400,width: 1000 }}>
      <AgGridReact
         rowData={rowData}
         pagination={true}
         paginationAutoPageSize={25}
         columnDefs={columnDefs}
        //  rowModelType="serverSide"
         defaultColumnDef={ {  floatingFilter: true}}
         onGridReady={onGridReady}
        //  domLayout="autoHeight"
      >
        <AgGridColumn field="businessid" ></AgGridColumn>
        <AgGridColumn field="image" ></AgGridColumn>
        <AgGridColumn field="product" ></AgGridColumn>
        <AgGridColumn field="unit" ></AgGridColumn>
        <AgGridColumn field="price" ></AgGridColumn>
        <AgGridColumn field="status"></AgGridColumn>
        <AgGridColumn field="createdAt" ></AgGridColumn>
        <AgGridColumn field="updatedAt" ></AgGridColumn>
      </AgGridReact>
      <p>{converted}</p>
    </div>
  );
}
export default GridData;
