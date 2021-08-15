import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Dropdown, DropdownButton, Breadcrumb, Button, Form, BreadcrumbItem } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import '../css/productdetails.css'

const ProductDetails = () => {
    let [addcart, setAddcart] = useState(false)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [productStocks, setProductStocks] = useState([])
    const [productCategory, setProductCategory] = useState("")
    const [productSubCategory, setProductSubCategory] = useState("")
    const [productName, setProductName] = useState("")
    const [productImg, setProductImg] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [stockId, setStockId] = useState("")
    const [stockPrice, setStockPrice] = useState(0)
    const [stockSize, setStockSize] = useState("")
    const [catLink, setCatLink] = useState('')
    const [subcatLink, setSubcatLink] = useState('')

    let cartItems = JSON.parse(window.localStorage.getItem('cartItems'))
    let cartId = JSON.parse(window.localStorage.getItem('cartId'))
    let { id } = useParams();
    if (cartItems === null) localStorage.setItem('cartItems', JSON.stringify([]))

    useEffect(() => {
        getProductStockById(id)
        getCartItemByUserId(window.localStorage.getItem('user_id'))
    }, [])

    useEffect(() => {
        setCategoryLink();
        setSubcategoryLink();
    })

    const onClick = () => setAddcart(true)
    const getProductStockById = (product_id) => {
        fetch(`https://apibounwe.herokuapp.com/stockbyid/${product_id}`)
            .then(res => res.json())
            .then((json) => {
                setProductStocks(json)
                setProductCategory(json[0].pcat_name)
                setProductSubCategory(json[0].psubcat_name)
                setProductName(json[0].product_name)
                setProductImg(json[0].product_img)
                setProductDesc(json[0].product_desc)
                setStockId(json[0].stock_id)
                setStockPrice(json[0].stock_price)
                setStockSize(json[0].stock_size)
            }).catch((err) => {
                console.log(err);
            });
    }
    const ChangePrice = (price, size, stock_id) => {
        setStockId(stock_id)
        setStockPrice(price)
        setStockSize(size)
    }
    const plus = () => {
        if (itemQuantity < 50) {
            setItemQuantity(itemQuantity + 1)
        }
    }
    const minus = () => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1)
        }
    }
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
    const addtoCart = () => {
        setAddcart(false)
        setItemQuantity(1)
        if (cartId === null) {
            //Meaning there is no logged in user
            cartItems = JSON.parse(window.localStorage.getItem('cartItems'))
            if (cartItems.length == 0) {
                //First item added to localStorage
                cartItems.push({
                    product_name: productName, product_desc: productDesc, stock_id: stockId, quantity: itemQuantity,
                    price: itemQuantity * stockPrice, stock_price: stockPrice, stock_size: stockSize, product_img: productImg
                })
            } else {
                //Check if there is duplicates on subsequent adding
                let AddLocal = true
                cartItems.map((cartItem) => {
                    if (cartItem.stock_id == stockId) {
                        //Same stock added to cart then we just increase the quantity
                        cartItem.quantity += itemQuantity
                        cartItem.price += itemQuantity * stockPrice
                        AddLocal = false
                    }
                })
                if (AddLocal) {
                    //Add a new stock
                    cartItems.push({
                        product_name: productName, product_desc: productDesc, stock_id: stockId, quantity: itemQuantity,
                        price: itemQuantity * stockPrice, stock_price: stockPrice, stock_size: stockSize, product_img: productImg
                    })
                }
            }
            window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
        } else {
            getCartItemByUserId(window.localStorage.getItem('user_id'))
                .then((savedItems) => {
                    let letAdd = true
                    console.log(savedItems.length)
                    for (let i = 0; i < savedItems.length; i++) {
                        if (savedItems[i].stock_id == stockId) {
                            updateCartItem({
                                stock_id: stockId, quantity: savedItems[i].quantity + itemQuantity,
                                cartitem_id: savedItems[i].cartitem_id
                            })
                            letAdd = false;
                        }
                    }
                    //Add new stock
                    if (letAdd) {
                        addCartItem({ cart_id: cartId, stock_id: stockId, quantity: itemQuantity })
                    }
                })
        }
    }
    const setCategoryLink = () => {
        var catString = productCategory;
        console.log(productCategory);

        catString = catString.replace(/\s+/g, ' ').trim();
        catString = catString.split(' ').join('');
        catString = catString.toLowerCase();
        catString = catString.replace(/[^a-zA-Z ]/g, "")

        console.log(catString);

        setCatLink('/products/' + catString);
        console.log(catLink);

    }
    const setSubcategoryLink = () => {
        var catString = productCategory;

        catString = catString.replace(/\s+/g, ' ').trim();
        catString = catString.split(' ').join('');
        catString = catString.toLowerCase();
        catString = catString.replace(/[^a-zA-Z ]/g, "")

        console.log(catString);

        var subcatString = productSubCategory;
        console.log(productSubCategory);

        subcatString = subcatString.split(' ').join('');
        subcatString = subcatString.toLowerCase();
        subcatString = subcatString.replace(/[^a-zA-Z ]/g, "")

        console.log(subcatString);

        setSubcatLink('/products/' + catString + '/' + subcatString);
        console.log(subcatLink);
    }
    const SubcatBreadcrumb = () => {
        const nilRegex = new RegExp('nil', 'g');
        const nilTest = nilRegex.test(subcatLink);
        console.log(subcatLink);
        console.log(nilTest);
        if (!nilTest) {
            console.log('Success');
            return (
                <BreadcrumbItem className="user-breadcrumb" href={subcatLink}> {productSubCategory}</BreadcrumbItem>
            )
        }

        if (nilTest) {
            console.log('Failure');
            return <> </>
        }
    }
    return (
        <>
            <Container className="user-container" fluid>
                <Row className="user-row">
                    <Breadcrumb className="user-breadcrumb">
                        <Breadcrumb.Item className="user-breadcrumb" href="/home">Home</Breadcrumb.Item>
                        <Breadcrumb.Item className="user-breadcrumb" href="/products">Products</Breadcrumb.Item>
                        <Breadcrumb.Item className="user-breadcrumb" href={catLink}>{productCategory}</Breadcrumb.Item>
                        <SubcatBreadcrumb />
                        <Breadcrumb.Item className="user-breadcrumb" active>{productName}</Breadcrumb.Item>
                    </Breadcrumb>
                </Row>

                <Row className="user-row">

                    <Col style={{ padding: '0' }} className="user-col" md={3}>
                        <Image src={productImg} className="user-row__image"></Image>
                    </Col>
                    <Col style={{paddingLeft:'1.5vw', paddingTop:'0'}} className="user-col" md={9}>
                        <Row style={{paddingTop:'0'}} className="user-inner-row user-inner-row--title">
                            <Col className="user-inner-col user-inner-col--title" md={9}>
                                <span className="user-span user-span--product">{productName}</span>
                            </Col>
                            <Col className="user-inner-col user-inner-col--title" md={{span:2, offset:1}}>
                                <span className="user-span user-span--title user-span--padding-left">Price: </span>
                                <br/>
                                <span className="user-span user-span--price user-span--padding-left">$<span className="user-span user-span--black">{stockPrice.toFixed(2)}</span></span>
                            </Col>
                        </Row>

                        <Row style={{ paddingTop: '0'}} className="user-inner-row user-inner-row--desc">
                            <Col className="user-inner-col user-inner-col--desc">
                                <span className="user-span user-span--desc">{productDesc}</span>
                            </Col>
                        </Row>

                        <Row style={{paddingTop:'0'}} className="user-inner-row user-inner-row--form">
                            <Col className="user-inner-col user-inner-col--form" md={3}>
                                <DropdownButton className="user-dropdown" title={stockSize} variant="success" className="col">
                                    {productStocks.map((productStock) => (
                                        <Dropdown.Item className="user-dropdown__item"
                                            onClick={() => ChangePrice(productStock.stock_price, productStock.stock_size, productStock.stock_id)}>
                                            {productStock.stock_size}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>

                            {
                                !addcart ?
                                    <Col className="user-inner-col user-inner-col--form" md={{ span: 3, offset: 6 }}>
                                        <Button className="user-button" variant="success" onClick={onClick}>Add to Cart</Button>
                                    </Col>
                                    : null
                            }
                            {
                                addcart ?
                                    <Col className="user-inner-col user-inner-col--form" md={{ span: 3, offset: 5 }}>
                                        <Form className="user-form" inline>
                                            <Form.Group className="user-form__input-container">
                                                <Row className="user-form-row">
                                                    <Col style={{ padding: '0' }} className="user-form-col" md={2}>
                                                        <Button style={{ width: '100%' }} className="user-form__button user-form__button--minus"
                                                            onClick={() => minus()}>-</Button>
                                                    </Col>
                                                    <Col style={{ padding: '0' }} className="user-form-col" md={4}>
                                                        <Form.Control style={{ textAlign: 'center', padding: '0' }} disabled
                                                            type="text" className="user-form__input-number" placeholder={itemQuantity} />
                                                    </Col>
                                                    <Col style={{ padding: '0' }} className="user-form-col" md={2}>
                                                        <Button className="user-form__button user-form__button--plus"
                                                            onClick={() => plus()}>+</Button>
                                                    </Col>
                                                    <Col style={{ padding: '0' }} className="user-form-col" md={2}>
                                                        <Button variant="success" className="user-form__button user-form__button--plus"
                                                            onClick={() => addtoCart()}>✓</Button>
                                                    </Col>
                                                </Row  >
                                            </Form.Group>
                                        </Form>

                                    </Col>
                                    : null
                            }
                        </Row>

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ProductDetails