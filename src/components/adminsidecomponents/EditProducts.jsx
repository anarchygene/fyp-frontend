import { BrowserRouter as Router, Switch, Route, useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, Card, Col, Row, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';

function EditProducts() {
    const [edit, setEdit] = useState(false)
    const [stock, setStock] = useState([])
    const [stockPrice, setStockPrice] = useState("")
    const [stockSize, setStockSize] = useState("")
    const [newPrice, setNewPrice] = useState("")
    const [newSize, setNewSize] = useState("")
    const [product_name, setProductName] = useState('')
    const [product_desc, setProductDescription] = useState('')
    const [product_img, setProductImage] = useState('')
    const [productCategories, setProductCategories] = useState([])
    const [productSubCategories, setProductSubCategories] = useState([])

    const [pcat_id, setProductCategory] = useState('')
    const [pcat_name, setProductCategoryName] = useState('')
    const [psubcat_id, setProductSubCategory] = useState('')
    const [psubcat_name, setProductSubCategoryName] = useState('')

    const onBack = () => {
        window.location.href = 'http://localhost:3000/manageproducts'
    }

    let { product_id } = useParams()
    useEffect(() => {
        // alert(product_id)
        getProductById(product_id)
        getAllProductCategories()
        getAllProductSubCategories()
        getProductStockById(product_id)
    }, [])

    const getProductById = (product_id) => {
        fetch(`https://apibounwe.herokuapp.com/productbyid/${product_id}`, { headers: { 'access_right': "USER" } })
            .then(res => res.json())
            .then((json) => {
                // alert(JSON.stringify(json[0]))
                setProductName(json[0].product_name)
                setProductDescription(json[0].product_desc)
                setProductImage(json[0].product_img)
                setProductCategory(json[0].pcat_id)
                getProductCategorybyId(json[0].pcat_id)
                setProductSubCategory(json[0].psubcat_id)
                getProductSubCategorybyId(json[0].psubcat_id)
            }).catch((err) => {
                console.log(err);
            });
    }

    const getProductCategorybyId = (pcat_id) => {
        fetch(`https://apibounwe.herokuapp.com/productCategory/${pcat_id}`)
            .then(res => res.json())
            .then((json) => {
                // console.log(JSON.stringify(json[0]))
                setProductCategoryName(json[0].pcat_name)
            }).catch((err) => {
                alert(err);
            });
    }

    const getProductSubCategorybyId = (psubcat_id) => {
        fetch(`https://apibounwe.herokuapp.com/productSubCategory/${psubcat_id}`)
            .then(res => res.json())
            .then((json) => {
                // console.log(JSON.stringify(json))
                setProductSubCategoryName(json[0].psubcat_name)
            }).catch((err) => {
                alert(err);
            });
    }

    const getProductStockById = (product_id) => {
        fetch(`https://apibounwe.herokuapp.com/stockbyid/${product_id}`, { headers: { 'access_right': "USER" } })
            .then(res => res.json())
            .then((json) => {
                setStock(json)
            }).catch((err) => {
                console.log(err);
            });
    }


    const getAllProductCategories = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/productCategory`, { headers: { 'access_right': localStorage.getItem('access_right') } })
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    setProductCategories(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const getAllProductSubCategories = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/productSubCategories`, { headers: { 'access_right': "USER" } })
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    setProductSubCategories(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }


    const getProductSubCategories = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/productSubCategories/${data}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    // console.log(data)
                    setProductCategory(data)
                    setProductSubCategories(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    setProductCategory(data)
                    return reject(err);
                });
        })
    }

    const updateProductbyId = (data) => {
        // alert(JSON.stringify(data))
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/product`, {
                method: `PUT`,
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log(data)
                    // console.log("json " + JSON.stringify(json));
                    console.log(JSON.stringify(json))
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const updateStockbyId = (data) => {
        // alert(JSON.stringify(data))
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/stock`, {
                method: `PUT`,
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log(data)
                    // console.log("json " + JSON.stringify(json));
                    console.log(JSON.stringify(json))
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const addStock = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/stock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_right': localStorage.getItem('access_right')
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log(JSON.stringify(data))
                    console.log(JSON.stringify(json))
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const deleteProductSizeById = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/productSize`, {
                method: 'DELETE',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log("json " + JSON.stringify(json));
                    console.log(data)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let admin_name = "Jennifer"
        updateProductbyId({
            psubcat_id: psubcat_id, pcat_id: pcat_id, product_name: product_name,
            product_desc: product_desc, product_img: product_img, admin_name: admin_name, product_id: product_id
        }).then(
            window.location.href = "http://localhost:3000/manageproducts"
        )
    }


    let [editName, setEditName] = useState(false)
    let [editDescription, setEditDescription] = useState(false)
    let [editCategory, setEditCategory] = useState(false)
    let [editSubcategory, setEditSubcategory] = useState(false)
    let [editImage, setEditImage] = useState(false)


    const onClickName = () => {

        setEditName(true)

        let boolean_array = [setEditDescription, setEditCategory, setEditSubcategory, setEditImage];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }
    const onClickDesc = () => {

        setEditDescription(true)

        let boolean_array = [setEditName, setEditCategory, setEditSubcategory, setEditImage];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    const onClickImage = () => {

        setEditImage(true)

        let boolean_array = [setEditName, setEditDescription, setEditCategory, setEditSubcategory];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    return (
        <div className="admin-card">
            <Button className="admin-button" onClick={onBack}>Back</Button>
            <h1 className="admin-header">Edit product details</h1>
            {
                !edit
                    ?
                    <Form className="admin-form" onSubmit={onSubmit}>
                        <Button variant="success" onClick={() => setEdit(!edit)}>Edit Stock</Button>
                        <Form.Group className="admin-form__input-container" className="admin" controlId="productName">
                            <Form.Label className="admin-form__label">Product Name</Form.Label>
                            {
                                !editName
                                    ?
                                    <Row className="admin-form__row">
                                        <Col className="admin-form__col" xs={10}>
                                            <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={product_name}>
                                            </Form.Control>
                                        </Col>
                                        <Col className="admin-form__col" xs={2}>
                                            <PencilSquare className="admin-form__icon" onClick={onClickName} />
                                        </Col>
                                    </Row>
                                    : null
                            }
                            {
                                editName
                                    ?
                                    <Row className="admin-form__row">
                                        <Form.Control type="name" placeholder="Enter product name" className="admin-form__input" required
                                            value={product_name} onChange={(e) => setProductName(e.target.value)} />
                                    </Row>
                                    : null
                            }
                        </Form.Group>

                        <Form.Group className="admin-form__input-container" controlId="productDescription">
                            <Form.Label className="admin-form__label">Product Description</Form.Label>
                            {
                                !editDescription
                                    ?
                                    <Row className="admin-form__row">
                                        <Col className="admin-form__col" xs={10}>
                                            <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={product_desc}>
                                            </Form.Control>
                                        </Col>
                                        <Col className="admin-form__col" xs={2}>
                                            <PencilSquare className="admin-form__icon" onClick={onClickDesc} />
                                        </Col>
                                    </Row>
                                    : null
                            }
                            {
                                editDescription
                                    ?
                                    <Row className="admin-form__row">
                                        <Form.Control type="text" placeholder="Enter product description" className="admin-form__input" required
                                            value={product_desc} onChange={(e) => setProductDescription(e.target.value)} />
                                    </Row>
                                    : null
                            }

                        </Form.Group>
                        <Form.Group className="admin-form__input-container" controlId="category">
                            <Form.Label className="admin-form__label">Product Category</Form.Label>
                            <Form.Control as="select" className="admin-form__input-choice" value={pcat_id} onChange={(e) => getProductSubCategories(e.target.value)} required>
                                <option>-Select a Product Category-</option>
                                {productCategories.map((productCategory) => (
                                    <option className="admin-form__input-option" key={productCategory.pcat_id} value={productCategory.pcat_id}>
                                        {productCategory.pcat_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="admin-form__input-container" controlId="subCategory">
                            <Form.Label className="admin-form__label">Product Subcategory</Form.Label>
                            <Form.Control as="select" className="admin-form__input-choice" value={psubcat_id} required>
                                <option>-Select a Product Subcategory-</option>
                                {productSubCategories.map((productSubCategory) => (
                                    <option className="admin-form__input-option" key={productSubCategory.psubcat_id} onClick={(e) => setProductSubCategory(e.target.value)} value={productSubCategory.psubcat_id}>
                                        {productSubCategory.psubcat_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="admin-form__input-container" controlId="image">
                            <Form.Label className="admin-form__label">Product Image</Form.Label>
                            {
                                !editImage
                                    ?
                                    <Row className="admin-form__row">
                                        <Col className="admin-form__col" xs={2}>
                                            <h6>{product_img}</h6>
                                            <Card className="admin-form__card">
                                                <Card.Img className="admin-form__card-image" src={product_img} variant="top" />
                                            </Card>
                                        </Col>
                                        <Col className="admin-form__col">
                                            <PencilSquare className="admin-form__icon" onClick={onClickImage} />
                                        </Col>
                                    </Row>
                                    : null
                            }
                            {
                                editImage
                                    ?
                                    <Row className="admin-form__row">
                                        <Form.Control type="text" className="admin-form__input-file" value={product_img} label="Select Image Here" onChange={(e) => setProductImage(e.target.value)} />
                                    </Row>
                                    : null
                            }
                        </Form.Group>

                        <Button className="admin-form__button" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    : null
            }

            {
                edit
                    ?
                    <Form>
                        <Button variant="success" onClick={() => setEdit(!edit)}>Edit Products</Button>
                        <p>* When editing a specific row, please ensure the other rows are empty</p>
                        <p>* Both Stock Sizes and Prices has to be keyed in again for updating</p>
                        <Table className="admin-table" striped bordered hover>
                            <thead className="admin-table__header">
                                <tr className="admin-table__header-row">
                                    <th className="admin-table__header-col">Stock Size</th>
                                    <th className="admin-table__header-col">Stock Price</th>
                                    <th className="admin-table__header-col">Save</th>
                                    <th className="admin-table__header-col">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="admin-table__body">
                                {stock.map((stock) => (
                                    <tr className="admin-table__body-row" key={stock.stock_id}>
                                        <td className="admin-table__body-data">
                                            <Form.Group className="admin-form__input-container" controlId="stockSize">
                                                <Form.Control type="text" className="admin-form__input" placeholder={stock.stock_size}
                                                    onChange={(e) => setStockSize(e.target.value)} />
                                            </Form.Group>
                                        </td>
                                        <td className="admin-table__body-data">
                                            <Form.Group className="admin-form__input-container" controlId="stockPrice">
                                                <Form.Control type="text" className="admin-form__input" placeholder={stock.stock_price}
                                                    onChange={(e) => setStockPrice(e.target.value)} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Button onClick={() => updateStockbyId({ stock_size: stockSize, stock_price: stockPrice, stock_id: stock.stock_id }).then(window.location.reload())}>Save</Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => deleteProductSizeById({ "stock_id": stock.stock_id }).then(window.location.reload())}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <Form.Group className="admin-form__input-container" controlId="stockSizes">
                                            <Form.Control type="text" className="admin-form__input" placeholder="Enter stock size"
                                                value={newSize} onChange={(e) => setNewSize(e.target.value)} />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="admin-form__input-container" controlId="stockPrice">
                                            <Form.Control type="text" className="admin-form__input" placeholder="Enter stock price"
                                                value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                                        </Form.Group>
                                    </td>
                                    <td colspan="2">
                                        <Button onClick={() => addStock({ product_id: product_id, stock_size: newSize, stock_price: newPrice }).then(window.location.reload())}>Add Stock</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form>
                    : null
            }
        </div>
    )
}

export default EditProducts;
