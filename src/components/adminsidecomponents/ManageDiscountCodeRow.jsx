import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import React from 'react';

function ManageDiscountCodeRow({ sn, discountCode }) {

    const deleteDiscountbyId = (discount_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/discount/${discount_id}`, {
                'method': 'DELETE',
                'headers': {
                    'access_right': localStorage.getItem('access_right')
                }
            })
                .then(res => res.json())
                .then((json) => {
                    console.log("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        });
    }


    const ConfirmDeletePopup = ({ id, close }) => {
        return (
            <div className="popup-card">
                <h3 className="popup-card__header">Confirm Delete?</h3>
                <Button className="popup-card__button" onClick={() => deleteDiscountbyId(id)
                    .then(window.location.href = 'http://localhost:3000/managediscountcode')
                    } type="submit">OK</Button>
                <Button className="popup-card__button" onClick={close}>Cancel</Button>
            </div>
        )
    }

    return (
        <tr className="admin-table__body-row">
            <td className="admin-table__body-data">{sn}</td>
            <td className="admin-table__body-data">{discountCode.discount_name}</td>
            <td className="admin-table__body-data">{discountCode.discount_code}</td>
            <td className="admin-table__body-data">{discountCode.discount_amount}</td>
            <td className="admin-table__body-data">
                <div id="status">
                    {discountCode.active
                        ?
                        <>
                            Active
                        </>
                        :
                        <>
                            Inactive
                        </>
                    }
                    <Link to={`/editdiscount/${discountCode.discount_id}`}><Button className="admin-table__button">Edit Code</Button></Link>

                </div>
            </td>
            <td className="admin-table__body-data">
                <Popup modal closeOnDocumentClick={false} trigger={open => <Button variant="danger" className="admin-table__button">Delete Code</Button>}>
                    {close => <ConfirmDeletePopup id={discountCode.discount_id} close={close} />}
                </Popup>
            </td>
        </tr>
    )
}

export default ManageDiscountCodeRow;