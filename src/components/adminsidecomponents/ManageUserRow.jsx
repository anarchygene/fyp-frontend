import React from 'react'
import { Button } from 'react-bootstrap'
import Popup from 'reactjs-popup';

function ManageUserRow({ sn, id, name, pcontact, scontact, address, order, code }) {

    const deleteUserbyId = (user_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/user/${user_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((json) => {
                    console.log("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const ConfirmDeletePopup = ({ close }) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Delete?</h3>
                <Button className="popup-card__button" type="submit" onClick={() => deleteUserbyId(id)
                    .then(window.location.href = 'https://celinechow.github.io/fyp-frontend/#//manageusers')}>OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <tr className="admin-table__body-row">
            <td className="admin-table__body-data">{sn}</td>
            <td className="admin-table__body-data">{name}</td>
            <td className="admin-table__body-data">{pcontact}</td>
            <td className="admin-table__body-data">{scontact}</td>
            <td className="admin-table__body-data">{address}</td>
            <td className="admin-table__body-data">{order}</td>
            <td className="admin-table__body-data">{code}
                <Popup modal closeOnDocumentClick={false} trigger={open => <Button variant="danger" className="delete-user-button">Delete</Button>}>
                    {close => <ConfirmDeletePopup close={close} />}
                </Popup>
            </td>
        </tr>
    )
}

export default ManageUserRow;