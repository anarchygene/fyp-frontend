import React, { useState, useEffect } from "react";
import PaypalButton from "./PaypalButton"
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/payment.css';

function Payment() {
  let [pay, setPay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [address, setAddress] = useState("")
  const [unitnum, setUnitnum] = useState("")
  const [postcode, setPostcode] = useState("")
  const [time, setTime] = useState("")
  let products = JSON.parse(window.localStorage.getItem("cartItems"))
  const [items, setItems] = useState([])
  const [display, setDisplay] = useState([])
  const [totalAmt, setTotalAmt] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discounts, setDiscounts] = useState({})
  const [discountCode, setDiscountCode] = useState("")
  const [order, setOrder] = useState([])
  const [orderInfo, setOrderInfo] = useState({})
  const [show, setShow] = useState(false)
  let shipping = 8
    

  useEffect(() => {
    getCartItemByUserId(window.localStorage.getItem('user_id'))
      .then((product) => {
        // alert(JSON.stringify(product))
        if (products == null || product.length == 0) {
          setShow(false)
          window.location.href = 'https://celinechow.github.io/fyp-frontend/#//shoppingcart'
        } else {
          setShow(true)
          let total = 0
          let id = 1
          for (var i of product) {
            let x = {
              name: i.product_name,
              unit_amount: {
                currency_code: "SGD",
                value: i.stock_price.toFixed(2)
              },
              quantity: i.quantity
            }
            total += i.stock_price * i.quantity
            setItems(items => [...items, x])
            console.log(items)
            setDisplay(display => 
              [...display,
                <li className="user-list__item user-list__item--payment-cart" key={id}>
                  <Row style={{paddingLeft:'0.75vw'}} className="user-row__list-item user-row__list-item--payment-cart">
                    <Col className="user-col__list-item user-col__list-item--image" md={3}>
                      <div className="user-list__image-div user-list__image-div--payment-cart">
                        <img className="user-list__image user-list__image--payment-cart" src={i.product_img}/>
                      </div>
                    </Col>
                    <Col style={{paddingLeft:'1.5vw',paddingRight:'0'}} className="user-col__list-item user-col__list-item--text" md={8}>  
                      <span className="user-list__text user-list__text--product">{i.product_name} </span>
                      <br/>
                      <span className="user-list__text user-list__text--price">${i.stock_price.toFixed(2)} </span>
                      <br/>
                      <span className="user-list__text user-list__text--stock">{i.stock_size} </span>
                      <br/>
                      <span className="user-list__text user-list__text--quantity">Qty: {i.quantity} </span>
                      <br/>
                    </Col>
                  </Row> 
                </li>
              ]
            )
            id++
          }
          setTotalAmt(total)
        }
      })
    console.log("item" + order)
    console.log("dis" + display)
  }, [])

  useEffect(() => {
    setOrder([{
      description: "Ninemars",
      amount: {
        currency: "SGD",
        value: (totalAmt * (1 - (Number(discount) / 100)) + shipping).toFixed(2),
        breakdown: {
          item_total: {
            currency_code: "SGD",
            value: totalAmt.toFixed(2)
          },
          shipping: {
            currency_code: "SGD",
            value: 8
          },
          discount: {
            currency_code: "SGD",
            value: (totalAmt * (Number(discount) / 100)).toFixed(2)
          }
        }
      },
      items: items
    }])
  }, [items, totalAmt, discount])

  useEffect(() => {
    setOrderInfo({ shipping_address: address, unit: unitnum, postal_code: postcode, delivery_date: startDate, delivery_time_range: time })
    console.log("o" + JSON.stringify(orderInfo))
  }, [address, unitnum, postcode, time])

  const getCartItemByUserId = (user_id) => {
    return new Promise((resolve, reject) => {
      if (user_id === null) {
        return resolve(JSON.parse(window.localStorage.getItem("cartItems")))
      }
      fetch(`https://apibounwe.herokuapp.com/cartuser/${user_id}`)
        .then(res => res.json())
        .then((json) => {
          products = json
          return resolve(products)
        }).catch((err) => {
          console.log(err);
          return reject(err)
        });
    })

  }

  const getDiscountbyName = (discount_code) => {
    fetch(`https://apibounwe.herokuapp.com/discountbyname/${discount_code}`)
      .then(res => res.json())
      .then((json) => {
        if(json.length != 0 ){
        if (json[0].active != 0){
          setDiscount(json[0].discount_amount)
          console.log("hello" + JSON.stringify(json))
        } else {
          alert('Invalid Discount Code')
        }} else {
          alert('Invalid Discount Code')
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
    {/* New Payment Page */}
    <Container className="user-container" fluid>
      <Row className="user-row">
        <span className="user-span user-span--checkout-header">Checkout</span> 
      </Row>
      <Row style={{ marginLeft:'3vw' }} className="user-row">
        <Col className="user-col" md={{span:8}}>
          <Container style={{ marginBottom:"7.5vh" }} className="user-container__delivery-info" fluid>
            <Row className="user-inner-row user-inner-row--delivery-header">
              Delivery Information
            </Row>
            <Row className="user-inner-row user-inner-row--delivery-form">              
              <Form style={{ paddingLeft:'2.5vw' }} className="user-form__delivery">
                <Form.Group className="user-form__group">
                  <Form.Label className="user-form__label">Shipping Address</Form.Label>
                  <Form.Control className="user-form__input" placeholder="Enter your shipping address here." onChange={(a) => setAddress(a.target.value)} value={address}></Form.Control>
                </Form.Group>
                <Form.Group className="user-form__group">
                  <Form.Label className="user-form__label">Unit No.</Form.Label>
                  <Form.Control className="user-form__input" placeholder="Enter your unit number here." onChange={(a) => setUnitnum(a.target.value)} value={unitnum}></Form.Control>
                </Form.Group>
                <Form.Group className="user-form__group">
                  <Form.Label className="user-form__label">Postal Code</Form.Label>
                  <Form.Control className="user-form__input" placeholder="Enter your postal code here." onChange={(a) => setPostcode(a.target.value)} value={postcode}></Form.Control>
                </Form.Group>
                <Form.Group className="user-form__group">
                  <Form.Label className="user-form__label">Delivery Date</Form.Label>
                  <br></br>
                  <DatePicker className="user-form__date" selected={startDate} onChange={(date) => setStartDate(date)} value={startDate}  />
                </Form.Group>
                <Form.Group className="user-form__group">
                  <Form.Label className="user-form__label">Delivery Time</Form.Label>
                  <Form.Control className="user-form__input" placeholder="Enter in 24-hr format (e.g. 16:00-17:00)" onChange={(a) => setTime(a.target.value)} value={time}></Form.Control>
                </Form.Group>
              </Form>
            </Row>
          </Container>
        </Col>
        <Col className="user-col" md={{span:3}}>
          <Row style={{ padding:"0" }} className="user-inner-row user-inner-row--payment">
            <Container className="user-container__payment" fluid>
              <Row className="user-deep-row user-deep-row--payment-header">
                Payment
              </Row>
              <Row style={{ paddingLeft:'0',paddingTop:'0' }} className="user-deep-row user-deep-row--payment-content">
                <Container style={{ paddingLeft:'1vw' }} className="user-container__total">
                    <Form className="user-inner-row user-inner-row--discount-form">
                      <Form.Group className="user-form__group user-form__group--discount">
                        <Form.Label className="user-form__label user-form__label--discount">Discount Codes</Form.Label>
                        <Form.Control className="user-form__input user-form__input--discount" onChange={(e) => setDiscountCode(e.target.value)} placeholder="Enter your discount code here."></Form.Control>
                      </Form.Group>
                      <Button style={{ marginBottom:'1vh' }}  className="user-button__discount" variant="success" onClick={()=>getDiscountbyName(discountCode)}>
                        Apply
                      </Button>
                    </Form>
                    <span className="user-span__text user-span__text--title">Subtotal: <span className="user-span__text user-span__text--data">${totalAmt.toFixed(2)}</span></span>
                    <br/>
                    <span className="user-span__text user-span__text--title">Discount: <span className="user-span__text user-span__text--data">${(totalAmt * (Number(discount) / 100)).toFixed(2)}</span></span>
                    <br/>
                    <span className="user-span__text user-span__text--title">Shipping: <span className="user-span__text user-span__text--data">${shipping.toFixed(2)}</span></span>
                    <br/>
                    <span className="user-span__text user-span__text--title">Total price: <span className="user-span__text user-span__text--data"><b>${(totalAmt * (1- (Number(discount) / 100)) + 8 ).toFixed(2)}</b></span></span>
                    <br/>

                    {pay ? (<><br/><PaypalButton product={order} orderInfo={orderInfo} /><Button style={{ marginTop:'0' }} variant="danger" onClick={() => { setPay(false) }}>Close</Button></>) :
                      (<Button style={{ marginTop:'1vh' }} variant="success" onClick={() => { setPay(true) }}>Payment</Button>)
                    }
                </Container>                
              </Row>
            </Container>
          </Row>
          <Row style={{ padding:"0" }} className="user-inner-row user-inner-row--cart">
            <Container className="user-container__cart" fluid>
              <Row className="user-deep-row user-deep-row--cart-header">
                Cart
              </Row>
              <Row className="user-deep-row user-deep-row--cart-content">
                <Container style={{marginTop:'0',paddingLeft:'0',paddingRight:'0'}} className="user-container__cart-scroll" fluid>
                  <ul className="user-list user-list--payment-cart">
                    {display}
                  </ul>
                </Container>
              </Row>
            </Container>
          </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Payment;
