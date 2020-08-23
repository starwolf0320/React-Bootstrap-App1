import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
            <LinkContainer to="/">
              <Navbar.Brand>MERN Marketplace</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbar-menu"></Navbar.Toggle>
            <Navbar.Collapse id="navbar-menu" className="justify-content-end">
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>Cart</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signin">
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <main>
          <Container fluid>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
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
