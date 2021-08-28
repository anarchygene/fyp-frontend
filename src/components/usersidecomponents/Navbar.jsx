import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Row, Col, Button, Form, FormControl, Image } from 'react-bootstrap';
import '../css/navbar.css';
import { Link, NavLink } from "react-router-dom";
import { Cart, PersonCircle } from 'react-bootstrap-icons';
import logo from '../img/logo2.png';

function Navigation() {
    const [newSearch, setNewSearch] = useState("")
    const [cartItems, setCartItems] = useState(0)

    // const onSearch = () => {
    //     search = newSearch
    //     window.location.href = "https://celinechow.github.io/fyp-frontend/#/search/" + search
    // }

    const getCartItem = (user_id) => {
        if (user_id === null) {
            // alert('No user logged in')
            if (window.localStorage.getItem('cartItems') != null) setCartItems(JSON.parse(window.localStorage.getItem('cartItems')).length)
            return
        }
        fetch(`https://apibounwe.herokuapp.com/cartuser/${user_id}`)
            .then(res => res.json())
            .then((json) => {
                if(json.err == 'Cart items not found') {
                    return
                }
                setCartItems(json.length)
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getCartItem(window.localStorage.getItem("user_id"))
    })
    
    const activeStyleNavbar = {
        color: 'white',
        borderBottom: '2px solid #FCA311',
    }

    const logout = () => {
        window.localStorage.clear()
        window.location.href = 'https://celinechow.github.io/fyp-frontend/#/login'
    }

    return (
        <Navbar className="navbar" sticky="top">
            <Navbar.Brand className="navbar__brand">
                <NavLink
                    className="navbar__link--image"
                    to="/home"
                    activeStyle={{
                        color: 'white',
                        textDecoration: 'none'
                    }}>
                    <Image src={logo} className="navbar__logo" />
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="navbar__collapse" id="responsive-navbar-nav">
                <Nav className="navbar__nav mr-auto">
                    <NavLink
                        className="navbar__link"
                        to="/products"
                        activeStyle={
                            activeStyleNavbar
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        className="navbar__link"
                        to="/recipes"
                        activeStyle={
                            activeStyleNavbar
                        }
                    >
                        Recipes
                    </NavLink>
                    <NavLink
                        className="navbar__link"
                        to="/aboutus"
                        activeStyle={
                            activeStyleNavbar
                        }
                    >
                        About Us
                    </NavLink>
                    {localStorage.getItem('access_right') != null ?
                        <NavLink
                            className="navbar__link"
                            to="/adminprofile"
                            activeStyle={{
                                activeStyleNavbar
                            }}
                        >
                            Switch to Admin Side (Only for Admins)
                        </NavLink>
                        : null
                    }
                    <Row className="navbar__row">
                        <Form className="navbar__form" inline>
                            <Row className="navbar__form-row">
                                <Col className="navbar__form-col">
                                    <FormControl onChange={(e) => setNewSearch(e.target.value)} type="text" className="navbar__searchbar"
                                        placeholder="Search" value={newSearch} />
                                </Col>
                                <Col className="navbar__form-col navbar__form-col--button" style={{ padding: 0 }}>
                                    <Link to={`/search/${newSearch}`}><Button className="navbar__button" type="submit">Search</Button></Link>
                                </Col>
                            </Row>
                        </Form>
                        {localStorage.getItem('access_right') == null ?
                            <span className="user-span__padding"></span>
                            : null
                        }
                        <Row className="navbar__end-row">
                            <Link className="navbar__icon-link" to="/shoppingcart">
                                <span className="navbar__icon-span">
                                    <Cart className="navbar__icon" />
                                    {/* {cartItems != 0 ? <h6 className="navbar__icon-indicator">{cartItems}</h6> : null} */}
                                </span>
                            </Link>
                            {window.localStorage.getItem("user_id") == null ?
                                null :
                                <Link className="navbar__icon-link" to="/useraccountdetails/accountdetails">
                                    <span className="navbar__icon-span">
                                        <PersonCircle className="navbar__icon" />
                                    </span>
                                </Link>
                            }
                            {window.localStorage.getItem("user_id") == null ?
                                <Link to="/login">
                                    <Button className="navbar__button">
                                        Login | Sign Up
                                    </Button>
                                </Link> : <Link to="/login">
                                    <Button className="navbar__button" onClick={() => logout()}>
                                        Logout
                                    </Button>
                                </Link>}
                        </Row>
                        {/* <Col className="navbar__form-icon-col">
                            <Link className="navbar__icon-link" to="/shoppingcart">
                                <span className="navbar__icon-span">
                                    <Cart className="navbar__icon"/>
                                </span>
                            </Link>
                        </Col>
                        <Col className="navbar__form-icon-col">
                            <Link className="navbar__icon-link" to="/useraccountdetails/accountdetails">
                                <span className="navbar__icon-span">
                                    <PersonCircle className="navbar__icon" />
                                </span>
                            </Link>
                        </Col> */}
                        {/* <Link className="navbar__icon-link" to="/shoppingcart">
                            <span className="navbar__icon-span">
                                <Cart className="navbar__icon"/>
                            </span>
                        </Link>
                        <Link className="navbar__icon-link" to="/useraccountdetails/accountdetails">
                            <span className="navbar__icon-span">
                                <PersonCircle className="navbar__icon" />
                            </span>
                        </Link> */}
                    </Row>
                </Nav>
            </Navbar.Collapse>
        </Navbar>



        // <Navbar bg="light" expand="lg" sticky="top">
        // <Navbar.Brand ><Link className="brand" to="/">Ninemars Enterprise</Link></Navbar.Brand>
        // <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        // <Navbar.Collapse id="responsive-navbar-nav">
        //     <Nav className="mr-auto">
        //     <Form inline>
        //         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        //     </Form>
        //     <Button>Manage Categories</Button>
        //     <Link to="/login"><Button>Add Products</Button></Link>
        // </Navbar.Collapse>
        // </Navbar>
    )
}

export default Navigation;