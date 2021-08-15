import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import { Row, Container, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, Switch, Route, useParams, useLocation, useHistory } from 'react-router-dom';
import ProductSidebar from './ProductSidebar';
import '../css/itemcard.css'

export default function Product({ products, pcat, psubcat }) {
    const [catArray, setCatArray] = useState(pcat);
    const [subcatArray, setSubcatArray] = useState(psubcat);

    const [catId, setCatId] = useState('');
    const [subcatId, setSubcatId] = useState('');

    const [productUnderCategory, setProductUnderCategory] = useState([])
    const [productUnderSubcategory, setProductUnderSubcategory] = useState([])

    let location = useLocation();
    let history = useHistory(); 

    console.log(`Location: ${JSON.stringify(location)}`);
    console.log(`History: ${JSON.stringify(history)}`)
    

    const [categoryStr, setCategoryStr] = useState('')
    const [subcategoryStr, setSubcategoryStr] = useState('')

    useEffect(() => {
        console.log("here")
        if (catId != '') {
            setProductUnderCategory([])
            getProductByCategory(catId)
        }
    }, [catId])
    useEffect(() => {
        setProductUnderCategory([])
        setProductUnderSubcategory([])
    }, [])

    useEffect(() => {
        console.log("here again")
        console.log((subcatId != '') && (catId != ''))
        if ((subcatId != '') && (catId != '')) {
            setProductUnderSubcategory([])
            getProductBySubcategory(subcatId)
        }
    }, [subcatId, catId])

    const getProductByCategory = (id) => {
        fetch(`https://apibounwe.herokuapp.com/productbycategory/${id}`)
            .then(res => res.json())
            .then((json) => {
                setProductUnderCategory(json)
                console.log('Product Cat')
                console.log(json)
            }).catch((err) => {
                console.log(err);
            });
    }

    const getProductBySubcategory = (id) => {
        fetch(`https://apibounwe.herokuapp.com/productbysubcategory/${id}`)
            .then(res => res.json())
            .then((json) => {
                setProductUnderSubcategory(json)
                console.log('Product subcat')
                console.log(json)
            }).catch((err) => {
                console.log(err);
            });
    }

    const getProductCategoryIdFromPath = (category) => {
        catArray.map((catObj, index) => {
            var catString = '';
            var catArrayInner = [];
            catArrayInner = catArray;

            catString = catObj.pcat_name;
            catObj.pcat_name = catString.replace(/\s+/g, ' ').trim()
            catString = catString.split(' ').join('');
            catString = catString.toLowerCase();

            catString = catString.replace(/[^a-zA-Z ]/g, "")
            if (catString === categoryStr && categoryStr === category) {
                console.log(`Success cat! ${index} `)
                setCatId(catObj.pcat_id)
            }
        })
    }

    const getProductSubcategoryIdFromPath = () => {
        catArray.map((catObj, index) => {
            var catString = '';

            catString = catObj.pcat_name;
            catObj.pcat_name = catString.replace(/\s+/g, ' ').trim()
            catString = catString.split(' ').join('');
            catString = catString.toLowerCase();

            catString = catString.replace(/[^a-zA-Z ]/g, "")
            subcatArray.map((subcatObj, index) => {
                var subcatString = '';

                subcatString = subcatObj.psubcat_name;
                subcatObj.psubcat_name = subcatString.replace(/\s+/g, ' ').trim()
                subcatString = subcatString.split(' ').join('');
                subcatString = subcatString.toLowerCase();

                subcatString = subcatString.replace(/[^a-zA-Z ]/g, "");

                if ((catString === categoryStr) && (subcatString === subcategoryStr)) {
                    console.log(`Success subcat! ${index} `)
                    setCatId(subcatObj.pcat_id)
                    setSubcatId(subcatObj.psubcat_id)
                }
            })
        })
    }

    const ProductCardMap = () => {
        return (
            <>
                {products.map((products) => (
                    <Link className="user-item-card__link" to={"/productdetails/" + products.product_id}>
                        <ProductCard key={products.product_id} id={products.product_id} name={products.product_name}
                            img={products.product_img} price={products.stock_price} size={products.stock_size} />
                    </Link>
                ))}
            </>
        )
    }

    const ProductCategoryCardMap = () => {
        let { category } = useParams();
        console.log(`Category Path Start ${category}`);

        if (!(category == null)) {
            setCategoryStr(category.toString())
            console.log(`Category String: ${categoryStr}`)
        } else {
            setCategoryStr('Empty')
            console.log(`Category String: ${categoryStr}`)
        }

        getProductCategoryIdFromPath(category)

        console.log("hi" + productUnderCategory.length);
        if(productUnderCategory.length !== 0){
            return (
                <>
                    {productUnderCategory.map((product) => (
                        <Link className="user-item-card__link" to={"/productdetails/" + product.product_id}>
                            <ProductCard key={product.product_id} id={product.product_id} name={product.product_name}
                                img={product.product_img} price={product.stock_price} size={product.stock_size} />
                        </Link>
                    ))
                    }
                </>
    
            )
        } else {
            return (
                <>
                    <h1>No product in {category} category</h1>
                </>
            )

        }
    }

    const ProductSubcategoryCardMap = () => {
        let { category } = useParams();
        let { subcategory } = useParams();

        console.log(`Category Path Start ${category}`);
        console.log(`Subcategory Path Start ${subcategory}`);

        if (!(category == null)) {
            setCategoryStr(category.toString())
            console.log(`Category String: ${categoryStr}`)
        } else {
            setCategoryStr('Empty')
            console.log(`Category String: ${categoryStr}`)
        }

        if (!(subcategory == null)) {
            setSubcategoryStr(subcategory.toString())
            console.log(`Subcategory String: ${subcategoryStr}`)
        } else {
            setSubcategoryStr('Empty')
            console.log(`Subcategory String: ${subcategoryStr}`)
        }

        getProductSubcategoryIdFromPath()

        console.log("Product Under SubCategory");
        console.log(productUnderSubcategory);

        if(productUnderSubcategory.length !== 0){
            return (
                <>
                    {productUnderSubcategory.map((product, index) => (
                        <Link className="user-item-card__link" to={"/productdetails/" + product.product_id}>
                            <ProductCard key={product.product_id} id={product.product_id} name={product.product_name}
                                img={product.product_img} price={product.stock_price} size={product.stock_size} />
                        </Link>
                    ))}
                </>
            )
        } else {
            return (
                <>
                    <h1>No product in {subcategory} subcategory</h1>
                </>
            )
        }
    }

    const CategoryBreadcrumb = () => {
        let {category}= useParams();
        let categoryStr = '/products/'+category
        return(            
            <Breadcrumb.Item className="user-breadcrumb-item" href={categoryStr} >{category}</Breadcrumb.Item>
        )
    }

    const SubcategoryBreadcrumb = () => {
        let {subcategory}= useParams();
        let {category}= useParams();
        let subcategoryStr = '/products/'+category+'/'+subcategory
        return(
            <Breadcrumb.Item className="user-breadcrumb-item" href={subcategoryStr} >{subcategory}</Breadcrumb.Item>
        )
    }

    return (
        <Switch>
            <Route exact path="/products">
                <Col xs={2} id="sidebar-wrapper-user">
                    <ProductSidebar pcat={pcat} psubcat={psubcat} />
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Container className="user-container" fluid>
                        <Row className="user-row">
                            <Breadcrumb className="user-breadcrumb">
                                <Breadcrumb.Item className="user-breadcrumb-item" href="/home">Home</Breadcrumb.Item>
                                <Breadcrumb.Item className="user-breadcrumb-item" href="/products">Products</Breadcrumb.Item>
                            </Breadcrumb>
                        </Row>
                        <Row xs={3} md={4} lg={4} className="user-row user-row-grid">
                            <ProductCardMap />
                        </Row>
                    </Container>
                </Col>
            </Route>
            <Route exact path="/products/:category">
                <Col xs={2} id="sidebar-wrapper-user">
                    <ProductSidebar pcat={pcat} psubcat={psubcat} />
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Container className="user-container" fluid>
                        <Row className="user-row">
                            <Breadcrumb className="user-breadcrumb">
                                <Breadcrumb.Item className="user-breadcrumb-item" href="/home">Home</Breadcrumb.Item>
                                <Breadcrumb.Item className="user-breadcrumb-item">Products</Breadcrumb.Item>
                                <CategoryBreadcrumb/>
                            </Breadcrumb>
                        </Row>
                        <Row xs={3} md={4} lg={4} className="user-row user-row-grid">
                            <ProductCategoryCardMap />
                        </Row>
                    </Container>
                </Col>
            </Route>
            <Route exact path="/products/:category/:subcategory">
                <Col xs={2} id="sidebar-wrapper-user">
                    <ProductSidebar pcat={pcat} psubcat={psubcat} />
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Container className="user-container" fluid>
                        <Row className="user-row">
                            <Breadcrumb className="user-breadcrumb">
                                <Breadcrumb.Item className="user-breadcrumb-item" href="/home">Home</Breadcrumb.Item>
                                <Breadcrumb.Item className="user-breadcrumb-item">Products</Breadcrumb.Item>
                                <CategoryBreadcrumb/>
                                <SubcategoryBreadcrumb/>
                            </Breadcrumb>
                        </Row>
                        <Row xs={3} md={4} lg={4} className="user-row user-row-grid">
                            <ProductSubcategoryCardMap />
                        </Row>
                    </Container>
                </Col>
            </Route>
        </Switch>
    )
}