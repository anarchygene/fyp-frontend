import React from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import '../css/itemcard.css'
import { Link } from "react-router-dom"
import Popup from 'reactjs-popup';

function RecipeCardAdmin({ id, img, name, prep_time, cooking_time, desc }) {
    const deleteRecipebyId = (recipe_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipe/${recipe_id}`, {
                method: 'DELETE',
                headers: {
                    'access_right': localStorage.getItem('access_right')
                }
            })
                .then(res => res.json())
                .then((json) => {
                    console.log("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const ConfirmDeletePopup = ({close}) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Delete?</h3>
                <Button className="popup-card__button" 
                onClick={() => deleteRecipebyId(id)
                .then(window.location.href = 'http://localhost:3000/managerecipes')} 
                type="submit">OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <Col className="admin-card-col" xs={3}>
            <Card className="admin-item-card">
                <Card.Img className="admin-item-card__image" variant="top" src={img} />
                <Card.Body className="admin-item-card__body">
                    <Card.Title className="admin-item-card__title">{name}</Card.Title>
                    <Card.Subtitle className="admin-item-card__subtitle">Preparation Time: {prep_time} 
                    <br></br>
                    Cooking Time: {cooking_time}</Card.Subtitle>
                    <br></br>
                    Serves 4
                    <Card.Text className="admin-item-card__text">{desc}</Card.Text>
                    <Link to={`/editrecipes/${id}`}>
                        <Button className="admin-item-card__button" >Edit</Button>
                    </Link> 
                    <Popup
                        modal
                        closeOnDocumentClick={false}
                        trigger={open=>
                            <Button variant="danger" className="admin-item-card__button">
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

export default RecipeCardAdmin;