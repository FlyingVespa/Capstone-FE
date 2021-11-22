import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";

const ProductList = ({ URL }) => {
  const [tableData, setTableData] = useState({});
  const columns = [
    { field: "id", headerName: "ID", width: 140 },
    { field: "businessId", headerName: "business", width: 40 },
    { field: "product", headerName: "Product", width: 130, editable: true },
    { field: "price", headerName: "Price", width: 80, editable: true },
    { field: "units", headerName: "Units", width: 130, editable: true },
    { field: "status", headerName: "Status", width: 130, editable: true },
    { field: "createdAt", headerName: "Image", width: 130, editable: true },
    { field: "updatedAt", headerName: "Image", width: 130, editable: true },
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

  useEffect(() => {
    getData();
  }, []);
  const dd = Object.keys(tableData);
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th>{col.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData &&
          dd.map((data) => (
            <tr>
              <td>{data.id}</td>
              <td>{data.product}</td>
              <td>{data.status}</td>
              <td>{data.price}</td>
              <td>{data.untis}</td>
              <td>{data.image}</td>
              <td>{data.businessId}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default ProductList;
