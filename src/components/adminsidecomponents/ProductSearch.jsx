import { Row, Button, Form } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ProductCardAdmin from './ProductCardAdmin.jsx';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const ProductSearch = ({ products, getProductDetail, searchProduct }) => {
    const [newSearch, setNewSearch] = useState("")
    let { search } = useParams()

    const onSearch = (search) => {
        search = newSearch
        window.location.href = "https://celinechow.github.io/fyp-frontend/#//searchproduct/" + search
    }

    const deleteProductbyId = (product_id, data={product_id:product_id}) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/product`, {
                method: 'DELETE',
                headers: {
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

    useEffect(() => {
        searchProduct(search)
    }, [])


    return (
        <div className="admin-card">
            <Form className="admin-form">
                <Form.Group className="admin-form__input-container">
                    <Form.Control onChange={(e) => setNewSearch(e.target.value)} className="admin-form__input-container" type="text" placeholder="Search" />
                    <Link to={`/searchproduct/${search}`}><Button type="submit" onClick={() => onSearch()}>Search</Button></Link>
                </Form.Group>
            </Form>
            <Link to="/adminaddproduct"><Button>Add Product</Button></Link>
            <Link to="/editproductcat"><Button>Product Categories</Button></Link>
            <h1>Manage Products Page</h1>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="/adminprofile">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Products</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row className="admin-row">
                {products.map((products) => (
                    <ProductCardAdmin id={products.product_id} key={products.product_id} name={products.product_name} 
                    img={products.product_img} deleteFunction={deleteProductbyId} getProductDetail={getProductDetail}/>
                ))}
            </Row>
        </div>
    )
}

export default ProductSearch;