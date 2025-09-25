import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditProduct from "./EditProduct";

function ListProduct() {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/products").then((response) => {
      //   console.log(response.data);
      setListProducts(response.data);
    });
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      axios.patch(
        `http://localhost:8080/api/products/${id}/status?status=${newStatus}`,
        {});
        window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Table striped bordered hover>
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
              <td>
                <EditProduct product={item} />
                <Button variant="danger">Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ListProduct;
