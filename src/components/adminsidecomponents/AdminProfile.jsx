import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import EditAdminProfile from './EditAdminProfile';

export default function AdminProfile() {
    const [admin, setAdmin] = useState({})
    const [email, setEmail] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        getAdminbyId(localStorage.getItem('admin_id')).then((admin) => {
            setLastName(admin.last_name)
            setFirstName(admin.first_name)
            setEmail(admin.email)
        })
    }, [])

    const getAdminbyId = (admin_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/admin/${admin_id}`)
                .then(res => res.json())
                .then((json) => {
                    setAdmin(json[0])
                    return resolve(json[0])
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const updateAdminPwdbyId = (admin_id, data) => {
        fetch(`https://apibounwe.herokuapp.com/admin/${admin_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'access_right': localStorage.getItem('access_right')
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                return false;
            }).catch((err) => {
                console.log(err);
            })
    }

    const adminLogout = () => {
        localStorage.clear()
        window.location.href = 'https://celinechow.github.io/fyp-frontend/#/adminlogin'
    }

    return (
        <>
            <Container className="admin-container" fluid>
                <Router>
                    <Switch>
                        <Route path="/adminprofile">
                            <div className="admin-card">
                                <Row className="admin-row">
                                    <h3 className="admin-row__header">Hello {admin.first_name}!</h3>
                                </Row>
                                <Row className="admin-row"><span className="admin-row__text">Name: {admin.first_name} {admin.last_name}</span></Row>
                                <Row className="admin-row"><span className="admin-row__text">Email: {admin.email}</span></Row>
                                <Row className="admin-row"><span className="admin-row__text">Access Rights: {admin.access_right}</span></Row>
                                {
                                    !edit
                                        ? <Row className="admin-row">
                                            <Link to="/editadminprofile"><Button className="admin-row__button" variant="success">Change Password</Button></Link>
                                            <Button onClick={() => setEdit(!edit)}>Edit Profile</Button>
                                            <Button onClick={() => adminLogout()} variant="danger">Logout</Button>
                                        </Row>
                                        : null
                                }
                                {
                                    edit
                                        ?
                                        <div>
                                            <Row className="admin-row">
                                                <Link to="/editadminprofile"><Button className="admin-row__button">Change Password</Button></Link>
                                            </Row>
                                            <br></br>
                                            <Form className="admin-form">
                                                <Row className="admin-form__row">
                                                    <p className="admin-form__header">
                                                        Edit Profile:
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
                                                </Row>
                                                <Row>
                                                    <Form.Group className="admin-form__input" size="md" controlId="last-name">
                                                        <Form.Label className="admin-form__input-label">Last Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            className="admin-form__input"
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group className="admin-form__input" size="md" controlId="email">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            className="admin-form__input"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Button type="submit" onClick={() => updateAdminPwdbyId(admin.admin_id, {
                                                        email: email, first_name: first_name,
                                                        last_name: last_name, access_right: admin.access_right
                                                    })}>Save</Button>
                                                    <Button variant="danger" onClick={() => setEdit(!edit)}>Cancel</Button>
                                                </Row>
                                            </Form>
                                        </div>
                                        : null
                                }
                            </div>
                        </Route>
                        <Router path="/editadminprofile">
                            <EditAdminProfile admin_id={localStorage.getItem('admin_id')} />
                        </Router>
                    </Switch>
                </Router>
            </Container>
        </>
    )
}