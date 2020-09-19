import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { detailsUser, updateSellerReview } from '../actions/userActions';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { SELLER_REVIEW_SAVE_RESET } from '../constants/userConstants';
import { Link } from 'react-router-dom';

export default function SellerScreen(props) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const sellerReviewSave = useSelector((state) => state.sellerReviewSave);
  const {
    success: successSellerReviewSave,
    error: errorSellerReviewSave,
  } = sellerReviewSave;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSellerReview(props.match.params.id, {
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };
  useEffect(() => {
    if (successSellerReviewSave) {
      alert('Review submitted successfully');
      setRating(0);
      setComment('');
      dispatch({ type: SELLER_REVIEW_SAVE_RESET });
    }
    dispatch(detailsUser(props.match.params.id));
    dispatch(listProducts({ seller: props.match.params.id }));
  }, [successSellerReviewSave]);
  return (
    <>
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
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
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
      <Row>
        <Col md={6}>
          <h2 id="reviews">Reviews</h2>
          {user.seller.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
          <ListGroup variant="flush">
            {user.seller.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating}></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a customer review</h2>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very Good</option>
                      <option value="5">5- Excelent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  {errorSellerReviewSave && (
                    <MessageBox variant="danger">
                      {errorSellerReviewSave}
                    </MessageBox>
                  )}
                </Form>
              ) : (
                <MessageBox>
                  Please <Link to="/signin">Sign In</Link> to write a review.
                </MessageBox>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}
