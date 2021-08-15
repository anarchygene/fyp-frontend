import React, { useState, useEffect } from 'react'
import { Breadcrumb, Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import RecipeDetailsRow from './RecipeDetailsRow';
import '../css/recipedetails.css'

export default function RecipeDetails() {
    const [recipes, setRecipeDetail] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [ingredientProds, setIngredientProds] = useState([])
    const [unsoldIngredients, setUnsoldIngredients] = useState([])
    const [show, setShow] = useState(false);
    const [catLink, setCatLink] = useState('');
    const [recipeCategory, setRecipeCategory] = useState('');
    const [steps, setSteps] = useState([])

    let { id } = useParams();
    let cartItems = JSON.parse(window.localStorage.getItem('cartItems'))
    let cartId = JSON.parse(window.localStorage.getItem('cartId'))
    let recipeItems = JSON.parse(window.localStorage.getItem('recipeItems'))
    if (cartItems === null) localStorage.setItem('cartItems', JSON.stringify([]))
    if (recipeItems === null) recipeItems = []
    useEffect(() => {
        getIngredientsbyRecipeId(id)
        getRecipeById(id).then((recipe) => {
            getRecipeCategoryById(recipe.rcat_id)
        })
        getUnsoldIngredientsRecipeId(id)
        getIngredientProductStockByRecipeId(id).then((output) => {
            localStorage.setItem('recipeItems', JSON.stringify(output))
        })
        getCartItemByUserId(window.localStorage.getItem('user_id'))
    }, [])
    const getCartItemByUserId = (user_id) => {
        return new Promise((resolve, reject) => {
            if (user_id === null) {
                return
            }
            fetch(`https://apibounwe.herokuapp.com/cartuser/${user_id}`)
                .then(res => res.json())
                .then((json) => {
                    if (json.err == "User/Cart not found") {
                        return
                    }
                    resolve(json)
                }).catch((err) => {
                    alert(`Error at getCartItemByUser: ${err}`)
                    console.log(err);
                    reject(err)
                });
        })
    }
    const handleClose = () => {
        setShow(false)
        let arr = []
        ingredientProds.map((ingredientProd) => {
            if (ingredientProd.swap == 0) arr.push(ingredientProd)
        })
        window.localStorage.setItem('recipeItems', JSON.stringify(arr))
    };
    const handleShow = () => {
        setShow(true)
        let arr = []
        ingredientProds.map((ingredientProd) => {
            if (ingredientProd.swap == 0) arr.push(ingredientProd)
        })
        window.localStorage.setItem('recipeItems', JSON.stringify(arr))
    };
    const getIngredientsbyRecipeId = (recipe_id) => {
        fetch(`https://apibounwe.herokuapp.com/ingredient/${recipe_id}`)
            .then(res => res.json())
            .then((json) => {
                setIngredients(json)
            }).catch((err) => {
                alert(err);
            });

    }
    const getUnsoldIngredientsRecipeId = (recipe_id) => {
        fetch(`https://apibounwe.herokuapp.com/ingredientsnotsold/${recipe_id}`)
            .then(res => res.json())
            .then((json) => {
                setUnsoldIngredients(json)
            }).catch((err) => {
                alert(err);
            });

    }
    const getIngredientProductStockByRecipeId = (recipe_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredientproductstockbyrecipeid/${recipe_id}`)
                .then(res => res.json())
                .then((json) => {
                    let output = []
                    json.map((ingredientProduct) => {
                        if (ingredientProduct.swap == 0) output.push(ingredientProduct)
                    })
                    setIngredientProds(output)
                    resolve(output)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                });
        })
    }
    const getRecipeById = (recipe_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipeid/${recipe_id}`)
                .then(res => res.json())
                .then((json) => {
                    setRecipeDetail(json[0])
                    setSteps(json[0].recipe_step.split('-'))
                    // alert(json[0].recipe_step.split('-'))
                    resolve(json[0])
                }).catch((err) => {
                    alert(err);
                    reject(err)
                });
        })

    }
    const getRecipeCategoryById = (rcat_id) => {
        fetch(`https://apibounwe.herokuapp.com/recipeCategory/${rcat_id}`)
            .then(res => res.json())
            .then((json) => {
                setCategoryLink(json[0].rcat_name)
            }).catch((err) => {
                alert(err);
            });
    }
    const setCategoryLink = (categoryName) => {
        let catString = categoryName;
        catString = catString.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, ' ').trim();

        setCatLink('/recipes/' + catString);
        setRecipeCategory(catString)
    }
    const onToggle = (index, newitem) => {
        recipeItems = JSON.parse(window.localStorage.getItem('recipeItems'))
        recipeItems[index] = newitem
        window.localStorage.setItem('recipeItems', JSON.stringify(recipeItems))
    }
    const addToCart = (ingredientProd) => {
        if (cartId === null) {
            cartItems = JSON.parse(window.localStorage.getItem('cartItems'))
            if (cartItems.length == 0) {
                cartItems.push({
                    product_name: ingredientProd.product_name, product_desc: ingredientProd.product_desc,
                    stock_id: ingredientProd.stock_id, quantity: 1,
                    price: ingredientProd.stock_price, stock_price: ingredientProd.stock_price, stock_size: ingredientProd.stock_size,
                    product_img: ingredientProd.product_img
                })
            } else {
                let AddLocal = true
                cartItems.map((cartItem) => {
                    if (cartItem.stock_id == ingredientProd.stock_id) {
                        cartItem.quantity += 1
                        cartItem.price += ingredientProd.stock_price
                        AddLocal = false
                    }
                })
                if (AddLocal) {
                    cartItems.push({
                        product_name: ingredientProd.product_name, product_desc: ingredientProd.product_desc,
                        stock_id: ingredientProd.stock_id, quantity: 1,
                        price: ingredientProd.stock_price, stock_price: ingredientProd.stock_price, stock_size: ingredientProd.stock_size,
                        product_img: ingredientProd.product_img
                    })
                }
            }
            window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
        } else {
            getCartItemByUserId(window.localStorage.getItem('user_id'))
                .then((savedItems) => {
                    let letAdd = true
                    if(savedItems.length>0){
                    savedItems.map((savedItem) => {
                        if (savedItem.stock_id == ingredientProd.stock_id) {
                            updateCartItem({
                                stock_id: ingredientProd.stock_id, quantity: savedItem.quantity + 1,
                                cartitem_id: savedItem.cartitem_id
                            })
                            letAdd = false;
                        }
                    })
                }
                    if (letAdd) {
                        addCartItem({ cart_id: cartId, stock_id: ingredientProd.stock_id, quantity: 1 })
                    }
                })
        }
    }
    const addCartItem = (data) => {
        fetch(`https://apibounwe.herokuapp.com/cartitem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((json) => {
            }).catch((err) => {
                alert(`Error at addCartItem: ${err}`)
                console.log(err);
            });
    }
    const updateCartItem = (data) => {
        fetch(`https://apibounwe.herokuapp.com/cartitem`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((json) => {
            }).catch((err) => {
                alert(`Error at updateCartItem: ${err}`)
                console.log(err);
            });
    }
    const addAllItems = (ingredientProds) => {
        ingredientProds.map((ingredientProd) => {
            if (ingredientProd.swap != undefined) addToCart(ingredientProd)
        })
        window.localStorage.removeItem('recipeItems')
        setShow(false)
    }
    return (
        <>

            <Container className="user-container" fluid>
            <Row className="user-row">
                <Breadcrumb style={{margin:'0'}} className="user-breadcrumb">
                    <Breadcrumb.Item className="user-breadcrumb__link" href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item className="user-breadcrumb__link" href="/recipes">Recipes</Breadcrumb.Item>
                    <Breadcrumb.Item className="user-breadcrumb__link" href={catLink} >{recipeCategory}</Breadcrumb.Item>
                    <Breadcrumb.Item className="user-breadcrumb__link" active>{recipes.recipe_name}</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row className="user-row">
                        <Col style={{padding:'0'}} className="user-col" md={3}>
                            <Image src={recipes.recipe_img} className="user-row__image"></Image>
                        </Col>
                        <Col className="user-col" md={9}>
                                <Row style={{paddingLeft:'1.5vw', paddingTop:'0'}} className="user-inner-row user-inner-row--recipe-title">
                                    <span className="user-span user-span--recipe-title">{recipes.recipe_name}</span>
                                </Row>
                                <Row style={{paddingLeft:'1.5vw',paddingTop: '0'}} className="user-inner-row user-inner-row--recipe-desc">
                                    <Col className="user-inner-col user-inner-col--recipe-desc">
                                        <span className="user-span user-span--recipe-desc">{recipes.recipe_desc}</span>
                                    </Col>
                                </Row>
                                <Row style={{paddingLeft:'1.5vw'}} className="user-inner-row  user-inner-row--recipe-text">
                                    <span className="user-span user-span--recipe-text">Preparation Time: {recipes.prep_time} | Cooking Time: {recipes.cooking_time}</span>
                                </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop:'4vh'}} className="user-row">
                        <Col className="user-col user-col--ingredients" xs={3}>
                            <span  className="user-span user-span--ingredients">Ingredients: </span>
                            <div className="user-div user-div--ingredients">
                                <ul className="user-list user-list--ingredients">
                                    {ingredients.map((ingredient) => {
                                    if(ingredient.optional == 0) {
                                    return (
                                        <li className="user-list__item user-list__item--ingredients">
                                            {ingredient.ingredient_qty} {ingredient.ingredient_name}
                                        </li>
                                    )} else {
                                        return (
                                            <li className="user-list__item user-list__item--ingredients">
                                                {ingredient.ingredient_qty} {ingredient.ingredient_name}, optional
                                            </li>
                                        )
                                    }
                                        })}
                                </ul>
                            </div>
                            <Button className="user-list__button" variant="success" onClick={handleShow}>Add Item(s) to Cart</Button>
                        </Col>

                        <Col className="user-col user-col--steps" xs={9}>
                            <span  className="user-span user-span--steps">Steps: </span>
                            <div className="user-div user-div--steps" style={{ flexDirection: 'row', paddingTop: '10px' }}>
                                {steps.map((step, index) => (
                                    index != 0 ? <h6>- {step}</h6> : null
                                ))}
                            </div>
                        </Col>
                    </Row>
                <Modal className="user-modal" show={show} onHide={handleClose}>
                    <Modal.Header className="user-modal__header" closeButton>
                        <Modal.Title className="user-modal__header-title">Add Ingredients to Cart</Modal.Title>
                    </Modal.Header>
                    {!Array.isArray(unsoldIngredients)
                        ?
                        <Modal.Body style={{ marginLeft:'1.5vw',paddingRight:'0.5vw'}} className="user-modal__body">
                            {ingredientProds.map((ingredientProd,index) => (
                                (
                                    <RecipeDetailsRow ingredientProds={ingredientProds} ingredientProd={ingredientProd}
                                        key={ingredientProd.ingredientprod_id} index={index} onToggle={onToggle} />
                                )
                            ))}
                        </Modal.Body>
                        : null
                    }
                    {Array.isArray(unsoldIngredients)
                        ?
                        <Modal.Body style={{ marginLeft:'1.5vw',paddingRight:'0.5vw'}} className="user-modal__body">
                            {ingredientProds.map((ingredientProd, index) => (
                                (
                                    <RecipeDetailsRow ingredientProds={ingredientProds} ingredientProd={ingredientProd}
                                        key={ingredientProd.ingredientprod_id} index={index} onToggle={onToggle} />

                                )
                            ))}
                            Ingredients Not Sold:
                            {unsoldIngredients.map((unsoldIngredient) => (
                                <li>{unsoldIngredient.ingredient_name}</li>
                            ))}
                        </Modal.Body>
                        : null
                    }
                    <Modal.Footer className="user-modal__footer">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => addAllItems(JSON.parse(window.localStorage.getItem('recipeItems')))}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        </>

    )
}