import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams
} from "react-router-dom";
import { Search } from 'react-bootstrap-icons';

function EditIngredientProd() {
    const [product, setProduct] = useState([])
    const [stock, setStock] = useState([])
    const [product_id, setProductId] = useState('')
    const [stock_id, setStockId] = useState('')
    const [click, setClick] = useState(false)
    const [product_name, setProductName] = useState('')
    const [swap, setSwap] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [edit, setEdit] = useState(false)
    const [ingredient_name, setIngredientName] = useState('')
    const [ingredient_qty, setIngredientQty] = useState('')
    const [optional, setOptional] = useState('')
    const [recipe_id, setRecipeId] = useState('')
    let {ingredient_id} = useParams()
    const [ingredientprod, setIngredientprod] = useState([])
    useEffect(() => {
        getIngredientProdbyIngredientId(ingredient_id)
        getIngredientbyIngredientId(ingredient_id)
    }, [])
    const getIngredientProdbyIngredientId = (ingredient_id) => {
        fetch(`https://apibounwe.herokuapp.com/ingredientprod/${ingredient_id}`)
            .then(res => res.json())
            .then((json) => {
                setIngredientprod(json)
            }).catch((err) => {
                alert(err);
            });
    }

    const deleteIngredientProdbyId = (ingredientprod_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredientprod/${ingredientprod_id}`, {
                method: 'DELETE',
                headers: { 'access_right': localStorage.getItem('access_right') }
            })
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
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

    const updateIngredientbyId = (ingredient_id, data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredient/${ingredient_id}`, {
                method: 'PUT',
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

    const getIngredientbyIngredientId = (ingredient_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredientbyid/${ingredient_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
                .then(res => res.json())
                .then((json) => {
                    console.log(JSON.stringify(json))
                    setIngredients(json)
                    setIngredientName(json[0].ingredient_name)
                    setIngredientQty(json[0].ingredient_qty)
                    setOptional(json[0].optional)
                    setRecipeId(json[0].recipe_id)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    return (
        <div>
            {
                !edit
                    ? <div>
                        <h4>Edit Ingredient {ingredient_name}</h4>
                        <Button onClick={() => setEdit(!edit)}>Edit Ingredient Products</Button>
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
                                updateIngredientbyId(ingredient_id, {
                                    "recipe_id": recipe_id, "ingredient_name": ingredient_name,
                                    "ingredient_qty": ingredient_qty, "optional": optional
                                }).then(window.location.href = "http://localhost:3000/editrecipes2/" + recipe_id )}
                        >Save</Button>
                        <Link to={`/editrecipes2/${recipe_id}`}><Button variant="danger">Cancel</Button></Link>
                    </div>
                    : null
            }
            {
                edit
                    ?
                    <div>
                        <h4>Edit Ingredient Products for {ingredient_name}</h4>
                        <Button onClick={() => setEdit(!edit)}>Edit Ingredient {ingredient_name}</Button>
                        <Table className="admin-table" striped bordered hover>
                            <thead className="admin-table__header">
                                <tr className="admin-table__header-row">
                                    <th className="admin-table__header-col">Products</th>
                                    <th className="admin-table__header-col">Swapped</th>
                                    <th className="admin-table__header-col">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="admin-table__body">
                                {ingredientprod.map((ingredientprod) => (
                                    <tr className="admin-table__body-row">
                                        <td className="admin-table__body-data">{ingredientprod.product_name}, {ingredientprod.stock_size}</td>
                                        <td className="admin-table__body-data">{ingredientprod.swap}</td>
                                        <td className="admin-table__body-data"><Button variant="danger" 
                                        onClick={()=>deleteIngredientProdbyId(ingredientprod.ingredientprod_id)
                                        .then(window.location.href="http://localhost:3000/editingredientprod/"+ingredient_id)}>Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <div>
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
                            <Button onClick={() => addIngredientProd({
                                ingredient_id,
                                recipe_id, stock_id, swap
                            }).then(window.location.href="http://localhost:3000/editingredientprod/" + ingredient_id)}>Add new ingredient</Button>
                            <Link to={`/editrecipes2/${recipe_id}`}><Button variant="danger">Cancel</Button></Link>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default EditIngredientProd;