import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import { Container, Button, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

function AddDiscount() {
    const [discount_name, setDiscountName] = useState("")
    const [discount_code, setDiscountCode] = useState("")
    const [discount_amount, setDiscountAmount] = useState("")
    const [active, setDiscountBoolean] = useState(false)
    const history = useHistory();


    const onCancel = () => {
        history.goBack();
    }

    const onSubmit = () => {
        addDiscount({ discount_name, discount_code, discount_amount, active })
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

    const addDiscount = (data) => {
        fetch(`https://apibounwe.herokuapp.com/discount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_right': localStorage.getItem('access_right')
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                console.log("json " + JSON.stringify(json));
                history.goBack()
            }).catch((err) => {
                console.log(err);
            });
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

    const onToggle = () => {
        if (active) {
            setDiscountBoolean(false)
        } else {
            setDiscountBoolean(true)
        }
    }

    return (
        <Container className="admin-container" fluid>
            <div className="admin-card">
                <h1 className="admin-header">Add Discount Code</h1>
                <Form className="admin-form">
                    <Form.Group className="admin-form__input-container" controlId="discountName">
                        <Form.Label className="admin-form__label">Discount Name</Form.Label>
                        <Row className="admin-form__row">
                            <Form.Control type="name" className="admin-form__input" placeholder="Enter new discount name" required
                                value={discount_name} onChange={(e) => setDiscountName(e.target.value)} />
                        </Row>
                    </Form.Group>

                    <Form.Group className="admin-form" controlId="discountCode">
                        <Form.Label className="admin-form__label">Discount Code</Form.Label>
                        <Row className="admin-form__row">
                            <Form.Control type="text" className="admin-form__input" placeholder="Enter new discount code" required
                                value={discount_code} onChange={(e) => setDiscountCode(e.target.value)} />
                        </Row>
                    </Form.Group>
                    <Form.Group className="admin-form" controlId="discountAmount">
                        <Form.Label className="admin-form__label">Discount Amount</Form.Label>
                        <Row className="admin-form__row">
                            <Form.Control type="text" className="admin-form__input" placeholder="Enter value between 1 and 100 (1 and 100 inclusive)" required
                                value={discount_amount} onChange={e => discountAmountValidation(e)} />
                        </Row>
                    </Form.Group>
                    <Form.Group className="admin-form" controlId="discountActive">
                        <Form.Label className="admin-form__label">Activate/Deactivate Discount </Form.Label>
                        {
                            active
                                ?
                                <Row className="admin-form__row">
                                    Active
                                    <div className='custom-control custom-switch'>
                                        <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked onChange={onToggle} />
                                        <label className='custom-control-label' htmlFor='customSwitchesChecked'></label>
                                    </div>
                                </Row>
                                :
                                <Row className="admin-form__row">
                                    Inactive
                                    <div className='custom-control custom-switch'>
                                        <input type='checkbox' className='custom-control-input' id='customSwitches' readOnly onChange={onToggle} />
                                        <label className='custom-control-label' htmlFor='customSwitches'></label>
                                    </div>
                                </Row>
                        }
                    </Form.Group>

                    <Row className="admin-form__row">
                        <Popup
                            modal
                            closeOnDocumentClick={false}
                            trigger={open =>
                                <Button className="admin-form__button" block size="lg">
                                    Save
                                </Button>}
                        >
                            {close => <ConfirmPopup close={close} />}
                        </Popup>
                        <Button className="admin-form__button" block size="lg" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}


export default AddDiscount;