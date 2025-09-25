import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import { Col, Row } from "react-bootstrap";

function ListProduct() {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/products").then((response) => {
      //   console.log(response.data);
      setListProducts(response.data);
    });
  }, []);

  const updateStatus = (id, newStatus) => {
    axios
      .patch(
        `http://localhost:8080/api/products/${id}/status?status=${newStatus}`,
        {}
      )
      .then(() => {
        console.log("ListProducts", listProducts);
        setListProducts((prev) =>
          prev.map((p) => {
            return p.id === id ? { ...p, productStatus: newStatus } : p;
          })
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AddProduct setProducts={setListProducts} />
      <Table striped bordered hover className="align-middle">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Loại sản phẩm</th>
            <th>Trạng thái</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {listProducts.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.productName}</td>
              <td>{item.category.categoryName}</td>
              <td>
                <ButtonGroup>
                  <ToggleButton
                    id={`status-${item.id}-true`}
                    type="radio"
                    variant="outline-success"
                    name={`status-${item.id}`}
                    value="true"
                    checked={item.productStatus === true}
                    onChange={() => updateStatus(item.id, true)}
                  >
                    Đang bán
                  </ToggleButton>

                  <ToggleButton
                    id={`status-${item.id}-false`}
                    type="radio"
                    variant="outline-danger"
                    name={`status-${item.id}`}
                    value="false"
                    checked={item.productStatus === false}
                    onChange={() => updateStatus(item.id, false)}
                  >
                    Không bán
                  </ToggleButton>
                </ButtonGroup>
              </td>
              <td>{item.productStock}</td>
              <td>{item.productPrice.toLocaleString("vn")} VND</td>
              <td className="gap-2 d-flex justify-content-center">
                <EditProduct product={item} setProducts={setListProducts} />
                <DeleteProduct product={item} setProducts={setListProducts} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ListProduct;
