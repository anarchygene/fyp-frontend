import React, { useState, useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useHistory, Link, useParams } from "react-router-dom";

function EditAdmins() {
    const [access_right, setAccessRight] = useState("")
    const [admin, setAdmin] = useState({})
    const history = useHistory();

    const onBack = () => {
        history.goBack();
    }

    let { id } = useParams()

    useEffect(() => {
        getAdminbyId(id)
    }, [])

    const getAdminbyId = (admin_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/admin/${admin_id}`)
                .then(res => res.json())
                .then((json) => {
                    console.log("json " + JSON.stringify(json));
                    setAdmin(json[0]);
                    return resolve(json[0]);
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const updateAdminbyId = (admin_id, data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/admin/${admin_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'access_right': localStorage.getItem('access_right')
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log("json " + JSON.stringify(json));
                    console.log(JSON.stringify(data))
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    return (
        <div className="admin-card">
            <Button className="admin-button" onClick={onBack}>Back</Button>
            <h1 clasName="admin-header">Edit Admin Details</h1>
            <h5>Name: {admin.first_name} {admin.last_name}</h5>
            <h5>Email: {admin.email}</h5>
            <h5>Current Role: {admin.access_right}</h5>
            <h5>New Role: </h5>
            <Form className="admin-form">
                <Row className="admin-form__row">
                    <Form.Group className="admin-form__checkbox-container" controlId="formBasicCheckbox">
                        <Form.Check name="role" id="Root Admin" className="admin-form__checkbox" type="radio" label="Root Admin" onChange={(e) => setAccessRight(e.target.id)} />
                        <Form.Check name="role" id="Operations" className="admin-form__checkbox" type="radio" label="Operations" onChange={(e) => setAccessRight(e.target.id)} />
                        <Form.Check name="role" id="Content" className="admin-form__checkbox" type="radio" label="Content" onChange={(e) => setAccessRight(e.target.id)} />
                    </Form.Group>
                </Row>
            </Form>
            <Button className="admin-form__button" variant="primary"
                onClick={() => updateAdminbyId(admin.admin_id, {
                    access_right: access_right, email: admin.email,
                    first_name: admin.first_name, last_name: admin.last_name
                })
                    .then(window.location.href = 'https://celinechow.github.io/fyp-frontend/#/manageadmins')
                }>
                Submit
            </Button>
        </div>
    )
}

export default EditAdmins;

