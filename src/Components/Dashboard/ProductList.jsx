import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";

const ProductList = () => {
  const [tableData, setTableData] = useState({});
  const columns = [
    // { field: "id", headerName: "ID", width: 40 },
    { field: "id", headerName: "ID", width: 140 },
    { field: "title", headerName: "Title", width: 140, editable: true },
    { field: "body", headerName: "body", width: 140, editable: true },
    // { field: "product", headerName: "Product", width: 130, editable: true },
    // { field: "price", headerName: "Price", width: 80, editable: true },
    // { field: "units", headerName: "Units", width: 130, editable: true },
    // { field: "status", headerName: "Status", width: 130, editable: true },
    // { field: "status", headerName: "Status", width: 130, editable: true },
    // {
    //   field: "firstName",
    //   headerName: "First name",
    //   width: 130,
    //   editable: true,
    // },
    // { field: "lastName", headerName: "Last name", width: 130, editable: true },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   width: 160,
    //   valueGetter: getFullName,
    // },
  ];
  const getData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
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
