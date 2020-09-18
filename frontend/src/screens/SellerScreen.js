import React, { useEffect } from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { detailsUser } from '../actions/userActions';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function SellerScreen(props) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  useEffect(() => {
    dispatch(detailsUser(props.match.params.id));
    dispatch(listProducts({ seller: props.match.params.id }));
  }, []);
  return (
    <Row>
      <Col lg={3}>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row className="align-items-center">
                <Col>
                  <Image src={user.seller.logo} fluid></Image>
                </Col>
                <Col>
                  <h1>{user.seller.name}</h1>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={user.seller.rating}
                text={`${user.seller.numReviews} reviews`}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              <a href={'mailto:' + user.email}>Contact Seller</a>
            </ListGroup.Item>
            <ListGroup.Item>{user.seller.description}</ListGroup.Item>
          </ListGroup>
        )}
      </Col>
      <Col lg={9}>
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <Row>
              {products.map((product) => (
                <Col sm={12} md={6} lg={4}>
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
}
