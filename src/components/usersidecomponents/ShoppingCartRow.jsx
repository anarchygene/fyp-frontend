import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import Popup from 'reactjs-popup';
import { Row, Col, Form } from "react-bootstrap";
import '../css/shoppingcart.css'

function ShoppingCartRow({ cartitem, updateSummary }) {
    const [cartItems, setCartItems] = useState(JSON.parse(window.localStorage.getItem('cartItems')))
    const [itemNo, setItemNo] = useState("")
    if (cartItems === null) setCartItems([])
    let cartId = JSON.parse(window.localStorage.getItem('cartId'))
    const [cartItem, setCartItem] = useState(cartitem)
    const deleteCartItembyId = (cartitem_id) => {
        if (cartId === null) {
            cartItems.map((item, index) => {
                if (item.stock_id === cartitem_id) {
                    cartItems.splice(index, 1)
                }
                return item
            })
            window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
            if (JSON.parse(window.localStorage.getItem('cartItems')).length === 0) {
                window.localStorage.removeItem('cartItems')
            }
            window.location.reload()
        } else {
            fetch(`https://apibounwe.herokuapp.com/cartItem/${cartitem_id}`, {
                method: 'DELETE',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then((json) => {
                    updateSummary(window.localStorage.getItem('user_id'))
                    getCartItemByUserId(localStorage.getItem('user_id')).then((lengthOfCartItems) => {
                        if (lengthOfCartItems.length === 0) {
                            window.location.reload()
                        }
                    })
                }).catch((err) => {
                    alert(`Error at deleteCartItemById: ${err}`)
                    console.log(err);
                });
        }



    }
    const ConfirmDeletePopup = ({ close }) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Delete?</h3>
                {cartItem.cartitem_id !== undefined ?
                    <Button className="popup-card__button" onClick={() => deleteCartItembyId(cartItem.cartitem_id)} type="submit">OK</Button>
                    : <Button className="popup-card__button" onClick={() => deleteCartItembyId(cartItem.stock_id)} type="submit">OK</Button>}
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }
    const addToSession = (stock_id) => {
        if (cartItem.quantity < 51) {
            setItemNo(itemNo + 1)
            cartItem.quantity = cartItem.quantity + 1
            cartItem.price += cartItem.stock_price
            cartItems.map((item, index) => {
                if (item.stock_id === stock_id) {
                    cartItems[index] = cartItem
                }
                return item
            })
            window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
            updateSummary(window.localStorage.getItem('user_id'))
            console.log(window.localStorage.getItem("cartItems"))
            return
        }
        alert(`Can't add above 50`)
    }
    const minusFromSession = (stock_id) => {
        if (cartItem.quantity > 1) {
            setItemNo(itemNo - 1)
            cartItem.quantity = cartItem.quantity - 1
            cartItem.price -= cartItem.stock_price
            cartItems.map((item, index) => {
                if (item.stock_id === stock_id) {
                    cartItems[index] = cartItem
                }
                return item
            })
            window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
            updateSummary(window.localStorage.getItem('user_id'))
            console.log(window.localStorage.getItem("cartItems"))
            return
        }
        alert(`Quantity cannot be 0`)
    }
    const addToDB = (data) => {
        fetch(`https://apibounwe.herokuapp.com/cartItem`, {
            method: 'PUT',
            headers: {
                'access_right': localStorage.getItem('access_right'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                let newCartItem = {
                    "quantity": cartItem.quantity + 1, "cartitem_id": cartItem.cartitem_id, "user_id": cartItem.user_id,
                    "product_img": cartItem.product_img, "product_name": cartItem.product_name, "product_desc": cartItem.product_desc,
                    "stock_id": cartItem.stock_id, "stock_size": cartItem.stock_size, "stock_price": cartItem.stock_price
                }
                setCartItem({ ...cartItem, ...newCartItem })
                updateSummary(window.localStorage.getItem('user_id'))
            }).catch((err) => {
                alert(`Error at updateCartItemById(Add): ${err}`)
                console.log(err);
            });
    }
    const minusFromDB = (data) => {
        if (data.quantity < 1) {
            alert(`Quantity cannot be 0`)
            return
        }
        fetch(`https://apibounwe.herokuapp.com/cartItem`, {
            method: 'PUT',
            headers: {
                'access_right': localStorage.getItem('access_right'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                let newCartItem = {
                    "quantity": cartItem.quantity - 1, "cartitem_id": cartItem.cartitem_id, "user_id": cartItem.user_id,
                    "product_img": cartItem.product_img, "product_name": cartItem.product_name, "product_desc": cartItem.product_desc,
                    "stock_id": cartItem.stock_id, "stock_size": cartItem.stock_size, "stock_price": cartItem.stock_price
                }
                setCartItem({ ...cartItem, ...newCartItem })
                updateSummary(window.localStorage.getItem('user_id'))
            }).catch((err) => {
                alert(`Error at updateCartItemById(Minus): ${err}`)
                console.log(err);
            });
    }
    const getCartItemByUserId = (user_id) => {
        return new Promise((resolve, reject) => {
            if (user_id === null) {
                return
            }
            fetch(`https://apibounwe.herokuapp.com/cartuser/${user_id}`)
                .then((res) => {
                    if (res.status === 404) {
                        resolve([])
                    }
                    else {
                        resolve(res.json())
                    }
                }).catch((err) => {
                    alert(`Error at getCartItemByUser: ${err}`)
                    console.log(err);
                    reject(err)
                });
        })
    }

    return (
        <>
            {/* New Product Row */}
            <Row className="user-inner-row user-inner-row--cart user-inner-row--cart-items">
                <Col style={{ padding: '0' }} className="user-inner-col user-inner-col--product-image " md={2}>
                    <img className="user-image" src={cartItem.product_img} alt="Product" />
                </Col>

                <Col className="user-inner-col user-inner-col--product-details" md={2}>
                    <Row className="product-title">{cartItem.product_name}</Row>
                    {/* <Row className="product-description">{cartItem.product_desc}</Row> */}
                </Col>

                <Col className="user-inner-col user-inner-col--price-weight" md={1}>
                    <Row className="product-size">{cartItem.stock_size}</Row>

                    <Row className="product-price">${cartItem.stock_price.toFixed(2)}</Row>
                </Col>

                <Col className="user-inner-col user-inner-col--product-quantity" style={{ marginLeft: '2.5vw' }} md={2}>
                    <Row className="user-deep-row user-deep-row--edit-stock">
                        <Col style={{ padding: '0' }} md={2}>
                            <Button className="user-form__button user-form__button--minus"
                                onClick={() => cartId == null ? minusFromSession(cartItem.stock_id) :
                                    minusFromDB({ stock_id: cartItem.stock_id, quantity: cartItem.quantity - 1, cartitem_id: cartItem.cartitem_id })}>
                                -</Button>
                        </Col>
                        <Col md={6}>
                            <Form.Control style={{ textAlign: 'center', padding: '0' }} type="text" value={cartItem.quantity} disabled />
                        </Col>
                        <Col style={{ padding: '0' }} md={2}>
                            <Button className="user-form__button user-form__button--minus"
                                onClick={() => cartId == null ? addToSession(cartItem.stock_id) :
                                    addToDB({ stock_id: cartItem.stock_id, quantity: cartItem.quantity + 1, cartitem_id: cartItem.cartitem_id })}>
                                +</Button>
                        </Col>
                    </Row>
                </Col>

                <Col style={{ padding: '0', paddingLeft: '1.05vw' }} className="user-inner-col user-inner-col--product-removal" md={1}>
                    <Popup modal closeOnDocumentClick={false}
                        trigger={open => <Button variant="danger" className="shopping-cart__button">Remove</Button>}>
                        {close => <ConfirmDeletePopup close={close} />}
                    </Popup>
                </Col>
                <Col style={{}} className="user-inner-col user-inner-col--product-line-price" md={{ span: 1, offset: 1 }}>${cartItem.price !== undefined ? (cartItem.price).toFixed(2) :
                    (cartItem.stock_price * cartItem.quantity).toFixed(2)}</Col>
            </Row>
        </>
    )
}

export default ShoppingCartRow
