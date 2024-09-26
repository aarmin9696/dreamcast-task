import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/userSlice';
import Swal from 'sweetalert2';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ editUser, handleClose }) => {
  const dispatch = useDispatch();

  // Schema for the form validation
  const userSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.string().required('Zipcode is required')
  });

  const handleSubmit = (values) => {
    const action = editUser
    ? updateUser({ id: editUser.id, updatedUser: values })
    : addUser({ ...values, id: Date.now() });
    dispatch(action);
    Swal.fire({
      title: 'Success',
      text: editUser ? 'User updated successfully!' : 'User added successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    handleClose(); // Close modal after saving
  };

  return (
    <Formik
      initialValues={{
        name: editUser?.name || '',
        email: editUser?.email || '',
        phone: editUser?.phone || '',
        city: editUser?.address?.city || '',
        zipcode: editUser?.address?.zipcode || ''
      }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <FormikForm className='userForm'>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Field name="name" as={Form.Control} isInvalid={!!errors.name && touched.name} />
            <ErrorMessage name="name" component={Form.Control.Feedback} type="invalid" />
          </Form.Group>

          <Form.Group className='mt-2' controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Field name="email" as={Form.Control} type="email" isInvalid={!!errors.email && touched.email} />
            <ErrorMessage name="email" component={Form.Control.Feedback} type="invalid" />
          </Form.Group>

          <Form.Group className='mt-2' controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Field name="phone" as={Form.Control} isInvalid={!!errors.phone && touched.phone} />
            <ErrorMessage name="phone" component={Form.Control.Feedback} type="invalid" />
          </Form.Group>

          <Form.Group className='mt-2' controlId="formCity">
            <Form.Label>City</Form.Label>
            <Field name="city" as={Form.Control} isInvalid={!!errors.city && touched.city} />
            <ErrorMessage name="city" component={Form.Control.Feedback} type="invalid" />
          </Form.Group>

          <Form.Group className='mt-2' controlId="formZip">
            <Form.Label>Zip Code</Form.Label>
            <Field name="zipcode" as={Form.Control} isInvalid={!!errors.zipcode && touched.zipcode} />
            <ErrorMessage name="zipcode" component={Form.Control.Feedback} type="invalid" />
          </Form.Group>

          <Button type="submit" className='mt-3' style={{backgroundColor:"#e67e22", border:"none"}}>
            {editUser ? 'Update' : 'Add'} User
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default UserForm;
