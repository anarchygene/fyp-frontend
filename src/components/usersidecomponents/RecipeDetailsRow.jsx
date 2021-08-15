import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Button, Form } from "react-bootstrap";
export default function RecipeDetailsRow({ ingredientProd, index, onToggle }) {
    let imgstyle = {
        width: '50px'
    }
    let checked = true
    const [swapped, setSwapped] = useState(false)
    const [ingredients, setIngredients] = useState([])
    const [product_name, setProductName] = useState(ingredientProd.product_name)
    const [product_img, setProductImg] = useState(ingredientProd.product_img)
    const [product_desc, setProductDesc] = useState(ingredientProd.product_desc)
    const [stock_size, setStockSize] = useState(ingredientProd.stock_size)
    const [stock_price, setStockPrice] = useState(ingredientProd.stock_price)
    let recipeItems = JSON.parse(window.localStorage.getItem('recipeItems'))

    const setStates = (ingredient) => {
        setProductName(ingredient.product_name)
        setProductImg(ingredient.product_img)
        setProductDesc(ingredient.product_desc)
        setStockPrice(ingredient.stock_price)
        setStockSize(ingredient.stock_size)
        setSwapped(false)
        recipeItems[index] = {
            ingredientprod_id: ingredient.ingredientprod_id,
            swap: ingredient.swap,
            ingredient_name: ingredient.ingredient_name,
            ingredient_id: ingredient.ingredient_id,
            product_id: ingredient.product_id,
            product_name: ingredient.product_name,
            product_desc: ingredient.product_desc,
            product_img: ingredient.product_img,
            stock_id: ingredient.stock_id,
            stock_price: ingredient.stock_price,
            stock_size: ingredient.stock_size,
            recipe_id: ingredient.recipe_id,
            recipe_img: ingredient.recipe_img
        }
        window.localStorage.setItem('recipeItems', JSON.stringify(recipeItems))
    }

    const getIngredientProdbyIngredientId = (ingredient_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredientprod/${ingredient_id}`)
            .then(res => res.json())
            .then((json) => {
                resolve(json)
            }).catch((err) => {
                alert(err);
                reject(err)
            });
        })
    }

    const getIngredientProdbyIngredientIdAndSwap = (ingredient_id) => {
        fetch(`https://apibounwe.herokuapp.com/ingredientprod/${ingredient_id}`)
            .then(res => res.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                setIngredients(json)
                setSwapped(true)
            }).catch((err) => {
                alert(err);
            });
    }

    const handleCheck = (ingredientProd) => {
        checked = !checked
        if (!checked) {
            onToggle(index, {ingredientprod_id: ingredientProd.ingredientprod_id, ingredient_id: ingredientProd.ingredient_id})
        } else {
            onToggle(index, ingredientProd)
            // getIngredientProdbyIngredientId(recipeItems[index].ingredient_id)
            // .then((ingredientProds) => {
            //     ingredientProds.map((ingredient) => {
            //         if(ingredientProd.ingredientprod_id==ingredient.ingredientprod_id) {
            //             onToggle(index, ingredient)
            //         }
            //     })
            // })
        }
        
    }
    return (
        <>
            {!swapped
                ? <div>
                    <Row>
                        <Col md={9}>
                            <div>{ingredientProd.ingredient_name}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Form.Group className="recipe_checkbox-container" controlId="formBasicCheckbox">
                                <Form.Check name="checked" id="Root Admin" className="recipe-form__checkbox"
                                    type="checkbox" defaultChecked={checked} onChange={() => handleCheck(recipeItems[index])} />
                            </Form.Group>
                            <Image src={product_img} style={imgstyle}></Image>
                        </Col>
                        <Col md={5}>
                            <Row>
                                <div> {product_name}, {stock_size}</div>
                            </Row>
                            <Row>
                                {product_desc}
                            </Row>
                        </Col>
                        <Col md={2}>
                            <div>${parseFloat(stock_price).toFixed(2)}</div>
                        </Col>
                        <Col md={3}>
                            <Button variant="success" onClick={() => getIngredientProdbyIngredientIdAndSwap(ingredientProd.ingredient_id)}>Swap</Button>
                        </Col>
                    </Row>
                    <br></br>
                </div>
                : null
            }
            {
                swapped
                    ? <div>
                        <Row>
                            <Col md={9}>
                                <div>{ingredientProd.ingredient_name}</div>
                            </Col>
                        </Row>
                        {ingredients.map((ingredient) => (
                            <div>
                                <Row>
                                    <Col md={9}>
                                        <div>{ingredient.ingredient_name}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <Image src={ingredient.product_img} style={imgstyle}></Image>
                                    </Col>
                                    <Col md={5}>
                                        <Row>
                                            <div> {ingredient.product_name}, {ingredient.stock_size}</div>
                                        </Row>
                                        <Row>
                                            {ingredient.product_desc}
                                        </Row>
                                    </Col>
                                    <Col md={2}>
                                        <div>${parseFloat(ingredient.stock_price).toFixed(2)}</div>
                                    </Col>
                                    <Col md={3}>
                                        <Button onClick={() => setStates(ingredient)}>Select</Button>
                                    </Col>
                                </Row>
                                <br></br>
                            </div>
                        ))}
                    </div>
                    : null
            }
        </>
    )
}