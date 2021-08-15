import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Table } from 'react-bootstrap';
import '../css/managediscountcode.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import ManageDiscountCodeRow from './ManageDiscountCodeRow';

function ManageDiscountCode() {
    const [discounts, setDiscounts] = useState([])

    useEffect(() => {
        getDiscounts()
    }, [])
    const deleteBtn = () => {
        alert("delete button pressed");
        window.location.reload();
    }

    const getDiscounts = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/discount`)
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    setDiscounts(json)
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
                <Row className="admin-row admin-row--align">
                    <h1 className="admin-header">
                        Manage Discount Codes
                    </h1>
                    <div className="admin-line-div"></div>
                </Row>
                <Row className="admin-row">
                    <Breadcrumb className="admin-row__breadcrumb">
                        <Breadcrumb.Item className="admin-row__breadcrumb-link" href="/adminprofile">Home</Breadcrumb.Item>
                        <Breadcrumb.Item className="admin-row__breadcrumb-link" active>Manage Discount Codes</Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
                <Link to="/adddiscount"><Button className="admin__button">Add Code</Button></Link>
                <Row className="admin-row">
                    <Table striped bordered hover className="admin-table" id="manage-discount_code-table">
                        <thead className="admin-table__header">
                            <tr className="admin-table__header-row">
                                <th className="admin-table__header-data">No.</th>
                                <th className="admin-table__header-data">Code Name</th>
                                <th className="admin-table__header-data">Code</th>
                                <th className="admin-table__header-data">Code Discount Value</th>
                                <th className="admin-table__header-data">Code Status</th>
                                <th className="admin-table__header-data">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="admin-table__body">
                            {discounts.map((code, index) => (
                                <ManageDiscountCodeRow sn={index + 1} key={code.discount_id} discountCode={code} deleteFunction={deleteBtn} />
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
        </Container>
    )
}

export default ManageDiscountCode;