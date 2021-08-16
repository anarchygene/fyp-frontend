import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Modal } from "react-bootstrap";
import '../css/login.css';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const [letValidate, setLetValidate] = useState(false)

    const [adminInfo, setAdminInfo] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }
    //Login with email and password
    const adminLogin = (data) => {
        fetch(`https://apibounwe.herokuapp.com/adminlogin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                // If email of password is wrong
                if (json.err != undefined) {
                    alert(json.err)
                    return
                }
                setAdminInfo({
                    admin_id: json[0].admin_id, email: json[0].email,
                    secret_key: json[0].secret_key, secret_key: json[0].secret_key,
                    access_right: json[0].access_right
                })
                //Call the function to generate a 6 digit token
                getSecretByEmail(json[0].email)
                setLetValidate(true)
            }).catch((err) => {
                alert(`Error at adminlogin: ${err}`);
            });
    }
    //Generate a 6 digit token using the email
    const getSecretByEmail = (email) => {
        fetch(`https://apibounwe.herokuapp.com/adminToken/${email}`)
            .then(res => res.json())
            .then((json) => {
                //Call the function to send the 6 digit token to user, uncomment when you need to use
                sendEmail({
                    from: 'eugenekeezl20.19@ichat.sp.edu.sg', to: email,
                    subject: 'Sending u a 6-digit token to validate', text: JSON.stringify(json),
                    html: `<h3><b>2 Factor Authentication token for admin</b></h3>
                    <p>Here's your 6-digit code to login to your admin account:</p>
                    <p><b>${json.token}</b></p>
                    <p>It will expire <b>5 minutes from now</b></p>`
                })
                // alert(JSON.stringify(json))
            }).catch((err) => {
                alert(`Error at getSecretByEmail: ${err}`)
                console.log(err);
            });
    }

    const sendEmail = (data) => {
        fetch(`https://apibounwe.herokuapp.com/sendEmail`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                alert('An email has been sent to you')
            }).catch((err) => {
                alert(`Error at sendEmail(Login): ${err}`)
                console.log(err);
            });
    }

    //Validate the user's entered 6 digit token
    const validateToken = (data) => {
        fetch(`https://apibounwe.herokuapp.com/adminValidate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                if (json) {
                    setLetValidate(false)
                    window.localStorage.setItem("admin_id", adminInfo.admin_id)
                    window.localStorage.setItem('access_right', adminInfo.access_right)
                    window.location.href = 'https://celinechow.github.io/fyp-frontend/#//manageadmins'
                    return
                }
                alert("Incorrect 6-digit code")
            }).catch((err) => {
                console.log(err);
            });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        adminLogin({ email, password })
    }

    const VerifyModal = () => {
        return (
            <>

                <Modal
                    show={show}
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>

                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <Container className="user-container" fluid>
            <Row className="user-row">
                <Col className="user-col-blank">
                </Col>
                <Col className="user-col">
                    <div className="user-card user-card--login">
                        <Form className="user-form" onSubmit={onSubmit}>
                            <h4>Admin Login</h4>
                            <Form.Group className="user-form__input-container" size="lg" controlId="email">
                                <Form.Label className="user-form__label">Email</Form.Label>
                                <Form.Control
                                    autoFocus
                                    className="user-form__input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="user-form__input-container" size="lg" controlId="password">
                                <Form.Label className="user-form__label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    className="user-form__input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="user-form__button" block size="lg" type="submit" disabled={!validateForm()}>
                                Login
                            </Button>
                            {/* <Link to="/register">
                                <Button className="user-form__button" block size="lg">
                                    Register
                                </Button>
                            </Link> */}
                            {/* <VerifyModal /> */}
                            {letValidate ? <div>
                                <Form.Group className="user-form__input-container" size="lg" controlId="text">
                                    <Form.Label className="user-form__label">6-digit code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="user-form__input"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                </Form.Group>
                                <Button className="user-form__button" block size="lg"
                                    onClick={() => validateToken({
                                        temp_secret_key: adminInfo.temp_secret_key,
                                        secret_key: adminInfo.secret_key, token: token,
                                        email: adminInfo.email
                                    })}>
                                    Verify
                                </Button>
                            </div> : null}

                        </Form>
                    </div>
                </Col>
                <Col className="admin-col-blank">
                </Col>
            </Row>
        </Container>
    )
}

export default AdminLogin
