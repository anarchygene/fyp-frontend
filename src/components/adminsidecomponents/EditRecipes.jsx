import { BrowserRouter as Router, Switch, Route, useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';

function EditRecipes() {
    const [recipe_name, setRecipeName] = useState('')
    const [prep_time, setPrepTime] = useState('')
    const [cooking_time, setCookingTime] = useState('')
    const [recipe_desc, setRecipeDescription] = useState('')
    const [recipe_img, setRecipeImage] = useState('')
    const [recipe_step, setRecipeStep] = useState('')
    const [visibility, setVisibility] = useState('')
    const [visibility_start_date, setVisibilityStartDate] = useState('')
    const [visibility_end_date, setVisibilityEndDate] = useState('')

    const [recipeCategories, setRecipeCategories] = useState([])

    const [rcat_id, setRecipeCategory] = useState('Enter category here')
    const [rcat_name, setRecipeCategoryName] = useState('')

    let { id } = useParams();
    let admin_name = "Jennifer"

    const onBack = () => {
        window.location.href = 'https://celinechow.github.io/fyp-frontend/#//managerecipes'
    }

    useEffect(() => {
        getAllRecipeCategories()
        getRecipeById(id)
    }, [])

    const getAllRecipeCategories = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipeCategories`)
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
    
    const updateRecipebyId = (recipe_id, data) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/recipe/${recipe_id}`, {
                method: 'PUT',
                headers: {
                    'access_right': localStorage.getItem('access_right'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log(JSON.stringify(json))
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const getRecipeById = (recipe_id) => {
        fetch(`https://apibounwe.herokuapp.com/recipeid/${recipe_id}`)
            .then(res => res.json())
            .then((json) => {
                setRecipeName(json[0].recipe_name)
                setPrepTime(json[0].prep_time)
                setCookingTime(json[0].cooking_time)
                setRecipeDescription(json[0].recipe_desc)
                setRecipeImage(json[0].recipe_img)
                setRecipeStep(json[0].recipe_step)
                setRecipeCategory(json[0].rcat_id)
                setVisibility(json[0].visibility)
                setVisibilityStartDate(json[0].visibility_start_date.slice(0,10))
                setVisibilityEndDate(json[0].visibility_end_date.slice(0,10))
                getRecipeCategoryByid(json[0].rcat_id)
            }).catch((err) => {
                alert(err);
            });
    }
    const getRecipeCategoryByid = (rcat_id) => {
        fetch(`https://apibounwe.herokuapp.com/recipeCategory/${rcat_id}`)
            .then(res => res.json())
            .then((json) => {
                setRecipeCategoryName(json[0].rcat_name)
            }).catch((err) => {
                alert(err);
            });
    }
    

    let [editName, setEditName] = useState(false)
    let [editDescription, setEditDescription] = useState(false)
    let [editPrepTime, setEditPrepTime] = useState(false)
    let [editCookingTime, setEditCookingTime] = useState(false)
    let [editCategory, setEditCategory] = useState(false)
    let [editImage, setEditImage] = useState(false)
    let [editSteps, setEditSteps] = useState(false)
    let [editVisibility, setEditVisibility] = useState(false)
    let [editStart, setEditStart] = useState(false)
    let [editEnd, setEditEnd] = useState(false)

    const onClickName = () => {

        setEditName(true)

        let boolean_array = [setEditDescription, setEditPrepTime, setEditCookingTime, setEditCategory, setEditSteps, setEditImage, setEditVisibility, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }
    const onClickDesc = () => {

        setEditDescription(true)

        let boolean_array = [setEditName, setEditPrepTime, setEditCookingTime, setEditCategory, setEditSteps, setEditImage, setEditVisibility, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }
    const onClickPrepTime = () => {

        setEditPrepTime(true)

        let boolean_array = [setEditName, setEditDescription, setEditCookingTime, setEditCategory, setEditSteps, setEditImage, setEditVisibility, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }
    const onClickCookingTime = () => {

        setEditCookingTime(true)

        let boolean_array = [setEditName, setEditDescription, setEditPrepTime, setEditCategory, setEditSteps, setEditImage, setEditVisibility, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }
    const onClickCategory = () => {

        setEditCategory(true)

        let boolean_array = [setEditName, setEditDescription, setEditPrepTime, setEditCookingTime, setEditSteps, setEditImage, setEditVisibility, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }
    const onClickSteps = () => {

        setEditSteps(true)

        let boolean_array = [setEditName, setEditDescription, setEditCookingTime, setEditPrepTime, setEditCategory, setEditImage, setEditVisibility, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }
    const onClickImage = () => {

        setEditImage(true)

        let boolean_array = [setEditName, setEditDescription, setEditPrepTime, setEditCookingTime, setEditCategory, setEditSteps, setEditVisibility, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    const onClickVisibility = () => {

        setEditVisibility(true)

        let boolean_array = [setEditName, setEditDescription, setEditPrepTime, setEditCookingTime, setEditCategory, setEditSteps, setEditImage, setEditStart, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    const onClickStart = () => {

        setEditStart(true)

        let boolean_array = [setEditName, setEditDescription, setEditPrepTime, setEditCookingTime, setEditCategory, setEditSteps, setEditImage, setEditVisibility, setEditEnd];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    const onClickEnd = () => {

        setEditEnd(true)

        let boolean_array = [setEditName, setEditDescription, setEditPrepTime, setEditCookingTime, setEditCategory, setEditSteps, setEditImage, setEditStart, setEditVisibility];

        boolean_array.forEach((bool) => {
            bool(false)
        })

    }

    return (
        <div className="admin-card" fluid>
            <Button className="admin-button" onClick={onBack}>Back</Button>
            <Link to={`/editrecipes2/${id}`}><Button variant="success">Manage Ingredients</Button></Link>
            <h1 className="admin-header">Edit recipe details</h1>
            <Form className="admin-form">
                <Form.Group className="admin-form__input-container" controlId="recipeName">
                    <Form.Label className="admin-form__label">Recipe Name</Form.Label>
                    {
                        !editName
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={recipe_name}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickName} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editName
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="name" className="admin-form__input" placeholder="Enter recipe name" required
                                    value={recipe_name} onChange={(e) => setRecipeName(e.target.value)} />
                            </Row>
                            : null
                    }
                </Form.Group>

                <Form.Group className="admin-form__input-container" controlId="recipeDescription">
                    <Form.Label className="admin-form__label">Recipe Description</Form.Label>
                    {
                        !editDescription
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={recipe_desc}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickDesc} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editDescription
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="text" className="admin-form__input" placeholder="Enter recipe description" required
                                    value={recipe_desc} onChange={(e) => setRecipeDescription(e.target.value)} />
                            </Row>
                            : null
                    }

                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="prepTime">
                    <Form.Label className="admin-form__label">Preparation Time</Form.Label>
                    {
                        !editPrepTime
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={prep_time}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickPrepTime} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editPrepTime
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="text" className="admin-form__input" placeholder="Enter preparation time" required
                                    value={prep_time} onChange={(e) => setPrepTime(e.target.value)} />
                            </Row>
                            : null
                    }
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="cookingTime">
                    <Form.Label className="admin-form__label">Cooking Time</Form.Label>
                    {
                        !editCookingTime
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={cooking_time}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickCookingTime} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editCookingTime
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="text" className="admin-form__input" placeholder="Enter cooking time" required
                                    value={cooking_time} onChange={(e) => setCookingTime(e.target.value)} />
                            </Row>
                            : null
                    }
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="category">
                    <Form.Label className="admin-form__label">Recipe Category</Form.Label>
                    <Form.Control as="select" className="admin-form__input-choice" value={rcat_id} onClick={onClickCategory}
                        onChange={(e) => setRecipeCategory(e.target.value)} required>
                        {recipeCategories.map((recipeCategory) => (
                            <option className="admin-form__input-option" key={recipeCategory.rcat_id} value={recipeCategory.rcat_id}>
                                {recipeCategory.rcat_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="steps">
                    <Form.Label>Recipe Steps</Form.Label>
                    {
                        !editSteps
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input--readonly" defaultValue={recipe_step}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickSteps} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editSteps
                            ?
                            <Row className="admin-form__row">
                                <Form.Control as="textarea" rows={3}  className="admin-form__input" placeholder="Enter recipe steps" required
                                    value={recipe_step} onChange={(e) => setRecipeStep(e.target.value)} />
                            </Row>
                            : null
                    }

                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="image">
                    <Form.Label className="admin-form__label">Recipe Image</Form.Label>
                    {
                        !editImage
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={2}>
                                    <h6>{recipe_img}</h6>
                                    <Card>
                                        <Card.Img src={recipe_img} className="admin-form__image" variant="top" />
                                    </Card>
                                </Col>
                                <Col className="admin-form__col">
                                    <PencilSquare className="admin-form__icon" onClick={onClickImage} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editImage
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="text" className="admin-form__input-file" value={recipe_img} onChange={(e) => setRecipeImage(e.target.value)} />
                            </Row>
                            : null
                    }
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="visibility">
                    <Form.Label className="admin-form__label">Visibility</Form.Label>
                    {
                        !editVisibility
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={visibility}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickVisibility} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editVisibility
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="text" className="admin-form__input" placeholder="Enter visibility: 1 for true and 0 for false" required
                                    value={visibility} onChange={(e) => setVisibility(e.target.value)} />
                            </Row>
                            : null
                    }
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="startDate">
                    <Form.Label className="admin-form__label">Visibility Start Date</Form.Label>
                    {
                        !editStart
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={visibility_start_date}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickStart} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editStart
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="text" className="admin-form__input" placeholder="YYYY-MM-DD format" required
                                    value={visibility_start_date} onChange={(e) => setVisibilityStartDate(e.target.value)} />
                            </Row>
                            : null
                    }
                </Form.Group>
                <Form.Group className="admin-form__input-container" controlId="endDate">
                    <Form.Label className="admin-form__label">Visibility End Date</Form.Label>
                    {
                        !editEnd
                            ?
                            <Row className="admin-form__row">
                                <Col className="admin-form__col" xs={10}>
                                    <Form.Control plaintext readOnly className="admin-form__input-readonly" defaultValue={visibility_end_date}>
                                    </Form.Control>
                                </Col>
                                <Col className="admin-form__col" xs={2}>
                                    <PencilSquare className="admin-form__icon" onClick={onClickEnd} />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        editEnd
                            ?
                            <Row className="admin-form__row">
                                <Form.Control type="text" className="admin-form__input" placeholder="YYYY-MM-DD format" required
                                    value={visibility_end_date} onChange={(e) => setVisibilityEndDate(e.target.value)} />
                            </Row>
                            : null
                    }
                </Form.Group>

                <Button className="admin-form__button" variant="primary" onClick={() => updateRecipebyId(id, {rcat_id, recipe_name, prep_time, cooking_time, recipe_desc, recipe_img, recipe_step, admin_name, visibility, visibility_start_date, visibility_end_date}).then(window.location.href = "https://celinechow.github.io/fyp-frontend/#//managerecipes")}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditRecipes;
