import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { prodcuts } from '../products';

export default function HomeScreen() {
  return (
    <>
      <h1>Featured Products</h1>
      <Row>
        {prodcuts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
}
