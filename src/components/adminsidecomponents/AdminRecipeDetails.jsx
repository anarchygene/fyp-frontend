import { BrowserRouter as Router, Switch, Route, useHistory, Link, Redirect } from "react-router-dom";
import { Container, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


const AdminRecipeDetails = () => {
    const [recipe_name, setRecipeName] = useState('')
    const [prep_time, setPrepTime] = useState('')
    const [cooking_time, setCookingTime] = useState('')
    const [recipe_desc, setRecipeDescription] = useState('')
    const [rcat_id, setRecipeCategory] = useState('')
    const [rsubcat_id, setRecipeSubCategory] = useState('')
    const [recipe_img_url, setRecipeImage] = useState('')
    const [recipe_step, setRecipeStep] = useState('')
    const [admin_name, setAdminName] = useState('Jennifer')
    const [visibility, setVisibility] = useState()
    const [visibility_start_date, setVisibilityStart] = useState()
    const [visibility_end_date, setVisibilityEnd] = useState()
    const [insertId, setInsertId] = useState('123')

    const [recipeCategories, setRecipeCategories] = useState([])
    
    const history = useHistory();

    const onBack = () => {
        window.location.href = 'https://celinechow.github.io/fyp-frontend/#/managerecipes'
    }

    useEffect(() => {
         getAllRecipeCategories()
         console.log(insertId)
    }, [])

    const onNext = () => {
        // alert(JSON.stringify({"rcat_id": rcat_id, "recipe_name": recipe_name, "prep_time": prep_time, "cooking_time": cooking_time, "recipe_desc": recipe_desc, "recipe_img": recipe_img_url, "recipe_step": recipe_step, "admin_name": admin_name, "visibility": visibility, "visibility_start_date": visibility_start_date, "visibility_end_date": visibility_end_date}))
        createRecipe({"rcat_id": rcat_id, "recipe_name": recipe_name, "prep_time": prep_time, "cooking_time": cooking_time, "recipe_desc": recipe_desc, "recipe_img": recipe_img_url, "recipe_step": recipe_step, "admin_name": admin_name, "visibility": visibility, "visibility_start_date": visibility_start_date, "visibility_end_date": visibility_end_date})
        }

    const createRecipe = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_right': localStorage.getItem('access_right')
                  },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    setInsertId(json.insertId)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const getAllRecipeCategories = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipeCategories`, {headers: {'access_right': localStorage.getItem('access_right')}})
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    setRecipeCategories(json)
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    return (
        <Container className="admin-container" fluid>
            <div className="admin-card">
                <Button className="admin-button" onClick={onBack}>Back</Button>
                <h1 className="admin-header">Add recipe details</h1>            
                <Form className="admin-form">
                    <Form.Group className="admin-form__input-container" controlId="recipeName">
                        <Form.Label className="admin-form__label">Recipe Name</Form.Label>
                        <Form.Control type="name" className="admin-form__input" placeholder="Enter recipe name" required
                            value={recipe_name} onChange={(e) => setRecipeName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="admin-form__input-container" controlId="prepTime">
                        <Form.Label className="admin-form__label">Preparation Time</Form.Label>
                        <Form.Control type="text" className="admin-form__input" placeholder="Enter preparation time" required
                            value={prep_time} onChange={(e) => setPrepTime(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="admin-form__input-container" controlId="cookingTime">
                        <Form.Label className="admin-form__label">Cooking Time</Form.Label>
                        <Form.Control type="text" className="admin-form__input" placeholder="Enter cooking time" required
                            value={cooking_time} onChange={(e) => setCookingTime(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="admin-form__input-container" controlId="recipeDescription">
                        <Form.Label className="admin-form__label">Recipe Description</Form.Label>
                        <Form.Control type="text" className="admin-form__input" placeholder="Enter recipe description" required
                            value={recipe_desc}  onChange={(e) => setRecipeDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="admin-form__input-container" controlId="recipeStep">
                        <Form.Label className="admin-form__label">Recipe Step</Form.Label>
                        <Form.Control as="textarea" rows={3} className="admin-form__input" placeholder="Enter recipe steps" required
                            value={recipe_step}  onChange={(e) => setRecipeStep(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="admin-form__input-container" controlId="visibility">
                        <Form.Label className="admin-form__label">Visibility</Form.Label>
                        <Form.Control type="text" className="admin-form__input" placeholder="Enter visibility: 1 for true and 0 for false" required
                            value={visibility} onChange={(e) => setVisibility(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="admin-form__input-container" controlId="visibilityStart">
                        <Form.Label className="admin-form__label">Visibility Start Date</Form.Label>
                        <Form.Control type="text" className="admin-form__input" placeholder="YYYY-MM-DD format" required
                            value={visibility_start_date} onChange={(e) => setVisibilityStart(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="admin-form__input-container" controlId="visibilityEnd">
                        <Form.Label className="admin-form__label">Visibility End Date</Form.Label>
                        <Form.Control type="text" className="admin-form__input" placeholder="YYYY-MM-DD format" required
                            value={visibility_end_date} onChange={(e) => setVisibilityEnd(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="admin-form__input-container" controlId="recipeCategory">
                        <Form.Label className="admin-form__label">Recipe Category</Form.Label>
                        <Form.Control as="select" className="admin-form__input admin-form__input--selector" value={rcat_id} onChange={(e) => setRecipeCategory(e.target.value)} >
                        {/* <Form.Control as="select" className="admin-form__input admin-form__input--selector" value={rcat_id} onChange={(e) => getRecipeSubCategories(e.target.value)} > */}
                            <option>-Choose a Recipe Category-</option>
                            {recipeCategories.map((recipeCategory) => (
                                <option className="admin-form__input_option" key={recipeCategory.rcat_id} value={recipeCategory.rcat_id}>
                                    {recipeCategory.rcat_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="admin-form__input-container" controlId="recipeImage">
                        <Form.Label className="admin-form__label">Recipe Image</Form.Label>
                        <Form.Control type="file" className="admin-form__input admin-form__input--image" accept="image/*" value={recipe_img_url} onChange={(e) => setRecipeImage(e.target.value)} />
                    </Form.Group>
                    { insertId != 123
                    ? <Redirect push to={`/adminaddrecipe2/${insertId}`}></Redirect>
                    : null
                    }
                    <Button onClick={onNext} className="admin-button" variant="primary">
                        Next
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default AdminRecipeDetails;