// library
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// components

import {
  getProductData,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../../network/lib/products";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";

//  styling
import { Button, Chip } from "@mui/material";
// components
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductSettingsItem = ({ item, index }) => {
  let dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const addProductModal = useSelector((s) => s.helper.addProductModal);
  const updateProductModal = useSelector((s) => s.helper.updateProductModal);
  const userId = item.businessId;
  const checkStockLevel = () => {};
  if (item !== undefined && item !== null) {
    checkStockLevel();
  }

  const handleAddModal = () => {
    dispatch({ type: "SET_ADD_MODAL", payload: !addProductModal });
  };
  const handleUpdateModal = () => {
    dispatch({ type: "SET_UPDATE_MODAL", payload: !updateProductModal });
  };
  const onChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(target.value);
  };

  const handleUpdate = async (oldData) => {
    await setFormData(oldData);
    await handleUpdateModal();
  };

  const handleDelete = async (data) => {
    await deleteProduct(userId, data);
  };

  const handleUpdateProduct = async () => {
    if (selectedFile) {
      let fd = new FormData();
      await fd.append("image", selectedFile);
      await fd.append("name", selectedFile.name);
      await fd.append("product", formData.product);
      await fd.append("units", formData.units);
      await fd.append("description", formData.description);
      await fd.append("price", formData.price);
      await fd.append("status", formData.status);
      await updateProduct(userId, fd);
      // getProductData(userId, setRowData);
      handleUpdateModal();
    } else {
      await updateProduct(userId, formData);
      // getProductData(userId, setRowData);
      handleUpdateModal();
    }
  };

  const handleAddProduct = async () => {
    if (selectedFile !== undefined && selectedFile !== "") {
      let fd = new FormData();
      await fd.append("image", selectedFile);
      await fd.append("name", selectedFile.name);
      await fd.append("product", formData.product);
      await fd.append("units", formData.units);
      await fd.append("description", formData.description);
      await fd.append("price", formData.price);
      await fd.append("status", formData.status);
      await addProduct(userId, fd);
      // getProductData(userId, setRowData);
      handleAddModal();
    } else {
      await addProduct(userId, formData);
      // getProductData(userId, setRowData);
      handleAddModal();
    }
  };
  const fileChangedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("selected file", selectedFile);
  };

  return (
    <>
      <tr className="addProduct" key={index + item.name}>
        <td>
          <span className="_id">{index + 1}</span>
        </td>
        <td>
          <span className="name">{item.name}</span>
        </td>
        <td>
          <span className="sku">{item.sku}</span>
        </td>
        <td>
          <span className="brand">{item.brand}</span>
        </td>
        <td>
          <span className="units">{item.untis}</span>
        </td>
        <td>
          <span className="price">€ {item.price}</span>
        </td>
        <td>
          <span className="description">{item.description}</span>
        </td>
        <td>
          <Chip
            className="stocklevel"
            label={item.status}
            data-status={item.status}
          />
        </td>
        <td>
          <IconButton onClick={handleUpdateModal}>
            <DriveFileRenameOutlineIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
      <AddProductModal
        open={addProductModal}
        handleAddModal={handleAddModal}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleAddProduct}
        fileChangedHandler={fileChangedHandler}
      />
      <UpdateProductModal
        open={updateProductModal}
        handleUpdateModal={handleUpdateModal}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleUpdateProduct}
        fileChangedHandler={fileChangedHandler}
      />
    </>
  );
};

export default ProductSettingsItem;
