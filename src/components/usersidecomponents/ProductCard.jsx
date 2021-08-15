import React from 'react'
import { Card, Col } from 'react-bootstrap'
import '../css/itemcard.css'

function ProductCard({ name, img, price, size }) {
    return (
            <Col style={{padding:0}} className="user-item-card__col">
                <Card className="user-item-card">
                    <Card.Img variant="top" className="user-item-card__image" src={img} />
                    <Card.Body style={{paddingBottom: '0'}} className="user-item-card__body">
                        <Card.Title style={{marginBottom:'0'}} className="user-item-card__title"><span className="user-item-card__span user-item-card__span--bold">{name}</span></Card.Title>
                    </Card.Body>
                    <Card.Body className="user-item-card__body">
                        <Card.Subtitle className="user-item-card__subtitle">${parseFloat(price).toFixed(2)} | {size}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Col>
    )
}

export default ProductCard;