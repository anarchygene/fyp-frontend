import { Button } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons';
import Popup from 'reactjs-popup';
import React from 'react';
import { Link } from 'react-router-dom';

function ManageAdminRow({ admins, sn, getAdminDetail }) {
    const deleteAdminbyId = (admin_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/admin/${admin_id}`, {
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
    
    const ConfirmDeletePopup = ({ id, close }) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Delete?</h3>
                <Button className="popup-card__button" type="submit" onClick={() => deleteAdminbyId(id).then(window.location.href = 'http://localhost:3000/manageadmins')}>OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <tr className="admin-table__body-row">
            <td className="admin-table__body-data">{sn}</td>
            <td className="admin-table__body-data">{admins.first_name + " " + admins.last_name}</td>
            <td className="admin-table__body-data">{admins.email}</td>
            <td className="admin-table__body-data">{admins.access_right} <Link to={`/editadmin/${admins.admin_id}`}><PencilSquare onClick={() => getAdminDetail(admins.admin_id)} className="admin-table__icon"></PencilSquare></Link></td>
            <td className="admin-table__body-data">
                <Popup modal closeOnDocumentClick={false} trigger={open => <Button variant="danger">Delete Admin</Button>}>
                    {close => <ConfirmDeletePopup id={admins.admin_id} close={close} />}
                </Popup>
            </td>
        </tr>
    )
}

export default ManageAdminRow;