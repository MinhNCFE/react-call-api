import { Container } from "react-bootstrap";
import "./App.css";
import AddProduct from "./components/AddProduct";
import ListProduct from "./components/ListProduct";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Container>
        <AddProduct />
        <ListProduct />
      </Container>
    </>
  );
}

export default App;
