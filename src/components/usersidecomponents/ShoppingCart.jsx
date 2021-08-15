import React, { useState, useEffect, useCallback } from 'react';
import '../css/shoppingcart.css'
import ShoppingCartRow from './ShoppingCartRow';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState(JSON.parse(window.localStorage.getItem('cartItems')))
    let user_id = window.localStorage.getItem('user_id')

    const [subTotal, setSubTotal] = useState("")
    let subtotal = 0;

    useEffect(() => {
        if (cartItems !== null) {
            cartItems.map((item) => { subtotal += item.price })
            setSubTotal(subtotal.toFixed(2))
        }
        getCartItemByUserId(window.localStorage.getItem('user_id'))
    }, [])

    const getCartItemByUserId = (user_id) => {
        if (user_id === null) {
            return
        }
        fetch(`https://apibounwe.herokuapp.com/cartuser/${user_id}`)
            .then((res) => {
                if (res.status==404) {
                    return
                } else {
                    let subtotal = 0
                    res.json().then((json) => {
                        json.map((cart) => {
                            subtotal += cart.stock_price * cart.quantity
                        })
                        setSubTotal(subtotal.toFixed(2))
                        setCartItems(json)
                    })
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    const updateSummary = useCallback(
        (user_id) => {
            // alert(user_id)
            if (user_id != null) {
                getCartItemByUserId(user_id)
            } else {
                setCartItems(JSON.parse(window.localStorage.getItem('cartItems')))
                subtotal = 0
                cartItems.map((item) => { subtotal += item.price; return item })
                setSubTotal(subtotal.toFixed(2))
            }
        },
        [],
    )

    return (
        <Container className="user-container user-container--shopping-cart" fluid>
            <Row className="user-row">
                <span className="user-span user-span--cart-header">Shopping Cart</span>
            </Row>
            <Row className="user-row">
                {(cartItems !== null && JSON.stringify(cartItems) !== JSON.stringify([]) && Array.isArray(cartItems)) ?
                    <Col className="user-col user-col--cart" md={{ span: 8 }}>
                        <Row style={{ marginTop: '0' }} className="user-inner-row user-inner-row--cart user-inner-row--cart-header">
                            <span className="user-span user-span--items-header">Your Items</span>
                        </Row>
                        <Row style={{ marginTop: '0' }} className="user-inner-row user-inner-row--cart user-inner-row--label">
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1 }}>
                                Image
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1, offset: 1 }}>
                                Product
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" style={{ paddingLeft: '1.55vw' }} md={1}>
                                Price
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" style={{ paddingLeft: '1.75vw' }} md={{ span: 1, offset: 1 }}>
                                Quantity
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1, offset: 1 }}>
                                Remove
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1, offset: 1 }}>
                                Total
                            </Col>
                        </Row>
                        {
                            cartItems.map((cart) => (
                                <ShoppingCartRow key={cart.stock_id} cartitem={cart} updateSummary={updateSummary}></ShoppingCartRow>
                            ))
                        }
                    </Col>
                    :
                    <Col className="user-col user-col--cart-empty" md={{ span: 10 }}>
                        <Row style={{ marginTop: '0' }} className="user-inner-row user-inner-row--cart user-inner-row--cart-header">
                            <span className="user-span user-span--items-header">Your Items</span>
                        </Row>
                        <Row style={{ marginTop: '0' }} className="user-inner-row user-inner-row--cart user-inner-row--label">
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1 }}>
                                Image
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1, offset: 1 }}>
                                Product
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" style={{ paddingLeft: '1.55vw' }} md={1}>
                                Price
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" style={{ paddingLeft: '1.75vw' }} md={{ span: 1, offset: 1 }}>
                                Quantity
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1, offset: 1 }}>
                                Remove
                            </Col>
                            <Col className="user-inner-col user-inner-col--label" md={{ span: 1, offset: 1 }}>
                                Total
                            </Col>
                        </Row>
                        <Row className="user-inner-row user-inner-row--empty">No Items in Cart Yet</Row>
                    </Col>
                }
                {(cartItems !== null && JSON.stringify(cartItems) !== JSON.stringify([]) && Array.isArray(cartItems)) ?
                    <Col className="user-col user-col--checkout" md={{ span: 2 }}>
                        <Row className="user-inner-row user-inner-row--checkout user-inner-row--order-header">
                            <span className="user-span user-span--order-header">Order Summary</span>
                        </Row>
                        <Row className="user-inner-row user-inner-row--checkout user-inner-row--grand-total">
                            <Col style={{ padding: '0' }} className="user-inner-col user-inner-col--title">
                                <span className="user-span user-span--title user-span--subtotal-title">Subtotal: </span>
                                <br />
                                <span className="user-span user-span--title user-span--shipping-title">Shipping: </span>
                                <br />
                                <span className="user-span user-span--title user-span--grand-total-title">Grand Total:</span>
                                <br />
                            </Col>
                            <Col style={{ padding: '0' }} className="user-inner-col user-inner-col--text">
                                <span className="user-span user-span--text user-span--subtotal-text">${(Number(subTotal)).toFixed(2)}</span>
                                <br />
                                <span className="user-span user-span--text user-span--shipping-text">$8.00</span>
                                <br />
                                <span className="user-span user-span--text user-span--grand-total-text"><b>${(Number(subTotal) + 8).toFixed(2)}</b></span>
                                <br />
                            </Col>
                        </Row>
                        <Row style={{ paddingLeft: '0' }} className="user-inner-row user-inner-row--checkout user-inner-row--checkout-button">
                            {user_id == null
                                ? <Link to="/login">
                                    <Button variant="success" block="lg" className="user-inner-row__button">Checkout</Button>
                                </Link>
                                : null
                            }
                            {user_id !== null
                                ? <Link to="/payment">
                                    <Button variant="success" block="lg" className="user-inner-row__button">Checkout</Button>
                                </Link>
                                : null
                            }

                        </Row>
                    </Col>
                    : null}
            </Row>
        </Container>
    )
}

export default ShoppingCart
