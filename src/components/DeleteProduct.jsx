import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";

function DeleteProduct({ product, setProducts }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = (id) => {
    // console.log("Delete id", id);
    axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
      >
        Xóa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa sản phẩm này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleDelete(product.id)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProduct;
