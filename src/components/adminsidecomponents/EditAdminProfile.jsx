import React from 'react'
import { useState } from 'react'
import { Row, Button, Form } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useHistory,
    Redirect
} from "react-router-dom";


function EditAdminProfile({admin_id}) {
    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [cfmPass, setCfmPass] = useState("")

    const history = useHistory();

    const onCancel = () => {
        history.goBack();
    }

    const ConfirmPopup = ({ close }) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Details?</h3>
                <Button className="popup-card__button" onClick={() => updateAdminPasswordbyId(admin_id, { password: newPass })
                .then(window.location.href = 'http://localhost:3000/adminprofile')}>OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    const updateAdminPasswordbyId = (admin_id, data) => {
        return new Promise((resolve, reject) => {
        fetch(`https://apibounwe.herokuapp.com/adminpwd/${admin_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'access_right': localStorage.getItem('access_right')
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                // console.log(JSON.stringify(json))
                return resolve(json)
            }).catch((err) => {
                console.log(err);
                return reject(err);
            });
        })
    }

    return (
        <div className="admin-card" fluid>
            <Row className="admin-row">
                <h1 className="admin-header">
                    Change Password
                </h1>
                <div className="admin-line-div"></div>
            </Row>
            <Row className="admin-row">
                <Form className="admin-form">
                    <Form.Group size="md" className="admin-form__input-container" controlId="email">
                        <Form.Label className="admin-form__label">Current Password</Form.Label>
                        <Form.Control
                            type="text"
                            className="admin-form__input"
                            onChange={(e) => setCurrentPass(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="md" className="admin-form__input-container" controlId="email">
                        <Form.Label className="admin-form__label">New Password</Form.Label>
                        <Form.Control
                            type="text"
                            className="admin-form__input"
                            onChange={(e) => setNewPass(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="md" className="admin-form__input-container" controlId="email">
                        <Form.Label className="admin-form__label">Confirm New Password</Form.Label>
                        <Form.Control
                            type="text"
                            className="admin-form__input"
                            onChange={(e) => setCfmPass(e.target.value)}
                        />
                    </Form.Group>
                    <Row className="admin-form__row">
                        <Popup
                            modal
                            closeOnDocumentClick={false}
                            trigger={open =>
                                <Button className="admin-form__button" block size="lg">
                                    Save
                                </Button>
                            }
                        >
                            {close => <ConfirmPopup close={close} />}
                        </Popup>
                        <Button className="admin-form__button" block size="lg" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Row>
        </div>
    )
}

export default EditAdminProfile;