import { BrowserRouter as Router, Switch, Route, useHistory, Link, useParams } from "react-router-dom";
import { Container, Button, Form, Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import Popup from 'reactjs-popup';

function EditDiscountDetails() {
    const [discount_name, setDiscountName] = useState('')
    const [discount_code, setDiscountCode] = useState('')
    const [discount_amount, setDiscountAmount] = useState('')
    const [active, setDiscountBoolean] = useState(false)


    const history = useHistory();

    const onBack = () => {
        history.goBack();
    }

    let {discount_id} = useParams()

    useEffect(() => {
        getDiscountById(discount_id)
    }, [])

    const getDiscountById = (discount_id) => {
        fetch(`https://apibounwe.herokuapp.com/discountbyid/${discount_id}`)
            .then(res => res.json())
            .then((json) => {
                setDiscountName(json[0].discount_name)
                setDiscountCode(json[0].discount_code)
                setDiscountAmount(json[0].discount_amount)
                setDiscountBoolean(json[0].active)
            }).catch((err) => {
                console.log(err);
            });
    }

    const updateDiscountById = (data) => {
        alert(JSON.stringify(data))
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/updatediscount`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'access_right': localStorage.getItem('access_right')
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    resolve(json)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                });
        });
    }


    const onSubmit = () => {
        updateDiscountById({ discount_name, discount_code, discount_amount, "active": active ? 1 : 0, discount_id })
        .then(() => window.location.href = 'https://celinechow.github.io/fyp-frontend/#//managediscountcode')
    }

    let [editName, setEditName] = useState(false)
    let [editCode, setEditCode] = useState(false)
    let [editAmount, setEditAmount] = useState(false)


    const onClickName = () => {
        setEditName(true)
        let boolean_array = [setEditCode, setEditAmount];
        boolean_array.forEach((bool) => {
            bool(false)
        })
    }

    const onClickCode = () => {
        setEditCode(true)
        let boolean_array = [setEditName, setEditAmount];
        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    const onClickAmount = () => {
        setEditAmount(true)
        let boolean_array = [setEditName, setEditCode];
        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    const discountAmountValidation = (e) => {
        const validAmount = new RegExp("^([1-9][0-9]?|100)$");
        const amountValueString = e.target.value;
        if (validAmount.test(amountValueString)) {
            setDiscountAmount(parseInt(amountValueString));
        } else {
            alert("Enter a value Between 1 to 100");
            setDiscountAmount("");
        }
    }

    function onToggle() {
        setDiscountBoolean(!active)
    }

    const ConfirmPopup = ({ close }) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Details?</h3>
                <Button className="popup-card__button" onClick={() => onSubmit()} type="submit">OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <Container className="admin-container" fluid>
            <div className="admin-card">
                <Button className="admin-button" onClick={onBack}>Back</Button>
                <h1 className="admin-header">Edit discount details</h1>
                <Form className="admin-form">
                    <Form.Group className="admin-form__input-container" controlId="discountName">
                        <Form.Label className="admin-form__label">Discount Name</Form.Label>
                        {
                            !editName
                                ?
                                <Row className="admin-form__row">
                                    <Col xs={10}>
                                        <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={discount_name}>
                                        </Form.Control>
                                    </Col>
                                    <Col xs={2}>
                                        <PencilSquare onClick={onClickName} />
                                    </Col>
                                </Row>
                                : null
                        }
                        {
                            editName
                                ?
                                <Row className="admin-form__row">
                                    <Form.Control type="name" className="admin-form__input" placeholder="Enter new discount name" required
                                        value={discount_name} onChange={(e) => setDiscountName(e.target.value)} />
                                </Row>
                                : null
                        }
                    </Form.Group>

                    <Form.Group className="admin-form" controlId="discountCode">
                        <Form.Label className="admin-form__label">Discount Code</Form.Label>
                        {
                            !editCode
                                ?
                                <Row className="admin-form__row">
                                    <Col xs={10}>
                                        <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={discount_code}>
                                        </Form.Control>
                                    </Col>
                                    <Col xs={2}>
                                        <PencilSquare onClick={onClickCode} />
                                    </Col>
                                </Row>
                                : null
                        }
                        {
                            editCode
                                ?
                                <Row className="admin-form__row">
                                    <Form.Control type="text" className="admin-form__input" placeholder="Enter new discount code" required
                                        value={discount_code} onChange={(e) => setDiscountCode(e.target.value)} />
                                </Row>
                                : null
                        }

                    </Form.Group>
                    <Form.Group className="admin-form" controlId="discountAmount">
                        <Form.Label className="admin-form__label">Discount Amount</Form.Label>
                        {
                            !editAmount
                                ?
                                <Row className="admin-form__row">
                                    <Col xs={10}>
                                        <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={discount_amount}>
                                        </Form.Control>
                                    </Col>
                                    <Col xs={2}>
                                        <PencilSquare onClick={onClickAmount} />
                                    </Col>
                                </Row>
                                : null
                        }
                        {
                            editAmount
                                ?
                                <Row className="admin-form__row">
                                    <Form.Control type="number" className="admin-form__input" placeholder="Enter value between 1 and 100 (1 and 100 inclusive)" required
                                        value={discount_amount} onChange={e => discountAmountValidation(e)} />
                                </Row>
                                : null
                        }
                    </Form.Group>
                    <Form.Group className="admin-form" controlId="discountActive">
                        <Form.Label className="admin-form__label">Activate/Deactivate Discount </Form.Label>
                        {
                            active == 1
                                ?
                                <Row className="admin-form__row">
                                    Active
                                    <div className='custom-control custom-switch'>
                                        <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked onClick={() => onToggle()} />
                                        <label className='custom-control-label' htmlFor='customSwitchesChecked'></label>
                                    </div>
                                </Row>
                                :
                                <Row className="admin-form__row">
                                    Inactive
                                    <div className='custom-control custom-switch'>
                                        <input type='checkbox' className='custom-control-input' id='customSwitches' readOnly onClick={() => onToggle()} />
                                        <label className='custom-control-label' htmlFor='customSwitches'></label>
                                    </div>
                                </Row>
                        }
                    </Form.Group>

                    <Popup
                        modal
                        closeOnDocumentClick={false}
                        trigger={open =>
                            <Button className="admin-form__button" block size="lg">
                                Submit
                            </Button>}
                    >
                        {close => <ConfirmPopup close={close} />}
                    </Popup>
                </Form>
            </div>
        </Container>
    )
}


export default EditDiscountDetails;