import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Accordion, ListGroupItem, Form, Card, useAccordionButton } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";

function EditProductCategories() {
    const [productCategories, setProductCategories] = useState([])
    const [productSubCategories, setProductSubCategories] = useState([])
    const [add, setAdd] = useState(false)
    const [newCategory, setNewCategory] = useState("")
    const [newSubCategory, setNewSubCategory] = useState("")
    const [productCategory, setProductCategory] = useState("")
    const [productSubcategory, setProductSubcategory] = useState("")

    const onBack = () => {
        window.location.href = 'http://localhost:3000/manageproducts'
    }

    useEffect(() => {
        getAllProductCategories()
        getAllProductSubCategories()
    }, [])


    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <button
                type="button"
                style={{ backgroundColor: 'pink' }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    const getAllProductCategories = () => {
        fetch(`https://apibounwe.herokuapp.com/productCategory`, { headers: { 'access_right': "USER" } })
            .then(res => res.json())
            .then((json) => {
                setProductCategories(json)
            }).catch((err) => {
                console.log(err);
            });
    }

    const getAllProductSubCategories = () => {
        fetch(`https://apibounwe.herokuapp.com/productSubCategories`, { headers: { 'access_right': "USER" } })
            .then(res => res.json())
            .then((json) => {
                // console.log("json " + JSON.stringify(json));
                setProductSubCategories(json)
            }).catch((err) => {
                console.log(err);
            });
    }

    const addProductCategory = (data) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/productCategory`, {
                method: 'POST',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
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

    const updateProductCategory = (pcat_id, data) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/productCategory/${pcat_id}`, {
                method: 'PUT',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
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

    const updateProductSubCategory = (psubcat_id, data) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/productSubCategory/${psubcat_id}`, {
                method: 'PUT',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
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

    const addProductSubCategory = (data) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/productSubCategory`, {
                method: 'POST',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    // alert("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const deleteProductCategory = (pcat_id) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/productCategory/${pcat_id}`, {
                method: 'DELETE',
                headers: {
                    'access_right': localStorage.getItem('access_right')
                }
            })
                .then(res => res.json())
                .then((json) => {
                    alert("Product Category Deleted")
                    console.log("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const deleteProductSubCategory = (psubcat_id) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/productSubCategory/${psubcat_id}`, {
                method: 'DELETE',
                headers: {
                    'access_right': localStorage.getItem('access_right')
                }
            })
                .then(res => res.json())
                .then((json) => {
                    alert("Product Subcategory Deleted")
                    console.log("json " + JSON.stringify(json));
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
            <h1 clasName="recipe-header">Product Categories</h1>
            <Accordion>
                {productCategories.map((productCategories, index) => (
                    <div>
                        <Card>
                            <Card.Header>
                                Category {index+1}
                                <Form.Group className="admin-form__input-container" controlId="category">
                                    <Form.Control type="name" className="admin-form__input" placeholder={productCategories.pcat_name} required
                                     onChange={(e) => setProductCategory(e.target.value)} />
                                </Form.Group>
                                <Button onClick={() => updateProductCategory(productCategories.pcat_id, { pcat_name: productCategory })}>Save</Button>
                                <CustomToggle eventKey={productCategories.pcat_id}>Add subcat</CustomToggle>
                                <Button variant="danger" onClick={() => deleteProductCategory(productCategories.pcat_id).then(window.location.href='http://localhost:3000/editproductcat')}>Delete</Button>
                            </Card.Header>
                            <Accordion.Collapse eventKey={productCategories.pcat_id}>
                                <Form.Group>
                                    <Form.Control type="name" className="admin-form__input" placeholder="Enter product subcategory" required
                                        value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} />
                                    <Button onClick={() => addProductSubCategory({ pcat_id: productCategories.pcat_id, psubcat_name: newSubCategory }).then(window.location.href='http://localhost:3000/editproductcat')}>Save</Button>
                                </Form.Group>
                            </Accordion.Collapse>
                        </Card>
                        {productSubCategories.map((productSubCategory) => (
                            productCategories.pcat_id == productSubCategory.pcat_id
                                ? <ListGroupItem>
                                    <Form.Group className="admin-form__input-container" controlId="category">
                                    <Form.Control type="name" className="admin-form__input" placeholder={productSubCategory.psubcat_name} required
                                     onChange={(e) => setProductSubcategory(e.target.value)} />
                                </Form.Group>
                                <Button onClick={() => updateProductSubCategory(productSubCategory.psubcat_id, { pcat_id: productSubCategory.pcat_id, psubcat_name: productSubcategory }).then(window.location.href='http://localhost:3000/editproductcat')}>Save</Button>
                                <Button onClick={() => deleteProductSubCategory(productSubCategory.psubcat_id).then(window.location.href='http://localhost:3000/editproductcat')} variant="danger">-</Button>
                                </ListGroupItem>
                                : null
                        ))}
                    </div>
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
                                    <Form.Control type="name" className="admin-form__input" placeholder="Enter product category" required
                                        value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                                    <Button onClick={() => addProductCategory({ "pcat_name": newCategory }).then(window.location.href='http://localhost:3000/editproductcat')}>Save</Button>
                                    <Button variant="danger" onClick={() => setAdd(false)}>Cancel</Button>
                                </Form.Group>
                            </>
                            : null
                    }
                </ListGroup.Item>
            </Accordion>
        </div>
    )
}

export default EditProductCategories;

