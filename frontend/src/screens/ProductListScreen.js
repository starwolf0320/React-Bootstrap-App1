import React, { useEffect } from 'react';
import { Button, Table, Row, Col, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const dispatch = useDispatch();

  const pageNumber = props.match.params.pageNumber || 1;
  const createHandler = () => {
    dispatch(createProduct());
  };
  const deleteHandler = (product) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    } else {
      dispatch(
        listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber })
      );
    }
  }, [successDelete, successCreate, pageNumber]);
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={createHandler}>Create Product</Button>
        </Col>
      </Row>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>SELLER</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.seller.seller.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        Edit
                      </Button>
                    </LinkContainer>
                    <Button
                      type="button"
                      variant="light"
                      className="btn-sm"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {[...Array(pages).keys()].map((x) => (
              <LinkContainer key={x + 1} to={`/productlist/${x + 1}`}>
                <Pagination.Item active={x + 1 === page}>
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination>
        </>
      )}
    </>
  );
}
