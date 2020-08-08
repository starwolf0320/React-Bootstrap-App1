import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

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
      <main>Product List</main>
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
