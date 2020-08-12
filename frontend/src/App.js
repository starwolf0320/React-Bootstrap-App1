import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { prodcuts } from './products';
import Product from './components/Product';

function App() {
  return (
    <div>
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
          <Navbar.Brand href="/">MERN Marketplace</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-menu"></Navbar.Toggle>
          <Navbar.Collapse id="navbar-menu" className="justify-content-end">
            <Nav>
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/signin">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <main>
        <Container fluid>
          <h1>Featured Products</h1>
          <Row>
            {prodcuts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3">@2020 All right reserved.</Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
