import { BrowserRouter as Router, Switch, Route, useHistory, Link, useParams } from "react-router-dom";
import { Nav, Navbar, Container, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { Search } from 'react-bootstrap-icons';

const AdminRecipeDetails2 = () => {
    let recipe_id = useParams().id
    const [product, setProduct] = useState([])
    const [stock, setStock] = useState([])
    const [product_id, setProductId] = useState('')
    const [stock_id, setStockId] = useState('')
    const [click, setClick] = useState(false)
    const [ingredient_name, setIngredientName] = useState('')
    const [ingredient_qty, setIngredientQty] = useState('')
    const [product_name, setProductName] = useState('')
    const [swap, setSwap] = useState('')
    const [optional, setOptional] = useState('')
    const [ingredient_id, setIngredientId] = useState('')
    const [next, setNext] = useState(false)
    const [ingredients, setIngredients] = useState([])
    
    const onBack = () => {
        window.location.href = 'https://celinechow.github.io/fyp-frontend/#//managerecipes'
    }

    const done = () => {
        window.location.href = 'https://celinechow.github.io/fyp-frontend/#//managerecipes'
    }


    const onSearch = () => {
        searchProduct(product_name)
            .then(
                setClick(true)
            )
    }

    const searchProduct = (search) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/searchproduct/${search}`)
                .then(res => res.json())
                .then((json) => {
                    console.log(JSON.stringify(json))
                    setProduct(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const getIngredientbyRecipeId = (recipe_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredient/${recipe_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
                .then(res => res.json())
                .then((json) => {
                    setIngredients(json)
                    setNext(true)
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
                    setIngredientName("")
                    setIngredientQty("")
                    setOptional("")
                    alert("Ingredient added")
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const addIngredientProd = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredientprod`, {
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
                    alert("Ingredient Product Added")
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const getProductStockById = (product_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/stockbyid/${product_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
                .then(res => res.json())
                .then((json) => {
                    console.log(JSON.stringify(json))
                    setProductId(product_id)
                    setStock(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    return (
        <Container className="admin-container" fluid>
            <div className="admin-card">
                <Button className="admin-button" onClick={onBack}>Back</Button>
                <p>*This will bring you back to Manage Recipes Page</p>
                <h1 className="admin-header">Add recipe details</h1>
                <Form className="admin-form">
                    {!next
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
                            <Button variant="success" onClick={() => addIngredient({
                                "recipe_id": recipe_id, "ingredient_name": ingredient_name,
                                "ingredient_qty": ingredient_qty, "optional": optional
                            })}>Save and Add Ingredient</Button>
                            <Button onClick={() => getIngredientbyRecipeId(recipe_id)}>Next</Button>
                        </div>

                        : null
                    }
                    {
                        next
                            ? <div>
                                <Form.Group className="admin-form__input-container" controlId="ingredient">
                                    <Form.Label className="admin-form__label">Ingredients</Form.Label>
                                    <Form.Control as="select" className="admin-form__input admin-form__input--selector" value={ingredient_id} 
                                    onChange={(e) => setIngredientId(e.target.value)} required>
                                        <option>-Choose Ingredient-</option>
                                        {ingredients.map((ingredient) => (
                                            <option className="admin-form__input_option" key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                                                {ingredient.ingredient_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="admin-form__input-container" controlId="productName">
                                    <Form.Label className="admin-form__label">Product Search</Form.Label>
                                    <Form.Control type="text" className="admin-form__input" placeholder="Enter product name" required
                                        value={product_name} onChange={(e) => setProductName(e.target.value)} />
                                    <Search onClick={onSearch}></Search>
                                </Form.Group>
                                {
                                    click
                                        ?
                                        <>
                                            <Form.Group className="admin-form__input-container" controlId="productId">
                                                <Form.Label className="admin-form__label">Product Name</Form.Label>
                                                <Form.Control as="select" className="admin-form__input admin-form__input--selector" value={product_id} onChange={(e) => getProductStockById(e.target.value)} required>
                                                    <option>-Choose Product-</option>
                                                    {product.map((product) => (
                                                        <option className="admin-form__input_option" key={product.product_id} value={product.product_id}>
                                                            {product.product_name}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="admin-form__input-container" controlId="stockId">
                                                <Form.Label className="admin-form__label">Product Stock Size</Form.Label>
                                                <Form.Control as="select" className="admin-form__input admin-form__input--selector" value={stock_id} onChange={(e) => setStockId(e.target.value)} required>
                                                    <option>-Choose Stock Size-</option>
                                                    {stock.map((stock) => (
                                                        <option className="admin-form__input_option" key={stock.stock_id} value={stock.stock_id}>
                                                            {stock.stock_size}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </>
                                        : null
                                }
                                <Form.Group className="admin-form__input-container" controlId="swap">
                                    <Form.Label className="admin-form__label">For Swapping</Form.Label>
                                    <Form.Control type="name" className="admin-form__input" placeholder="0 for original, 1 for swapped products" required
                                        value={swap} onChange={(e) => setSwap(e.target.value)} />
                                </Form.Group>
                                <h6>Please remember to save before clicking finish</h6>
                                <Button onClick={() => addIngredientProd({ingredient_id, 
                                recipe_id, stock_id, swap})}>Add new ingredient</Button>
                                <Button variant="danger" onClick={() => setNext(false)}>Back</Button>
                                <Button variant="success" onClick={done}>Finish</Button>
                            </div>
                            : null
                    }
                </Form>
            </div>
        </Container >
    )
}

export default AdminRecipeDetails2;