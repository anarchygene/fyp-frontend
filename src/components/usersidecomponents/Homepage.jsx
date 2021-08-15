import React from 'react'
import ProductCard from './ProductCard.jsx'
import RecipeCard from './RecipeCard.jsx'
import { Row, Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import '../css/homepage.css';

const Homepage = ({ products, recipes, getRecipeDetail, getIngredientDetail }) => {
    let images = ['https://res.cloudinary.com/sadnobcws/image/upload/v1628998051/fyp/rice_p30ssz.png',
        'https://res.cloudinary.com/sadnobcws/image/upload/v1628998051/fyp/chana_dal_tzicgm.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1620183541/chickencurry_osclmz.jpg',
        'https://res.cloudinary.com/sadnobcws/image/upload/v1628998051/fyp/masoor_dal_ac2htj.webp']

    let links = ['/productdetails/3', '/productdetails/13', '/recipedetails/1', '/productdetails/6'];

    let names = ['Indian Idli Rice', 'Mysoor Dhall Gota', `Mom's Chicken Curry`, 'Green Bean (Moong Dhall Whole)']
    return (
        <Container>
            <h3 style={{ textAlign: "center", paddingBottom: '30px', paddingTop: '10px' }}><b>Welcome to Ninemars</b></h3>
            <div style={{ width: '100%', alignItems: 'center' }}
                className="slide-container">
                <Slide duration={3000} pauseOnHover={false}>
                    {images.map((image, index) => (
                        <div className="each-slide">
                            <Link to={links[index]}>
                                <div style={{
                                    backgroundImage: `url(${image})`, height: '600px',
                                    backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'
                                }}>
                                </div>
                            </Link>
                            <span className="user-span__homepage-slide">{names[index]}</span>
                        </div>
                    ))}
                </Slide>
            </div>
            {/* <Col xs={6}>
                    <h2 className="user-header">Today's special products</h2>
                    <Row className="user-row">
                        {products.map((product) => (
                            <Link to={"/productdetails/" + product.product_id}>
                                <ProductCard key={product.product_id} name={product.product_name} img={product.product_img} />
                            </Link>
                        ))}
                    </Row>
                </Col>
                <Col xs={6}>
                    <h2 className="user-header">Today's special recipes</h2>
                    <Row className="user-row">
                        {recipes.map((recipes) => (
                            <RecipeCard key={recipes.recipe_id} id={recipes.recipe_id} img={recipes.recipe_img} name={recipes.recipe_name}
                                desc={recipes.recipe_desc} prep_time={recipes.prep_time} cooking_time={recipes.cooking_time} getRecipeDetail={getRecipeDetail} getIngredientDetail={getIngredientDetail} />
                        ))}
                    </Row>
                </Col> */}
        </Container>
    )
}

export default Homepage
