import React from 'react'
import ProductCard from './ProductCard.jsx'
import RecipeCard from './RecipeCard.jsx'
import { Row, Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import '../css/homepage.css';

const Homepage = ({ products, recipes, getRecipeDetail, getIngredientDetail }) => {
    let images = ['https://res.cloudinary.com/dptmkjeww/image/upload/v1630051304/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_vvmz44.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051328/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_1_eiaexe.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051354/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_2_hrxxbw.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051365/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_3_wvltyx.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051384/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_4_optdnr.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051399/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_5_ke2dww.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051411/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_6_mtxdc1.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051423/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_7_hy8deh.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051435/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_8_fydwxv.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051446/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_9_dgtd7i.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051486/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_10_zo0hbt.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051499/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_11_azxmgm.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051512/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_12_rwu569.jpg',
        'https://res.cloudinary.com/dptmkjeww/image/upload/v1630051517/proposals/WhatsApp_Image_2021-08-27_at_15.23.10_13_pubflx.jpg']

    let links = ['/productdetails/162', '/productdetails/15', '/productdetails/14', '/productdetails/36','/productdetails/38',
    '/productdetails/32','/productdetails/6','/productdetails/21','/productdetails/164','/productdetails/30','/productdetails/12',
    '/productdetails/20','/productdetails/8','/productdetails/10'];

    let names = ['Black Pepper Seed', 'Black Chick Peas', `White Chick Peas`, 'Cinnamon Sticks', 'Cloves', 
    'Cummin Seed', 'Green Beans', 'Groundnuts', 'Motchai / Lab Lab Beans', 'Mustard Seeds', 'Masoor Dhall Split', 
    'Roasted Gram Dhall', 'Toor Dhall', 'Urid Whole Dhall']
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
