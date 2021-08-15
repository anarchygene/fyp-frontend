import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import EditRecipeCategoriesRow from './EditRecipeCategoriesRow';

function EditRecipeCategories() {
    const [add, setAdd] = useState(false)
    const [newCategory, setNewCategory] = useState("")
    const [recipeCategories, setRecipeCategories] = useState([])

    const onBack = () => {
        window.location.href = 'http://localhost:3000/managerecipes'
    }

    const onAdd = () => {
        console.log(newCategory)
        addRecipeCategory({ "rcat_name": newCategory })
            .then(
                window.location.href = 'http://localhost:3000/managerecipes'
            )
    }

    useEffect(() => {
        getAllRecipeCategories()
    }, [])

    const addRecipeCategory = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipeCategory`, {
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
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const getAllRecipeCategories = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipeCategories`)
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    setRecipeCategories(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    return (
        <div className="recipe-card">
            <Button className="recipe-button" onClick={onBack}>Back</Button>
            <h1 clasName="recipe-header">Recipe Categories</h1>
            <ListGroup>
                {recipeCategories.map((recipeCategories, index) => (
                    <EditRecipeCategoriesRow key={recipeCategories.rcat_id} id={recipeCategories.rcat_id} name={recipeCategories.rcat_name} index={index}></EditRecipeCategoriesRow>
                ))}
                <ListGroup.Item>
                    {
                        !add
                            ? <Button onClick={() => setAdd(true)}>ADD</Button>
                            : null
                    }
                    {
                        add
                            ?
                            <>
                                <Form.Group>
                                    <Form.Control type="name" className="admin-form__input" placeholder="Enter recipe category" required
                                        value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                                    <Button onClick={() => onAdd()}>Save</Button>
                                    <Button variant="danger" onClick={() => setAdd(false)}>Cancel</Button>
                                </Form.Group>
                            </>
                            : null
                    }
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default EditRecipeCategories;

