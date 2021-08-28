import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import Popup from 'reactjs-popup';
import { PencilSquare } from 'react-bootstrap-icons';

function EditRecipeCategoriesRow({id, name, index}) {
    const [editCat, setEditCat] = useState(false)
    const [catName, setCatName] = useState("")

    const onClickEdit = () => {
        setEditCat(true)
    }

    const onCancel = () => {
        setEditCat(false)
    }

    const onAdd = () => {
        console.log(id + catName)
        updateRecipeCategoryById({"rcat_id": id, "rcat_name": catName})
        .then(
            window.location.href = 'https://celinechow.github.io/fyp-frontend/#/managerecipes'
        )
    }

    const updateRecipeCategoryById = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipeCategory/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'access_right': localStorage.getItem('access_right')
                  },
                body: JSON.stringify(data)
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

    const deleteRecipeCategorybyId = (rcat_id, data = { rcat_id: rcat_id }) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipeCategory`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'access_right': localStorage.getItem('access_right')
                },
                body: JSON.stringify(data)
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

    const ConfirmDeletePopup = ({ close, id }) => {
        console.log(id)
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Delete?</h3>
                <Button className="popup-card__button" type="submit" onClick={() => deleteRecipeCategorybyId(id)
                    .then(window.location.href = 'https://celinechow.github.io/fyp-frontend/#/managerecipes')
                    } >OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <>
            {
                !editCat
                    ? 
                    <ListGroup.Item action>
                        {index + 1}. {name}
                        <PencilSquare onClick={onClickEdit}></PencilSquare>
                        <Popup modal closeOnDocumentClick={false} trigger={open => <Button variant="danger">-</Button>}>
                            {close => <ConfirmDeletePopup id={id} close={close} />}
                        </Popup>
                    </ListGroup.Item>
                    : null
            }
            {
                editCat
                    ? <ListGroup.Item action>
                        <Form.Group>
                            <Form.Control type="name" className="admin-form__input" placeholder="Enter new category name" required
                                value={catName} onChange={(e) => setCatName(e.target.value)} />
                            <Button onClick={() => onAdd()}>Save</Button>
                            <Button variant="danger" onClick={onCancel}>Cancel</Button>
                        </Form.Group>
                    </ListGroup.Item>
                    : null
            }
        </>

    )
}

export default EditRecipeCategoriesRow;

