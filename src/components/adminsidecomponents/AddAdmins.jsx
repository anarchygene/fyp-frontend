import React from 'react'
import { useState } from 'react'
import { Container, Row, Button, Form } from 'react-bootstrap';
import '../css/addadmin.css';
import Popup from 'reactjs-popup';
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import '../css/addadmins.css'


function AddAdmin() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accessRight, setAccessRight] = useState("");
    const [data, setData] = useState({})


    const history = useHistory();

    const validateForm = () => {
        return email.length > 0 && firstName.length > 0 && lastName.length > 0 && password.length > 7;
    }

    const onCancel = () => {
        history.goBack();
    }

    const addAdmin = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_right': localStorage.getItem('access_right')
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    if (json.err = "The new email provided is in use. Please try again.") {
                        alert(json.err)
                        return
                    }
                    alert(JSON.stringify(json))
                    return resolve(json)
                }).catch((err) => {
                    alert(JSON.stringify(err))
                    return reject(err);
                });
        })
    }

    const onSubmit = (e) => {
        setData({ "first_name": firstName, "last_name": lastName, "email": email, "password": password, "access_right": accessRight })
        console.log(JSON.stringify(data));
        e.preventDefault();
    }

    const ConfirmPopup = ({ close }) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Details?</h3>
                <Button className="popup-card__button"
                    onClick={() => addAdmin({
                        "first_name": firstName, "last_name": lastName,
                        "email": email, "password": password, "access_right": accessRight
                    }).then(() => window.location.href = 'https://celinechow.github.io/fyp-frontend/#/manageadmins')}
                    type="submit">OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <Container className="admin-container" fluid>
            <div className="admin-card">
                <Form className="admin-form">
                    <Row className="admin-form__row">
                        <p className="admin-form__header">
                            Add Admin
                        </p>
                        <div className="admin-form__line"></div>
                    </Row>
                    <Row className="admin-form__row">
                        <Form.Group className="admin-form__input-container" size="md" controlId="first-name">
                            <Form.Label className="admin-form__input-label">First Name</Form.Label>
                            <Form.Control
                                autoFocus
                                className="admin-form__input"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="admin-form__input" size="md" controlId="last-name">
                            <Form.Label className="admin-form__input-label">Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="admin-form__input"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="admin-form__input" size="md" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                className="admin-form__input"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="admin-form__row">
                        <p className="admin-form__header">Role</p>
                        <div className="admin-form__line"></div>
                    </Row>
                    <Row className="admin-form__row">
                        <Form.Group className="admin-form__checkbox-container" controlId="formBasicCheckbox">
                            <Form.Check name="role" id="ROOT_ADMIN" className="admin-form__checkbox" type="radio" label="Root Admin" onChange={(e) => setAccessRight(e.target.id)} />
                            <Form.Check name="role" id="OPERATIONS" className="admin-form__checkbox" type="radio" label="Operations" onChange={(e) => setAccessRight(e.target.id)} />
                            <Form.Check name="role" id="CONTENT" className="admin-form__checkbox" type="radio" label="Content" onChange={(e) => setAccessRight(e.target.id)} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="admin-form__input" size="md" controlId="email">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                className="admin-form__input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="admin-form__row">
                        <Popup
                            modal
                            closeOnDocumentClick={false}
                            trigger={open =>
                                <Button className="admin-form__button" block size="lg">
                                    Save
                                </Button>
                            }
                        >
                            {close => <ConfirmPopup close={close} />}
                        </Popup>
                        <Button className="admin-form__button" block size="lg" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}

export default AddAdmin;