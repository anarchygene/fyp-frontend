import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import AdminProductDetails from './AdminProductDetails';
import EditProducts from "./EditProducts";
import React, { useState } from 'react';
import AdminProductsHomepage from "./AdminProductsHomePage";
import EditProductCategories from "./EditProductCategories";
import ProductSearch from "./ProductSearch";

const AdminProducts = ({ products }) => {
    const [productsSearch, setProductsSearch] = useState([])
    
    const searchProduct = (search) => {
        fetch(`https://apibounwe.herokuapp.com/searchproduct/${search}`)
            .then(res => res.json())
            .then((json) => {
                console.log("json " + JSON.stringify(json));
                setProductsSearch(json)
            }).catch((err) => {
                console.log(err);
            });
    }
    
    return (
        <Container className="admin-container" fluid>
            <Router>
                <Switch>
                    <Route exact path="/adminaddproduct">
                        <AdminProductDetails />
                    </Route>
                    <Route exact path="/manageproducts">
                        <AdminProductsHomepage products={products} searchProduct={searchProduct} />
                    </Route>
                    <Route exact path="/editproducts/:product_id">
                        <EditProducts />
                    </Route>
                    <Route exact path="/editproductcat">
                        <EditProductCategories />
                    </Route>
                    <Route exact path="/searchproduct/:search">
                        <ProductSearch products={productsSearch} searchProduct={searchProduct} />
                    </Route>
                </Switch>
            </Router>
        </Container>
    )
}

export default AdminProducts
