import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
import '../css/login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const [letValidate, setLetValidate] = useState(false)

    const [userInfo, setUserInfo] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let cartItems = JSON.parse(window.localStorage.getItem('cartItems'))
    if (cartItems === null) localStorage.setItem('cartItems', JSON.stringify([]))
    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    //Login with email and password
    const login = (data) => {
        fetch(`https://apibounwe.herokuapp.com/userLogin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                //If email of password is wrong
                if (json.err != undefined) {
                    alert(json.err)
                    return
                }
                // alert(JSON.stringify(json))
                //Store the user's information in userInfo state
                setUserInfo({
                    user_id: json.result[0].user_id, email: json.result[0].email,
                    temp_secret_key: json.result[0].temp_secret_key, secret_key: json.result[0].secret_key,
                    jwttoken: json.jwttoken
                })
                //Call the function to generate a 6 digit token
                getSecretByEmail(json.result[0].email)
                setLetValidate(true)
            }).catch((err) => {
                alert(`Error at login: ${err}`);
            });
    }

    //Generate a 6 digit token using the email
    const getSecretByEmail = (email) => {
        fetch(`https://apibounwe.herokuapp.com/userToken/${email}`)
            .then(res => res.json())
            .then((json) => {
                //Call the function to send the 6 digit token to user, uncomment when you need to use
                sendEmail({
                    from: 'eugenekeezl20.19@ichat.sp.edu.sg', to: email,
                    subject: 'Sending u a 6-digit token to validate', text: JSON.stringify(json),
                    html: `<h3><b>2 Factor Authentication token</b></h3>
                    <p>Here's your 6-digit code to login to your account:</p>
                    <p><b>${json.token}</b></p>
                    <p>It will expire <b>5 minutes from now</b></p>`
                })
                // alert(JSON.stringify(json))
            }).catch((err) => {
                alert(`Error at getSecretByEmail: ${err}`)
                console.log(err);
            });
    }

    //Send an email to the user(Currently only can send to emails that I verify in AWS SES cause still in sandbox,
    //to send to anyone need finish doing and hosting the website to submit request to AWS for review)
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
        fetch(`https://apibounwe.herokuapp.com/userValidate`, {
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
                    //Get cart by user id
                    getCart(userInfo.user_id)
                    window.localStorage.setItem("user_id", userInfo.user_id)
                    window.localStorage.setItem("jwttoken", userInfo.jwttoken)
                    return
                }
                alert("Incorrect 6-digit code")
            }).catch((err) => {
                console.log(err);
            });
    }

    //Get cart
    const getCart = (user_id) => {
        fetch(`https://apibounwe.herokuapp.com/cart/${user_id}`)
            .then(res => res.json())
            .then((json) => {
                if (json.err == "User/Cart not found") {
                    // alert(json.err)
                    //If there is no shopping cart for logged in user, create one
                    addCart({ user_id: user_id })
                    return
                }
                getCartItemByUserId(user_id)
                window.localStorage.setItem('cartId', json[0].cart_id)
            }).catch((err) => {
                alert(`Error at getCart: ${err}`);
            });
    }

    //Create cart if no cart is found for the logged in user
    const addCart = (data) => {
        fetch(`https://apibounwe.herokuapp.com/cart`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                // alert(JSON.stringify(json))
                window.localStorage.setItem('cartId', json.insertId)
                window.location.href = 'https://celinechow.github.io/fyp-frontend/#/home'
            }).catch((err) => {
                alert(`Error at addCart: ${err}`)
                console.log(err);
            });
    }

    //Get cart item by user id 
    const getCartItemByUserId = (user_id) => {
        return new Promise((resolve, reject) => {
            if (user_id === null) {
                return
            }
            fetch(`https://apibounwe.herokuapp.com/cartuser/${user_id}`)
                .then(res => res.json())
                .then((json) => {
                    // alert(JSON.stringify(json))
                    if (json.err == "Cart items not found") {
                        json = []
                    }
                    cartItems = JSON.parse(window.localStorage.getItem('cartItems'))
                    if (cartItems.length == 0) {
                        window.location.href = 'https://celinechow.github.io/fyp-frontend/#/home'
                    } else {
                        cartItems.map((cartItem) => {
                            let letAdd = true
                            json.map((item) => {
                                if (cartItem.stock_id == item.stock_id) {
                                    updateCartItem({
                                        stock_id: cartItem.stock_id, quantity: (cartItem.quantity + item.quantity),
                                        cartitem_id: item.cartitem_id
                                    })
                                    letAdd = false
                                }
                            })
                            if (letAdd) {
                                addCartItem({ cart_id: localStorage.getItem('cartId'), stock_id: cartItem.stock_id, 
                                quantity: cartItem.quantity })
                            }
                        })
                        window.location.href = 'https://celinechow.github.io/fyp-frontend/#/home'
                        localStorage.removeItem('cartItems')
                    }
                    resolve(json)
                }).catch((err) => {
                    alert(`Error at getCartItemByUser: ${err}`)
                    console.log(err);
                    reject(err)
                });
        })
    }

    const addCartItem = (data) => {
        alert(JSON.stringify(data))
        fetch(`https://apibounwe.herokuapp.com/cartitem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((json) => {
            }).catch((err) => {
                alert(`Error at addCartItem: ${err}`)
                console.log(err);
            });
    }
    const updateCartItem = (data) => {
        alert(JSON.stringify(data))
        fetch(`https://apibounwe.herokuapp.com/cartitem`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((json) => {
            }).catch((err) => {
                alert(`Error at updateCartItem: ${err}`)
                console.log(err);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password })
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
        <Container className="user-container user-container--login" fluid>
            <Row className="user-row user-row--login--header" className="user-row">
                <Col className="user-col user-col--login--header" md={{span:4,offset:4}}>
                    <span className="user-span__login user-span__login--header">Login</span>

                </Col>
            </Row>
            <Row className="user-row">
                {/* <Col className="user-col-blank">
                </Col> */}
                <Col className="user-col user-col--login" md={{span:4,offset:4}}>
                    <div className="user-card user-card--login">
                        <Form className="user-form user-form--login" onSubmit={onSubmit}>
                            <Form.Group className="user-form__input-container" size="lg" controlId="email">
                                <Form.Label className="user-form__label">Email</Form.Label>
                                <Form.Control
                                    autoFocus
                                    style={{marginBottom:'2vh'}} 
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
                            <Button style={{ margin:'5vh 7.5vw 3.5vh', paddingLeft:'3vw', paddingRight: '3vw'}} className="user-form__button user-form__button-login" variant="success" type="submit" disabled={!validateForm()}>
                                Login
                            </Button>
                            <br/>
                            <Link style={{margin: '0 5.75vw'}} className="user-link user-link--login-register" to="/register">
                                New User? Create Account
                            </Link>
                            {/* <Button variant="primary" block size="lg" onClick={handleShow}>
                                Launch modal
                            </Button> */}
                            <VerifyModal />
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
                                        temp_secret_key: userInfo.temp_secret_key,
                                        secret_key: userInfo.secret_key, token: token,
                                        email: userInfo.email
                                    })}>
                                    Verify
                                </Button>
                            </div> : null}

                        </Form>
                    </div>
                </Col>
                {/* <Col className="user-col-blank">
                </Col> */}
            </Row>
        </Container>
    )
}

export default Login
