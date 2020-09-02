import React from 'react';
import { Nav } from 'react-bootstrap';

export default function CheckoutSteps(props) {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        {props.step1 ? (
          <Nav.Link>Sign In</Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step2 ? (
          <Nav.Link>Shipping</Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step3 ? (
          <Nav.Link>Payment</Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step4 ? (
          <Nav.Link>Place Order</Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}
