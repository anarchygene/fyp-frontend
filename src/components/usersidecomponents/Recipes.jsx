import React, { useState, useEffect } from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link, Switch, Route, useParams } from 'react-router-dom';
import RecipeSidebar from './RecipeSidebar';
import RecipeCard from './RecipeCard.jsx'

export default function Recipes({ recipes, rcat }) {
    const [catArray, setCatArray] = useState(rcat);
    const [catId, setCatId] = useState('');
    const [recipesByCategory, setRecipesByCategory] = useState([])
    useEffect(() => {
        getRecipeByCategory(catId)
    }, [catId])
    const getRecipeByCategory = (id) => {
        fetch(`https://apibounwe.herokuapp.com/recipebycat/${id}`)
            .then(res => res.json())
            .then((json) => {
                setRecipesByCategory(json)
            }).catch((err) => {
                console.log(err);
            });
    }

    const getRecipeCategoryIdFromPath = (category) => {
        var catIdFrmPath;
        console.log(catIdFrmPath);
        if (catArray.length > 0) {
            catArray.map((catObj, index) => {
                var catString = '';
                catString = catObj.rcat_name;
                catObj.pcat_name = catString.replace(/\s+/g, ' ').trim()
                catString = catString.split(' ').join('');
                catString = catString.toLowerCase();

                catString = catString.replace(/[^a-zA-Z ]/g, "")
                console.log(`catstring ${catString}`)
                console.log(`category ${category.category.toLowerCase()}`)
                if (catString == category.category.toLowerCase().replace(/\s+/g, "")) {
                    console.log(`Success cat! ${catObj.rcat_id} `)
                    catIdFrmPath = catObj.rcat_id;
                    console.log(`cat id from path ${catIdFrmPath} `)
                } else {
                    console.log('failure')
                }
            })
        } else {
            console.log(`No Categories`);
        }

        console.log(`cat id from path out ${catIdFrmPath} `)
        return catIdFrmPath
    }

    const RecipeCardMap = () => {
        var recipeArray = recipes

        recipeArray = recipeArray.map((recipe) => {
            if (recipe.visibility_start_date != null && recipe.visibility_end_date != null) {
                const today = new Date()

                const currentDate = today.getDate()
                const currentMonth = today.getMonth() + 1

                const recipeMonthStart = parseInt((recipe.visibility_start_date).slice(5, 7))
                const recipeMonthEnd = parseInt((recipe.visibility_end_date).slice(5, 7))
                const recipeDateStart = parseInt((recipe.visibility_start_date).slice(8, 10))
                const recipeDateEnd = parseInt((recipe.visibility_end_date).slice(8, 10))

                const validateMonths = (currentMonth >= recipeMonthStart && currentMonth <= recipeMonthEnd)

                if (validateMonths) {
                    console.log('Recipe within month')


                    if (currentMonth == recipeMonthStart) {
                        if (currentDate < recipeDateStart) {
                            console.log('less than start month date');
                            return ''
                        }
                    }

                    if (currentMonth == recipeMonthEnd) {
                        if (currentDate > recipeDateEnd) {
                            console.log('more than end month date');
                            return ''
                        }
                    }

                    console.log('success within function');
                    return recipe

                } else {
                    console.log('failure outside function');
                    return ''
                }
            } else {
                return recipe
            }
        })

        recipeArray = recipeArray.filter(e => e);

        console.log(JSON.stringify(recipeArray))

        if (recipeArray.length != 0) {
            return (
                <>
                    {recipeArray.map((recipe) => (
                        <Link className="user-item-card__link" to={"/recipedetails/" + recipe.recipe_id}>
                            <RecipeCard key={recipe.recipe_id} id={recipe.recipe_id} img={recipe.recipe_img} name={recipe.recipe_name}
                                desc={recipe.recipe_desc} prep_time={recipe.prep_time} cooking_time={recipe.cooking_time} />
                        </Link>
                    ))
                    }
                </>
            )
        } else {
            return <h1>No recipes available this season</h1>
        }
    }

    const RecipeCategoryCardMap = () => {
        let { category } = useParams();
        console.log(`Category Path Start ${category}`);

        if (category != null) {
            const result = getRecipeCategoryIdFromPath({ category });
            console.log(`Result is: ${result}`);
            setCatId(result)
            if (result != null) {
                console.log(`Success! Id is: ${result}`);
            }
        }

        let recipeArray = recipesByCategory
        recipeArray = recipeArray.map((recipe) => {
            if (recipe.visibility_start_date != null && recipe.visibility_end_date != null) {
                const today = new Date()

                const currentDate = today.getDate()
                const currentMonth = today.getMonth() + 1

                const recipeMonthStart = parseInt((recipe.visibility_start_date).slice(5, 7))
                const recipeMonthEnd = parseInt((recipe.visibility_end_date).slice(5, 7))
                const recipeDateStart = parseInt((recipe.visibility_start_date).slice(8, 10))
                const recipeDateEnd = parseInt((recipe.visibility_end_date).slice(8, 10))

                const validateMonths = (currentMonth >= recipeMonthStart && currentMonth <= recipeMonthEnd)

                if (validateMonths) {
                    console.log('Recipe within month')


                    if (currentMonth == recipeMonthStart) {
                        if (currentDate < recipeDateStart) {
                            console.log('less than start month date');
                            return ''
                        }
                    }

                    if (currentMonth == recipeMonthEnd) {
                        if (currentDate > recipeDateEnd) {
                            console.log('more than end month date');
                            return ''
                        }
                    }

                    console.log('success within function');
                    return recipe

                } else {
                    console.log('failure outside function');
                    return ''
                }
            } else {
                return recipe
            }
        })
        recipeArray = recipeArray.filter(e => e);
        if (recipeArray.length != 0) {
            return (
                <>
                    {recipeArray.map((recipe) => (
                        <Link className="user-item-card__link" to={"/recipedetails/" + recipe.recipe_id}>
                            <RecipeCard key={recipe.recipe_id} id={recipe.recipe_id} img={recipe.recipe_img} name={recipe.recipe_name}
                                desc={recipe.recipe_desc} prep_time={recipe.prep_time} cooking_time={recipe.cooking_time} />
                        </Link>
                    ))
                    }
                </>

            )
        } else {
            return <h1>Nothing in {category}...</h1>
        }
    }

    const CategoryBreadcrumb = () => {
        let { category } = useParams();
        let categoryStr = '/recipes/' + category
        return (
            <Breadcrumb.Item className="user-breadcrumb-item" href={categoryStr} >{category}</Breadcrumb.Item>
        )
    }

    return (
        <Switch>
            <Route exact path="/recipes">
                <Col xs={2} id="sidebar-wrapper-user">
                    <RecipeSidebar rcat={catArray} />
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Container className="user-container" fluid>
                        <Row className="user-row">
                            <Breadcrumb className="user-breadcrumb">
                                <Breadcrumb.Item className="user-breadcrumb__link-item" href="/home">Home</Breadcrumb.Item>
                                <Breadcrumb.Item className="user-breadcrumb__link-item" href="/recipes">Recipes</Breadcrumb.Item>
                            </Breadcrumb>
                        </Row>
                        <Row xs={3} md={4} lg={4} className="user-row user-row-grid">
                            <RecipeCardMap />
                        </Row>
                    </Container>
                </Col>
            </Route>
            <Route exact path="/recipes/:category">
                <Col xs={2} id="sidebar-wrapper-user">
                    <RecipeSidebar rcat={catArray} />
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Container className="user-container" fluid>
                        <Row className="user-row">
                            <Breadcrumb className="user-breadcrumb">
                                <Breadcrumb.Item className="user-breadcrumb__link-item" href="/home">Home</Breadcrumb.Item>
                                <Breadcrumb.Item className="user-breadcrumb__link-item" href="/recipes">Recipes</Breadcrumb.Item>
                                <CategoryBreadcrumb />
                            </Breadcrumb>
                        </Row>
                        <Row xs={3} md={4} lg={4} className="user-row user-row-grid">
                            <RecipeCategoryCardMap />
                        </Row>
                    </Container>
                </Col>
            </Route>
        </Switch>
    )
}