import React from 'react';
import { Card } from 'react-bootstrap';

export default function Product(props) {
  const { product } = props;
  return (
    <Card className="my-3">
      <a href={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image}></Card.Img>
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="strong">{product.name}</Card.Title>
        </a>
        <Card.Text as="div">
          {product.rating} from {product.numReviews} reviews
        </Card.Text>
        <Card.Text as="h2">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
