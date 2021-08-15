import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

function AdminOrderDetails() {
    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([])
    const [delivery_date, setDeliveryDate] = useState('')
    const [date, setDate] = useState('')
    const [edit, setEdit] = useState(false)
    const [time, setTime] = useState("")


    const onBack = () => {
        window.location.href = 'http://localhost:3000/manageorders'
    }

    let status = order.status
    let { order_id } = useParams();

    const onToggle = () => {
        if (status == "Delivered") {
            status = "Pending"
        } else {
            status = "Delivered"
        }
        updateOrderByOrderId({
            order_id: order.order_id, delivery_date: delivery_date.slice(0, 10),
            delivery_time_range: order.delivery_time_range, total_amount: order.total_amount,
            shipping_address: order.shipping_address, postal_code: order.postal_code, status: status
        })
        window.location.reload();
    }

    const updateOrderByOrderId = (data) => {
        fetch(`https://apibounwe.herokuapp.com/order`, {
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
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getOrderNamebyOrderId = (order_id) => {
        fetch(`https://apibounwe.herokuapp.com/ordername/${order_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
            .then(res => res.json())
            .then((json) => {
                setOrder(json[0])
                setDeliveryDate(json[0].delivery_date.slice(0, 10))
                setDate(json[0].delivery_date.slice(0, 10))
                setTime(json[0].delivery_time_range)
            }).catch((err) => {
                console.log(err);
            });
    }

    const getOrderItemByOrderId = (order_id) => {
        fetch(`https://apibounwe.herokuapp.com/itemOrder/${order_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
            .then(res => res.json())
            .then((json) => {
                // console.log("json " + JSON.stringify(json));
                setOrderItems(json)
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getOrderNamebyOrderId(order_id)
        getOrderItemByOrderId(order_id)
    }, [])

    return (
        <>
            <Container className="admin-container">
                <Button className="admin-form__button" block size="lg" onClick={onBack}>
                    Back
                </Button>
                <div className="admin-card">
                    <h3>Invoice #{order.order_id}</h3>
                    <div>User: {order.first_name} {order.last_name}</div>
                    <div>Delivery Date: {delivery_date}</div>
                    <div>Delivery Time Range: {order.delivery_time_range}</div>
                    <div>Total Amount: ${order.total_amount.toFixed(2)}</div>
                    <div>Shipping Address: {order.shipping_address}</div>
                    <div>Postal Code: {order.postal_code}</div>
                    <div>Order Made: {new Date(order.created_at).toUTCString().substring(0, 22)}</div>
                    <div id="status">Status: {order.status}
                        {(order.status === "Delivered")
                            ? <div className='custom-control custom-switch'>
                                <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked onChange={onToggle} />
                                <label className='custom-control-label' htmlFor='customSwitchesChecked'></label>
                            </div>
                            : <div className='custom-control custom-switch'>
                                <input type='checkbox' className='custom-control-input' id='customSwitches' readOnly onChange={onToggle} />
                                <label className='custom-control-label' htmlFor='customSwitches'></label>
                            </div>
                        }
                        {
                            !edit
                                ?
                                <div>
                                    <Button onClick={() => setEdit(!edit)}>Edit Delivery Date and Time</Button>
                                    <Table className="admin-table" striped bordered hover>
                                        <thead className="admin-table__header">
                                            <tr className="admin-table__header-row">
                                                <th className="admin-table__header-col">Order Item</th>
                                                <th className="admin-table__header-col">Quantity</th>
                                            </tr>
                                        </thead>
                                        {orderItems.map((orderItem) => (
                                                    <tr className="admin-table__body-row">
                                                    <td className="admin-table__body-data">{orderItem.product_name}, {orderItem.stock_size}</td>
                                                    <td className="admin-table__body-data">{orderItem.quantity}</td>
                                                </tr>
                                ))}
                                </Table>
                                </div>
                                    : null
                        }
                                    {
                                        edit
                                            ?
                                            <Form className="admin-form">
                                                <br></br>
                                                <Row className="admin-form__row">
                                                    <p className="admin-form__header">
                                                        Edit Delivery Date and Time:
                                                    </p>
                                                    <div className="admin-form__line"></div>
                                                </Row>
                                                <Row className="admin-form__row">
                                                    <Form.Group>
                                                        <Form.Label>Delivery Date</Form.Label>
                                                        <br></br>
                                                        <Form.Control placeholder="Format: YYYY-MM-DD" onChange={(a) => setDate(a.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="admin-form__row">
                                                    <Form.Group>
                                                        <Form.Label>Delivery Time</Form.Label>
                                                        <Form.Control placeholder="Enter in 24-hr format (16:00-17:00)" onChange={(a) => setTime(a.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Button type="submit"
                                                        onClick={() => updateOrderByOrderId({
                                                            order_id: order.order_id, delivery_date: date,
                                                            delivery_time_range: time, total_amount: order.total_amount,
                                                            shipping_address: order.shipping_address, postal_code: order.postal_code, status: order.status
                                                        })}
                                                    >Save</Button>
                                                    <Button variant="danger" onClick={() => setEdit(!edit)}>Cancel</Button>
                                                </Row>
                                            </Form>
                                            : null
                                    }
                                </div>
                </div>
            </Container>
        </>
            )
}

            export default AdminOrderDetails