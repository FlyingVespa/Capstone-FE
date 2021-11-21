import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";

const ProductList = ({ URL }) => {
  const [tableData, setTableData] = useState({});
  const columns = [
    { field: "id", headerName: "ID", width: 140 },
    { field: "businessid", headerName: "business", width: 40 },
    { field: "product", headerName: "Product", width: 130, editable: true },
    { field: "price", headerName: "Price", width: 80, editable: true },
    { field: "units", headerName: "Units", width: 130, editable: true },
    { field: "status", headerName: "Status", width: 130, editable: true },
    { field: "image", headerName: "Image", width: 130, editable: true },
 
  ];
  const getData = async () => {
    console.log("click");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/business/override/dashboard`
      );
      if (response.ok) {
        const productData = await response.json();
        await setTableData(productData);
        console.log(productData);
      } else {
        throw new Error("Could access data, but something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product_list_grid">
      <Button onClick={getData}>fetch</Button>
      <DataGrid
        checkboxSelection
        pageSize={10}
        rows={tableData}
        columns={columns}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};
export default ProductList;
