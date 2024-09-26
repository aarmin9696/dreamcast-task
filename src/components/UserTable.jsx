import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/userSlice';
import UserForm from './UserForm';
import Swal from 'sweetalert2';
import { Spinner } from 'react-bootstrap';

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);

  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
      }
    });
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditUser(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditUser(null); // Reset editUser when closing
  };

  return (
    <div>
      <Button className='mb-2' style={{backgroundColor:"#e67e22",border:"none"}} onClick={handleAddClick}>Add New User</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{color:"#e67e22"}} closeButton>
          <Modal.Title>{editUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm editUser={editUser} setEditUser={setEditUser} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="table-responsive">
      <Table className='table' striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City with Zip</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {users.length > 0 ? (
    users.map((user) => (
      <tr key={user.id}>
        <td className="align-middle">{user.id}</td>
        <td className="align-middle">{user.name || 'NA'}</td>
        <td className="align-middle">{user.email || 'NA'}</td>
        <td className="align-middle">{user.phone || 'NA'}</td>
        <td className="align-middle">{`${user.address?.city || 'NA'}, ${user.address?.zipcode || 'NA'}`}</td>
        <td className="align-middle">
          <Button className="m-1" variant="warning" onClick={() => handleEditClick(user)}>Edit</Button>
          <Button className="m-1" variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center">No Users Available, Please Add New Users.</td>
    </tr>
  )}
</tbody>
      </Table>
      </div>
    </div>
  );
};

export default UserTable;
