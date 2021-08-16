import React from 'react';
import { Button } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";

function EditRecipes2Row({ index, name, id, optional, qty, recipe_id }) {

    const deleteIngredientbyId = (ingredient_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/ingredient/${ingredient_id}`, {
                method: 'DELETE',
                headers: { 'access_right': localStorage.getItem('access_right') }
            })
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }
    

    return (
        <tr className="admin-table__body-row">
            <td className="admin-table__body-data">{index}</td>
            <td className="admin-table__body-data">{name}</td>
            <td className="admin-table__body-data">{qty}</td>
            {
                optional
                ?
                <td className="admin-table__body-data">Optional</td>
                : 
                <td className="admin-table__body-data"></td>
            }
            <td className="admin-table__body-data"><Link to={`/editingredientprod/${id}`}><Button className="admin-table__button">Edit</Button></Link></td>
            <td className="admin-table__body-data"><Button className="admin-table__button" variant="danger" onClick={()=>deleteIngredientbyId(id).then(window.location.href="https://celinechow.github.io/fyp-frontend/#//editrecipes2/" + recipe_id)}>Delete</Button></td>
        </tr>
    )
}

export default EditRecipes2Row;