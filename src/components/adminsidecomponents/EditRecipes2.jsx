import { BrowserRouter as Router, Switch, Route, useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import EditRecipes2Row from "./EditRecipes2Row";

function EditRecipes2() {
    let {recipe_id} = useParams()
    const [ingredients, setIngredients] = useState([])
    const [ingredient_name, setIngredientName] = useState('')
    const [ingredient_qty, setIngredientQty] = useState('')
    const [optional, setOptional] = useState('')
    const [add, setAdd] = useState(false)
    useEffect(() => {
        getIngredientbyRecipeId(recipe_id)
    }, [])
    const getIngredientbyRecipeId = (recipe_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredient/${recipe_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
                .then(res => res.json())
                .then((json) => {
                    console.log(ingredients)
                    setIngredients(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const addIngredient = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredient`, {
                method: 'POST',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log(JSON.stringify(json))
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }


    return (
        <div>
            {!add
                ?
                <div>
                    <h3>Manage Ingredients</h3>
                    <Button onClick={() => setAdd(!add)} variant="success">Add Ingredient</Button>
                    <Link to={`/editrecipes/${recipe_id}`}><Button>Back</Button></Link>
                    <Table className="admin-table" striped bordered hover>
                        <thead className="admin-table__header">
                            <tr className="admin-table__header-row">
                                <th className="admin-table__header-col">S/N</th>
                                <th className="admin-table__header-col">Ingredient Name</th>
                                <th className="admin-table__header-col">Ingredient Qty</th>
                                <th className="admin-table__header-col">Optional</th>
                                <th className="admin-table__header-col">Edit</th>
                                <th className="admin-table__header-col">Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody className="admin-table__body">
                            {ingredients.map((ingredient, index) => (
                                <EditRecipes2Row key={ingredient.ingredient_id} index={index + 1} name={ingredient.ingredient_name} id={ingredient.ingredient_id} optional={ingredient.optional} qty={ingredient.ingredient_qty} recipe_id={ingredient.recipe_id}></EditRecipes2Row>
                            ))}
                        </tbody>
                    </Table>
                </div>
                : null
            }
            {
                add
                ? <div>
                <Form.Group className="admin-form__input-container" controlId="ingredientName">
                    <Form.Label className="admin-form__label">Ingredient Name</Form.Label>
                    <Form.Control type="name" className="admin-form__input" placeholder="Enter ingredient name" required
                        value={ingredient_name} onChange={(e) => setIngredientName(e.target.value)} />
                </Form.Group>

                <Form.Group className="admin-form__input-container" controlId="ingredientQuantity">
                    <Form.Label className="admin-form__label">Ingredient Quantity</Form.Label>
                    <Form.Control type="text" className="admin-form__input" placeholder="Enter ingredient quantity" required
                        value={ingredient_qty} onChange={(e) => setIngredientQty(e.target.value)} />
                </Form.Group>

                <Form.Group className="admin-form__input-container" controlId="optional">
                    <Form.Label className="admin-form__label">Optional</Form.Label>
                    <Form.Control type="name" className="admin-form__input" placeholder="0 for needed, 1 for optional" required
                        value={optional} onChange={(e) => setOptional(e.target.value)} />
                </Form.Group>
                <Button 
                onClick={() => 
                addIngredient({
                    "recipe_id": recipe_id, "ingredient_name": ingredient_name,
                    "ingredient_qty": ingredient_qty, "optional": optional
                }).then(window.location.href = "http://localhost:3000/editrecipes2/" + recipe_id)}
                >Save</Button>
                <Button variant="danger" onClick={() => setAdd(!add)}>Cancel</Button>
                </div>
                : null
            }
        </div>
    )
}

export default EditRecipes2;
