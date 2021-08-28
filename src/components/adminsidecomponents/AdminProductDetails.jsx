import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const AdminProductDetails = () => {
    const [product_name, setProductName] = useState('')
    const [product_desc, setProductDescription] = useState('')
    const [pcat_id, setProductCategory] = useState('')
    const [psubcat_id, setProductSubCategory] = useState('')
    const [product_img, setProductImage] = useState('')
    const [imgname, setImgName] = useState('')
    const [stock_sizes, setStockSizes] = useState([]);
    const [stock_prices, setStockPrices] = useState([])

    const [productCategories, setProductCategories] = useState([])
    const [productSubCategories, setProductSubCategories] = useState([{ psubcat_id: 999, psubcat_name: 'No subcategory' }])

    const onBack = () => {
        window.location.href = 'https://celinechow.github.io/fyp-frontend/#/manageproducts'
    }

    useEffect(() => {
        getAllProductCategories()
    }, [])

    const getAllProductCategories = () => {
        fetch(`https://apibounwe.herokuapp.com/productCategory`)
            .then(res => res.json())
            .then((json) => {
                setProductCategories(json)
            }).catch((err) => {
                console.log(err);
            });
    }

    const getProductSubCategories = (data) => {
        fetch(`https://apibounwe.herokuapp.com/productSubCategories/${data}`)
            .then(res => res.json())
            .then((json) => {
                console.log(data)
                setProductCategory(data)
                setProductSubCategories(json)
            }).catch((err) => {
                console.log(err);
                setProductCategory(data)
            });
    }

    const upload = (file) => {
        setProductImage(file)
        fetch(`https://apibounwe.herokuapp.com/upload`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_right': localStorage.getItem('access_right')
            },
            body: JSON.stringify({file: file})
        })
            .then(res => res.json())
            .then((json) => {
                setImgName(json.content.fileUrl)
            }).catch((err) => {
                alert(`Error at upload: ${err}`)
                console.log(err);
            });
    }

    const addProduct = (data) => {
        alert(JSON.stringify(data))
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/product`, {
                method: `POST`,
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

    const onSubmit = (e) => {
        e.preventDefault()
        const admin_name = "Jennifer"
        addProduct({
            "psubcat_id":psubcat_id, "pcat_id":pcat_id, "product_name":product_name,
            "product_desc":product_desc, "product_img":imgname, "admin_name":admin_name, "stock_sizes": stock_sizes, "stock_prices": stock_prices
        }).then(
            window.location.href='https://celinechow.github.io/fyp-frontend/#/manageproducts'
        )
    }


    return (
        <div className="admin-card">
            <Button className="admin-button--back" onClick={onBack}>Back</Button>
            <h1 className="admin-header">Add product details</h1>
            <Form className="admin-form" onSubmit={onSubmit}>
                <Form.Group className="admin-form__input-container" controlId="productName">
                    <Form.Label className="admin-form__input-label">Product Name</Form.Label>
                    <Form.Control type="name" className="admin-form__input" placeholder="Enter product name" required
                        value={product_name} onChange={(e) => setProductName(e.target.value)} />
                </Form.Group>

                <Form.Group className="admin-form__input-container" controlId="productDescription">
                    <Form.Label className="admin-form__input-label">Product Description</Form.Label>
                    <Form.Control type="text" className="admin-form__input" placeholder="Enter product description" required
                        value={product_desc} onChange={(e) => setProductDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="stockSizes">
                    <Form.Label className="admin-form__input-label">Stock Sizes</Form.Label>
                    <Form.Control type="text" className="admin-form__input" placeholder="Enter stock sizes(Separated by comma)" required
                        value={stock_sizes} onChange={(e) => setStockSizes(e.target.value.trim().split(','))} />
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="stockPrices">
                    <Form.Label className="admin-form__input-label">Stock Prices</Form.Label>
                    <Form.Control type="text" className="admin-form__input" placeholder="Enter stock prices(Separated by comma)" required
                        value={stock_prices} onChange={(e) => setStockPrices(e.target.value.trim().split(','))} />
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="category">
                    <Form.Label className="admin-form__input-label">Product Category</Form.Label>
                    <Form.Control as="select" className="admin-form__input" value={pcat_id} onChange={(e) => getProductSubCategories(e.target.value)} required>
                        <option>-Choose a Product Category-</option>
                        {productCategories.map((productCategory) => (
                            <option className="admin-form__input-option" key={productCategory.pcat_id} value={productCategory.pcat_id}>
                                {productCategory.pcat_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="subCategory">
                    <Form.Label className="admin-form__input-label">Product Subcategory</Form.Label>
                    <Form.Control as="select" className="admin-form__input" value={psubcat_id} onChange={(e) => setProductSubCategory(e.target.value)} required>
                    <option>-Choose a Product Subcategory-</option>
                        {productSubCategories.map((productSubCategory) => (
                            <option className="admin-form__input-option" key={productSubCategory.psubcat_id} value={productSubCategory.psubcat_id}>
                                {productSubCategory.psubcat_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="image">
                    <Form.Label className="admin-form__input-label">Product Image</Form.Label>
                    <Form.Control type="file" className="admin-form__input" accept="image/*" value={product_img}
                    onChange={(e) => upload(e.target.value)} />
                </Form.Group>
                {imgname == '' ? null: <img src={imgname} width='500' height='300'/>}

                <Button className="admin-form__button" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AdminProductDetails
