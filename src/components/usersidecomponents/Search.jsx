import React from 'react'
import ProductCard from './ProductCard.jsx'
import RecipeCard from './RecipeCard.jsx'
import { Row, Container, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/search.css'
import '../css/itemcard.css'

const Search = () => {
    const [products, setProducts] = useState([])
    const [recipes, setRecipes] = useState([])

    const [productSearch,setProductSearch]=useState(true);
    const [recipeSearch,setRecipeSearch]=useState(false);

    const [productActive,setProductActive]= useState('user-span__search user-span__search--active')
    const [recipeActive,setRecipeActive]= useState('user-span__search')

    let { search } = useParams()

  useEffect(() => {
    searchProduct(search)
    searchRecipe(search)
  }, [search])

  const searchProduct = (search) => {
    return new Promise((resolve, reject) => {
      fetch(`https://apibounwe.herokuapp.com/searchproduct/${search}`)
        .then(res => res.json())
        .then((json) => {
          setProducts(json)
          return resolve(json)
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
    })
  }

  const searchRecipe = (search) => {
    return new Promise((resolve, reject) => {
      fetch(`https://apibounwe.herokuapp.com/searchrecipe/${search}`)
        .then(res => res.json())
        .then((json) => {
          setRecipes(json)
          return resolve(json)
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
    })
  }

      function showProductSearch() {
        setProductSearch(true);
        setRecipeSearch(false);
        
        setProductActive('user-span__search user-span__search--active');
        setRecipeActive('user-span__search');
      }

      function showRecipeSearch() {
        setProductSearch(false);
        setRecipeSearch(true);

        setProductActive('user-span__search');
        setRecipeActive('user-span__search user-span__search--active');
      }

      function SearchedProducts() {
        if(products.length !== 0){
          return(
            <>          
              <Col md={{span:10,offset:1}}>
                  <Row md={4} className="user-row__search user-row__search--products">
                    {products.map((product) => (
                      <Link className="user-item-card__link" to={"/productdetails/" + product.product_id}>
                          <ProductCard key={product.product_id} name={product.product_name} img={product.product_img} price={product.stock_price} size={product.stock_size}/>
                      </Link>
                    ))}
                </Row>
              </Col>
            </>
          )
        } else {
          return(
            <>
              <Col md={{span:10,offset:1}}>
                <Container className="user-container__search-null">                  
                  <span className="user-span__search-null">'<span className="user-span__search-text">{search}</span>' Not Found in Products</span>
                </Container>
              </Col> 
            </>
          )
        }
      }

      function SearchedRecipes() {
        if(recipes.length !== 0){
          return(
            <>
              <Col md={{span:10,offset:1}}>
                <Row md={4} className="user-row__search user-row__search--recipes">
                  {recipes.map((recipes) => (                  
                    <Link className="user-item-card__link" to={"/recipedetails/" + recipes.recipe_id}>
                      <RecipeCard key={recipes.recipe_id} id={recipes.recipe_id} img={recipes.recipe_img} name={recipes.recipe_name} desc={recipes.recipe_desc} prep_time={recipes.prep_time} cooking_time={recipes.cooking_time}/>
                    </Link>
                  ))}
                </Row>
              </Col>          
            </>
          )
        } else {
          return(
            <>
              <Col md={{span:10,offset:1}}>
                <Container className="user-container__search-null">                  
                  <span className="user-span__search-null">'<span className="user-span__search-text">{search}</span>' Not Found in Recipes</span>
                </Container>
              </Col>   
            </>
          )
        }
      }

    return (
        <Container className="user-container user-container--search" fluid>
            <Row className="user-row">
              <Col className="user-col" md={{span:3,offset:3}}>
                <Container className="user-container__search-buttons">
                  <span onClick={showProductSearch} className={productActive}>
                    Products
                  </span>
                </Container>
              </Col>
              <Col className="user-col" md={{span:3}}>
                <Container className="user-container__search-buttons">
                  <span onClick={showRecipeSearch} className={recipeActive}>
                    Recipes
                  </span>
                </Container>
              </Col>
            </Row>
            <Row className="user-row">
              {
                productSearch
                ?
                <SearchedProducts/>
                :
                null
              }
              {
                recipeSearch
                ?
                <SearchedRecipes/>
                :
                null
              }
            </Row>
        </Container>
    )
}

export default Search;
