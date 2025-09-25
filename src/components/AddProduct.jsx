import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import ModalProduct from "./ModalProduct";
import axios from "axios";

function AddProduct({ setProducts }) {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;

    // console.log(value.target.productName.value);
    const newProduct = {
      productName: data.productName.value,
      category: { id: data.categoryId.value },
      productStock: parseInt(data.productStock.value),
      productPrice: parseFloat(data.productPrice.value),
      productStatus: true,
    };

    axios
      .post("http://localhost:8080/api/products", newProduct)
      .then((response) => {
        console.log(response.data);

        setProducts((prev) => [...prev, response.data]);
        handleClose();
        // window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response?.status === 500) {
          setError("Tên sản phẩm đã tồn tại");
        }
      });
  };

  return (
    <>
      <Row className="mt-4">
        <Col className="text-start">
          <h3>Quản lí sản phẩm</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShow}>
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>
      <ModalProduct
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        categories={categories}
        error={error}
      />
    </>
  );
}

export default AddProduct;
