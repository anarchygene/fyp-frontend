import { Container, Row, Button, Form } from "react-bootstrap";
import { BrowserRouter as Router, Switch, useHistory, Route, Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import RecipeCardAdmin from "./RecipeCardAdmin";

function RecipeSearch({ recipes, getRecipeDetail, searchRecipe }) {
    const [newSearch, setNewSearch] = useState("")
    let { search } = useParams()

    const onSearch = () => {
        search = newSearch
        window.location.href = "https://celinechow.github.io/fyp-frontend/#/searchrecipe/" + search
    }

    useEffect(() => {
        searchRecipe(search)
    }, [])

    return (
        <Container className="admin-container" fluid>

            <Row className="admin-row">
                <Form className="admin-form">
                    <Form.Group className="admin-form__input-container">
                        <Form.Control onChange={(e) => setNewSearch(e.target.value)} className="admin-form__input-container" type="text" placeholder="Search" />
                        <Link to={`/searchrecipe/${search}`}>
                            <Button type="submit" onClick={() => onSearch()}>Search</Button></Link>
                    </Form.Group>
                </Form>
            </Row>
            <Row className="admin-row">
                <Link to="/adminaddrecipe"><Button className="admin-button">Add Recipes</Button></Link>
                <Link to="/editrecipecat"><Button className="admin-button">Recipe Categories</Button></Link>
                <h1 className="admin-header">Admin Recipes Page</h1>
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

export default RecipeSearch;