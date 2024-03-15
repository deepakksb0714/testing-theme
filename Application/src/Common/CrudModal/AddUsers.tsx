import React,{useEffect, useState} from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { addUsers as onAddUsers } from '../../slices/thunk';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

interface userProps {
    isShow: boolean,
    handleClose: any,
    handleShow: any
}

const AddUsers =  ({ isShow, handleClose, handleShow }: userProps) => {
    // image
    const [selectedImage, setSelectedImage] = useState<any>();

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            formik.setFieldValue('memberImage', e.target.result);
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const dispatch = useDispatch();

    const formik: any = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
           
        },
        validationSchema: Yup.object({
            email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
        }),

        onSubmit: (values: any) => {      
            let newid = (Math.floor(Math.random() * (30 - 20)) + 20);      
            const NewUser = {
                email: values['email'],
                registeredOn: values['registeredOn'],
                status: values['status']
            }

            dispatch(onAddUsers(NewUser));
            formik.resetForm();
            
            if (NewUser === null) {
                handleShow();
            } else {
                handleClose();
            }
        }
    })

    useEffect(() => {
        setSelectedImage('');
      }, [handleClose])

  return (
    <React.Fragment>

        <Modal centered show={isShow} onHide={handleClose} style={{ display: "block" }} tabIndex={-1}>
                <div className="modal-content border-0">
                    <Modal.Header className="p-4 pb-0">
                        <Modal.Title as="h5">Add User</Modal.Title>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <Form autoComplete="off" onSubmit={formik.handleSubmit}>

                           
                            <div className="mb-3">
                                <Form.Label htmlFor="Email-input">Email<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    id="Email-input"
                                    name="email"
                                    placeholder="Enter Your email"
                                    value={formik.values.email || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!formik.errors.email}
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                ) : null}
                            </div>
                            
                            <div className="hstack gap-2 justify-content-end">
                                <Button type="button" className="btn btn-light" onClick={handleClose}>Close</Button>
                                <Button type="submit" className="btn btn-success" >Add User</Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </div>
        </Modal>
      
    </React.Fragment>
  )
}

export default AddUsers
