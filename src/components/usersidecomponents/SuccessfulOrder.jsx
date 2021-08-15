import React, { useState, useEffect } from "react";
import { Col, Button, Container } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import '../css/successfulorder.css'

function SuccessfulOrder() {
  let { id } = useParams()
  let user_id = window.localStorage.getItem('user_id')
  const [order, setOrder] = useState({})
  const [total, setTotal] = useState('')
  const [date, setDate] = useState('')

  const getOrderByOrderId = (order_id) => {
    return new Promise((resolve, reject) => {
      fetch(`https://apibounwe.herokuapp.com/order/${order_id}`, {
        headers: { 'access_right': localStorage.getItem('access_right') }
      })
        .then(res => res.json())
        .then((json) => {
          if (user_id === JSON.stringify(json[0].user_id)) {
            console.log("json " + JSON.stringify(json));
            setOrder(json[0])
            setTotal(json[0].total_amount.toFixed(2))
            setDate(json[0].delivery_date)
          }
          return resolve(json)
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
    })
  }
  const getOrderItemByOrderId = (order_id) => {

  }
  useEffect(() => {
    getOrderByOrderId(id)
  })

  return (
    <>
      <Container style={{ paddingLeft: '0', paddingRight: '0' }} className="user-container__success-order" fluid>
        <Col style={{ paddingLeft: '0', paddingRight: '0' }} className="user-col__success-order" md={{ span: 4, offset: 4 }}>
          <span className="user-span__success-order user-span__success-order-title--header">Order has been made successfully!</span>
          <br />
          <span className="user-span__success-order user-span__success-order-title--invoice">Invoice ID: <span className="user-span__success-order user-span__success-order-text--invoice">{order.invoice_id}</span></span>
          <br />
          <span className="user-span__success-order user-span__success-order-title--date">Delivery Date: <span className="user-span__success-order user-span__success-order-text--date">{date.substring(0, 10)}</span></span>
          <br />
          <span className="user-span__success-order user-span__success-order-title--time">Delivery Time: <span className="user-span__success-order user-span__success-order-text--time">{order.delivery_time_range}</span></span>
          <br />
          <span className="user-span__success-order user-span__success-order-title--amt">Total Amount: <span className="user-span__success-order user-span__success-order-text--amt">${total}</span></span>
          <br />
          <span className="user-span__success-order user-span__success-order-title--address">Shipping Address: <span className="user-span__success-order user-span__success-order-text--address">{order.shipping_address}</span></span>
          <br />
          <span className="user-span__success-order user-span__success-order-title--postal">Postal Code: <span className="user-span__success-order user-span__success-order-text--postal">{order.postal_code}</span></span>
          <br />
          <Link to="/home"><Button className="user-button__success-order" variant="success">OK</Button></Link>
        </Col>
      </Container>
    </>
  )
}
export default SuccessfulOrder;