import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
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
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
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
    </BrowserRouter>
  );
}

export default App;
