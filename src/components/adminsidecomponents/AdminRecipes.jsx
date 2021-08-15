import { Container, Row, Button, Form } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import RecipeCardAdmin from "./RecipeCardAdmin";
import AdminRecipeDetails from "./AdminRecipeDetails";
import EditRecipes from "./EditRecipes"
import RecipeSearch from "./RecipeSearch";
import AdminRecipeDetails2 from "./AdminRecipeDetails2";
import EditRecipeCategories from "./EditRecipeCategories";
import EditRecipes2 from "./EditRecipes2";
import EditIngredientProd from "./EditIngredientProd";


function AdminRecipesHomepage({ recipes, getRecipeDetail }) {
    const [search, setSearch] = useState("")

    return (
        <Container className="admin-container" fluid>
            <Row className="admin-row">
                <Form className="admin-form">
                    <Form.Group className="admin-form__input-container">
                        <Form.Control onChange={(e) => setSearch(e.target.value)} className="admin-form__input-container" type="text" placeholder="Search" />
                        <Link to={`/searchrecipe/${search}`}><Button type="submit">Search</Button></Link>
                    </Form.Group>
                </Form>
            </Row>
            <Row className="admin-row">
                <Link to="/adminaddrecipe"><Button className="admin-button">Add Recipes</Button></Link>
                <Link to="/editrecipecat"><Button className="admin-button">Recipe Categories</Button></Link>
                <h1 className="admin-header">Manage Recipes Page</h1>
            </Row>
            <Row className="admin-row">
                <Breadcrumb>
                    <Breadcrumb.Item href="/adminprofile">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Recipes</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row className="admin-row">
                {recipes.map((recipes) => (
                    <RecipeCardAdmin id={recipes.recipe_id} key={recipes.recipe_id} img={recipes.recipe_img} name={recipes.recipe_name} desc={recipes.recipe_desc}
                        prep_time={recipes.prep_time} cooking_time={recipes.cooking_time} getRecipeDetail={getRecipeDetail} />
                ))}
            </Row>
        </Container>
    )
}


const AdminRecipes = ({ recipes, getRecipeDetail, recipeDetail }) => {
    const [recipesSearch, setRecipesSearch] = useState([])
    const searchRecipe = (search) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/searchrecipe/${search}`)
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    setRecipesSearch(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }
    return (
        <Container fluid>
            <Router>
                <Switch>
                    <Route path="/adminaddrecipe">
                        <AdminRecipeDetails />
                    </Route>
                    <Route exact path="/adminaddrecipe2/:id">
                        <AdminRecipeDetails2 />
                    </Route>
                    <Route path="/managerecipes">
                        <AdminRecipesHomepage recipes={recipes} getRecipeDetail={getRecipeDetail} searchRecipe={searchRecipe} />
                    </Route>
                    <Route exact path="/editrecipes/:id">
                        <EditRecipes recipes={recipeDetail} />
                    </Route>
                    <Route path="/editrecipes2/:recipe_id">
                        <EditRecipes2/>
                    </Route>
                    <Route path="/editingredientprod/:ingredient_id">
                        <EditIngredientProd/>
                    </Route>
                    <Route exact path="/searchrecipe/:search">
                        <RecipeSearch recipes={recipesSearch} getRecipeDetail={getRecipeDetail} searchRecipe={searchRecipe} />
                    </Route>
                    <Route path="/editrecipecat">
                        <EditRecipeCategories />
                    </Route>
                </Switch>
            </Router>
        </Container>
    )
}

export default AdminRecipes;
