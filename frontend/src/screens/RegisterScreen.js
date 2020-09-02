import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords are not matched.');
      return;
    }

    dispatch(register(name, email, password));
  };
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);
  const dispatch = useDispatch();
  return (
    <FormContainer>
      <h1>Register</h1>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
