import React from 'react'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";

function AdminOrderRow({ sn, cdate, number, invoice_id, first_name, last_name, total, status, ddate }) {
    const delivery_date = ddate.slice(0, 10)
    return (
        <tr className="admin-table__body-row">
            <td className="admin-table__body-data">{sn}</td>
            <td className="admin-table__body-data">{cdate}</td>
            <td className="admin-table__body-data">{invoice_id}</td>
            <td className="admin-table__body-data">{first_name} {last_name}</td>
            <td className="admin-table__body-data">${total.toFixed(2)}</td>
            <td className="admin-table__body-data"> {status}</td>
            <td className="admin-table__body-data">{delivery_date}</td>
            <td className="admin-table__body-data"><Link to={`/adminorderdetails/${number}`}><Button className="admin-table__button">View</Button></Link></td>
        </tr>
    )
}

export default AdminOrderRow;