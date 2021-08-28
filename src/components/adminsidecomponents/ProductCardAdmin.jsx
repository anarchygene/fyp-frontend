import React from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import '../css/itemcard.css'
import { NavLink } from "react-router-dom"
import Popup from 'reactjs-popup';

function ProductCardAdmin({ id, name, img, deleteFunction, price, size}) {

    const ConfirmDeletePopup = ({close}) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Delete?</h3>
                <Button className="popup-card__button" onClick={() => deleteFunction(id).then(window.location.href='https://celinechow.github.io/fyp-frontend/#/manageproducts')} type="submit">OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <Col className="admin-card-col" xs={3}>
            <Card style={{backgroundColor:'white'}} className="admin-item-card">
                <Card.Img className="admin-item-card__image" variant="top" src={img} />
                <Card.Body className="admin-item-card__body">
                    <Card.Title className="admin-item-card__title">{name}</Card.Title>
                    <Card.Subtitle className="admin-item-card__subtitle">${price} | {size}</Card.Subtitle>
                    <NavLink to={`/editproducts/${id}`}>
                        <Button  className="admin-item-card__button">Edit</Button>
                    </NavLink>
                    <Popup
                        modal
                        closeOnDocumentClick={false}
                        trigger={open=>
                            <Button  className="admin-item-card__button" variant="danger">
                                Delete
                            </Button>
                        }
                        >
                            {close => <ConfirmDeletePopup close={close} />}
                    </Popup> 
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCardAdmin;