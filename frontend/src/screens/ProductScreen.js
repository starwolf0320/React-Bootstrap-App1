import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Image,
  ListGroup,
  Row,
  Col,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, []);

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <Link to="/">Back to result</Link>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Price: <strong>${product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Seller
                  <Link to={`/seller/${product.seller._id}`}>
                    <h2>{product.seller.seller.name}</h2>
                  </Link>
                  <Rating
                    value={product.seller.seller.rating}
                    text={`${product.seller.seller.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={handleAddToCart}
                    className="btn-block"
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
