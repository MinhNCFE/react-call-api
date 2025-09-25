import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import ModalProduct from "./ModalProduct";
import axios from "axios";

function EditProduct({product}) {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    const updateProduct = {
        ...product,
      productName: data.productName.value,
      category: { id: data.categoryId.value },
      productStock: parseInt(data.productStock.value),
      productPrice: parseFloat(data.productPrice.value),
    };

    axios
      .put(`http://localhost:8080/api/products/${product.id}`, updateProduct)
      .then((response) => {
        console.log(response.data);
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Sửa
      </Button>
      <ModalProduct
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        categories={categories}
        initialData={product}
        mode={"edit"}
      />
    </>
  );
}

export default EditProduct