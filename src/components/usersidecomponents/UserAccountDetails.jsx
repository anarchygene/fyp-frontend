import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Table } from 'react-bootstrap';
import '../css/useraccountdetails.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { PencilSquare } from 'react-bootstrap-icons';
import Popup from 'reactjs-popup';


function UserOrderRow({ sn, invoice, cdate, number, customer, total, status, ddate }) {
  return (
    <tr className="user-table__body-row">
      <td className="user-table__body-data">{sn}</td>
      <td className="user-table__body-data">{invoice}</td>
      <td className="user-table__body-data">{cdate}</td>
      <td className="user-table__body-data">${total}</td>
      <td className="user-table__body-data">{status}</td>
      <td className="user-table__body-data">{ddate}</td>
    </tr>
  )
}

function AccountDetails() {
  let user_id = window.localStorage.getItem('user_id')

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfmNewPassword, setCfmNewPassword] = useState("");

  const [address, setAddress] = useState("Address");
  const [postalCode, setPostalCode] = useState("Postal Code");
  const [unitNo, setUnitNo] = useState("Unit No");

  const [email, setEmail] = useState("Email");
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");

  const [pContactNo, setPContactNo] = useState("P Contact No");
  const [sContactNo, setSContactNo] = useState("S Contact No");


  let [editPassword, setEditPassword] = useState(false)
  let [editEmail, setEditEmail] = useState(false)

  let [editAddress, setEditAddress] = useState(false)
  let [editPostalCode, setEditPostalCode] = useState(false)
  let [editUnitNo, setEditUnitNo] = useState(false)

  let [editFirstName, setEditFirstName] = useState(false)
  let [editLastName, setEditLastName] = useState(false)

  let [editPContactNo, setEditPContactNo] = useState(false)
  let [editSContactNo, setEditSContactNo] = useState(false)

  useEffect(() => {
    getUserById(window.localStorage.getItem('user_id'))
  }, [])

  const getUserById = (user_id) => {
    if (user_id === null) {
      return
    }
    fetch(`https://apibounwe.herokuapp.com/user/${user_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
      .then(res => res.json())
      .then((json) => {
        setFirstName(json[0].first_name)
        setLastName(json[0].last_name)
        setEmail(json[0].email)
        setAddress(json[0].address)
        setPostalCode(json[0].postal_code)
        setPContactNo(json[0].pcontact_no)
        setSContactNo(json[0].scontact_no)
        setUnitNo(json[0].unit_no)
      }).catch((err) => {
        console.log(err);
      });
  }
  const updateUserById = (data) => {
    fetch(`https://apibounwe.herokuapp.com/user`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((json) => {
        window.location.reload()
      }).catch((err) => {
        alert(`Error at updateUser: ${err}`)
        console.log(err);
      });
  }

  const updateUserpwdById = (data) => {
    fetch(`https://apibounwe.herokuapp.com/userpwd`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((json) => {
        console.log(json)
      }).catch((err) => {
        alert(`Error at updateUser: ${err}`)
        console.log(err);
      });
  }

  const onClickEmail = () => {
    setEditEmail(true)

    let boolean_array = [setEditAddress, setEditPostalCode, setEditUnitNo, setEditFirstName, setEditLastName, setEditPContactNo, setEditSContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onClickAddress = () => {
    setEditAddress(true)

    let boolean_array = [setEditEmail, setEditPostalCode, setEditUnitNo, setEditFirstName, setEditLastName, setEditPContactNo, setEditSContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onClickPostalCode = () => {
    setEditPostalCode(true)

    let boolean_array = [setEditEmail, setEditAddress, setEditUnitNo, setEditFirstName, setEditLastName, setEditPContactNo, setEditSContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onClickUnitNo = () => {
    setEditUnitNo(true)

    let boolean_array = [setEditEmail, setEditAddress, setEditPostalCode, setEditFirstName, setEditLastName, setEditPContactNo, setEditSContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onClickFirstName = () => {
    setEditFirstName(true)

    let boolean_array = [setEditEmail, setEditAddress, setEditPostalCode, setEditUnitNo, setEditLastName, setEditPContactNo, setEditSContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onClickLastName = () => {
    setEditLastName(true)

    let boolean_array = [setEditEmail, setEditAddress, setEditPostalCode, setEditUnitNo, setEditFirstName, setEditPContactNo, setEditSContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onClickPContactNo = () => {
    setEditPContactNo(true)

    let boolean_array = [setEditEmail, setEditAddress, setEditPostalCode, setEditUnitNo, setEditFirstName, setEditLastName, setEditSContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onClickSContactNo = () => {
    setEditSContactNo(true)

    let boolean_array = [setEditEmail, setEditAddress, setEditPostalCode, setEditUnitNo, setEditFirstName, setEditLastName, setEditPContactNo];

    boolean_array.forEach((bool) => {
      bool(false)
    })
  }
  const onSubmit = () => {
    updateUserById({
      email: email,
      first_name: firstName,
      last_name: lastName,
      address: address,
      postal_code: postalCode,
      unit_no: unitNo,
      pcontact_no: pContactNo,
      scontact_no: sContactNo,
      user_id: window.localStorage.getItem('user_id')
    })
  }

  const ConfirmSubmitPopup = ({ close }) => {
    return (
      <div className="popup-card__update-user">
        <p className="popup-card__update-user--header">Update User Profile?</p>
        <Button variant="success"  className="popup-card__button popup-card__button--confirm-update" onClick={() => onSubmit()} type="submit">Confirm</Button>
        <br/>
        <Button variant="secondary" className="popup-card__button popup-card__button--cancel-update" onClick={close}>Cancel</Button>
      </div>
    )
  }


  return (
    <>
      {!editPassword
        ? 
        <>
        <span className="user-header user-header--account">User Account</span>
        <div style={{marginBottom:'2.5vh'}}>
          <Form className="user-form user-form--update-user">
            <Form.Group size="lg" className="user-form__input-container" controlId="firstName">
              {
                !editFirstName
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">First Name</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly" value={firstName}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickFirstName} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set First Name</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setFirstName(e.target.value)} value={firstName}></Form.Control>
                  </Row>
              }
            </Form.Group>
            <Form.Group size="lg" className="user-form__input-container" controlId="lastName">
              {
                !editLastName
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">Last Name</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly" value={lastName}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickLastName} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set Last Name</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setLastName(e.target.value)} value={lastName}></Form.Control>
                  </Row>
              }
            </Form.Group>
            <Form.Group size="lg" className="user-form__input-container" controlId="email">
              {
                !editEmail
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">Email</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly" value={email}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickEmail} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set Email</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setEmail(e.target.value)} value={email}></Form.Control>
                  </Row>
              }
            </Form.Group>
            <Form.Group size="lg" className="user-form__input-container" controlId="address">
              {
                !editAddress
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">Address</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly" value={address}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickAddress} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set Address</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setAddress(e.target.value)} value={address}></Form.Control>
                  </Row>
              }
            </Form.Group>
            <Form.Group size="lg" className="user-form__input-container" controlId="postalCode">
              {
                !editPostalCode
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">Postal Code</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly" value={postalCode}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickPostalCode} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set Postal Code</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setPostalCode(e.target.value)} value={postalCode}></Form.Control>
                  </Row>
              }
            </Form.Group>
            <Form.Group size="lg" className="user-form__input-container" controlId="unitNo">
              {
                !editUnitNo
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">Unit No</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly"
                        value={unitNo === '' ? 'Have yet to set' : unitNo}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickUnitNo} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set Email</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setUnitNo(e.target.value)} value={unitNo}></Form.Control>
                  </Row>
              }
            </Form.Group>
            <Form.Group size="lg" className="user-form__input-container" controlId="pContactNo">
              {
                !editPContactNo
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">P Contact No</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly"
                        value={pContactNo === '' ? 'Have yet to set' : pContactNo}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickPContactNo} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set P Contact No</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setPContactNo(e.target.value)} value={pContactNo}></Form.Control>
                  </Row>
              }
            </Form.Group>
            <Form.Group size="lg" className="user-form__input-container" controlId="sContactNo">
              {
                !editSContactNo
                  ?
                  <Row className="user-form__row user-form__row--update-user">
                    <Col className="user-form__col" xs={10}>
                      <Form.Label className="user-form__label user-form__label--update-user">S Contact No</Form.Label>
                      <Form.Control plaintext readOnly className="user-form__input-readonly"
                        value={sContactNo === '' ? 'Have yet to set' : sContactNo}>
                      </Form.Control>
                    </Col>
                    <Col className="user-form__col" xs={{span:1,offset:1}}>
                      <PencilSquare className="user-form__icon" onClick={onClickSContactNo} />
                    </Col>
                  </Row>
                  :
                  <Row className="user-form__row user-form__row--update-user">
                    <Form.Label className="user-form__label user-form__label--update-user">Set S Contact No</Form.Label>
                    <Form.Control className="user-form__input" onChange={(e) => setSContactNo(e.target.value)} value={sContactNo}></Form.Control>
                  </Row>
              }
            </Form.Group>
          </Form>
          
          <Button variant="primary" block size="lg" style={{marginRight:'1vw'}} onClick={() => setEditPassword(!editPassword)}>Edit Password</Button>
          <Popup
            modal
            closeOnDocumentClick={false}
            trigger={open =>
              <Button variant="success"  className="btn-submit" block size="lg">
                Submit
              </Button>
            }
          >
            {close => <ConfirmSubmitPopup close={close} />}
          </Popup>

        </div>
        </>
        : null
      }
      {
        editPassword
        ? <div> 
        <Form.Group size="lg" className="user-form__input-container user-form__input-container--edit-password" controlId="password">
              <span className="user-span__edit-password-header">Edit Password</span>
              <Row className="user-form__row user-form__row--update-password">
                <Form.Label className="user-form__label user-form__label--update-user">Current Password</Form.Label>
                <Form.Control type="password" className="user-form__input" placeholder="Enter current password" required
                  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />

                <Form.Label className="user-form__label user-form__label--update-user">New Password</Form.Label>
                <Form.Control type="password" className="user-form__input" placeholder="Enter new password" required
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                <Form.Label className="user-form__label user-form__label--update-user">Confirm New Password</Form.Label>
                <Form.Control type="password" className="user-form__input" placeholder="Confirm new password" required
                  value={cfmNewPassword} onChange={(e) => setCfmNewPassword(e.target.value)} />
              </Row>
              <Button variant='success' block size="lg" style={{marginRight:'1vw'}} onClick={()=>updateUserpwdById({password: newPassword, user_id:user_id})}>Save</Button>
              <Button variant='secondary' block size="lg" onClick={()=>setEditPassword(!editPassword)}>Back</Button>
        </Form.Group>
        </div>
        : null
      }

    </>
  )
}

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([])
  const [orderItems, setOrderItems] = useState([])
  useEffect(() => {
    getOrderHistByUserId(window.localStorage.getItem('user_id'))
  }, [])

  const getOrderHistByUserId = (user_id) => {
    fetch(`https://apibounwe.herokuapp.com/orderhistory/${user_id}`, {
      headers: { 'access_right': localStorage.getItem('access_right'), authorization: `Bearer ${localStorage.getItem('jwttoken')}` }
    })
      .then(res => res.json())
      .then((json) => {
        if (json.err != "Order history not found") {
          // alert(JSON.stringify(json))
          setOrderHistory(json)
        }
        json.map((order) => {
          getOrderItemByOrderId(order.order_id)
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  const getOrderItemByOrderId = (order_id) => {
    fetch(`https://apibounwe.herokuapp.com/itemOrder/${order_id}`, {
      headers: { 'access_right': localStorage.getItem('access_right') }
    })
      .then(res => res.json())
      .then((json) => {
        setOrderItems([...orderItems, json])
        console.log(json)
      }).catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <span className="user-header user-header--account">Order History</span>
      <Table style={{marginTop:'2.5vh'}} className="user-table user-table--account" striped bordered hover>
        <thead className="user-table__header">
          <tr className="user-table__header-row">
            <th className="user-table__header-data">S/N</th>
            <th className="user-table__header-data">Invoice ID</th>
            <th className="user-table__header-data">Order Created</th>
            <th className="user-table__header-data">Total Amount</th>
            <th className="user-table__header-data">Delivery Status</th>
            <th className="user-table__header-data">Delivery Date</th>
          </tr>
        </thead>
        <tbody className="user-table__body">
          {orderHistory.map((orders, index) => (
            <>
            <UserOrderRow key={orders.order_id} sn={index + 1} invoice={orders.invoice_id} 
            cdate={new Date(orders.created_at).toUTCString().substring(0, 22)} 
            number={orders.order_id} customer={orders.user_id} total={orders.total_amount.toFixed(2)} status={orders.status} 
            ddate={new Date(orders.delivery_date).toUTCString().substring(0, 16)+" " + orders.delivery_time_range.substring(0,5)} />
            </>
          ))}
        </tbody>
      </Table>
    </>
  )
}

function UserAccountDetails() {
  return (
    <Container className="user-container" fluid>
      <Router>
        <Switch>
          <Route path="/useraccountdetails/accountdetails">
            <AccountDetails />
          </Route>
          <Route path={`/useraccountdetails/orderhistory`}>
            <OrderHistory />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default UserAccountDetails;