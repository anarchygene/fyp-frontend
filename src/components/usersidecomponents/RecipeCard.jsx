import React from 'react'
import { Card, Col } from 'react-bootstrap'
import '../css/itemcard.css'

function RecipeCard({ img, name, desc, prep_time, cooking_time, id}) {    
    return (
        <Col style={{padding: '0'}} className="user-item-card__col">
            <Card style={{backgroundColor:'white'}} className="user-item-card">
                <Card.Img className="user-item-card__image" variant="top" src={img}/>
                <Card.Body className="user-item-card__body">
                    <Card.Title style={{ marginBottom: '0'}} className="user-item-card__title"><span className="user-item-card__span user-item-card__span--bold">{name}</span></Card.Title>
                    <Card.Subtitle className="user-item-card__subtitle user-item-card__subtitle--recipe">Preparation Time: {prep_time}</Card.Subtitle>
                    <Card.Subtitle className="user-item-card__subtitle user-item-card__subtitle--recipe">Cooking Time: {cooking_time}</Card.Subtitle>
                    <Card.Subtitle className="user-item-card__subtitle user-item-card__subtitle--recipe">Serves 4 pax</Card.Subtitle>
                    <Card.Subtitle className="user-item-card__subtitle user-item-card__subtitle--recipe">{desc}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default RecipeCard;