import React, { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';

export default function UserListScreen() {
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(user._id));
    }
  };

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  return (
    <>
      <h1>Users</h1>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>SELLER</th>
            <th>ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isSller ? 'YES' : 'NO'}</td>
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              <td>
                <LinkContainer to={`/user/${user._id}`}>
                  <Button variant="light" className="btn-sm">
                    Edit
                  </Button>
                </LinkContainer>
                <Button
                  type="button"
                  className="btn-sm"
                  variant="light"
                  onClick={() => deleteHandler(user)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
