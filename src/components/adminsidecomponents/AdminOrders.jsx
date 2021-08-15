import { Container, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import AdminOrderRow from './AdminOrderRow';

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    
    const getOrderName = () => {
        fetch(`https://apibounwe.herokuapp.com/ordername`, { headers: { 'access_right': localStorage.getItem('access_right') } })
            .then(res => res.json())
            .then((json) => {
                setOrders(json)
            }).catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getOrderName()
    }, [])
    return (
        <Container className="admin-container" fluid>
            <div className="admin-card">
            <h1>Manage Orders Page</h1>
                <Breadcrumb className="admin-breadcrumb">
                    <Breadcrumb.Item className="admin-breadcrumb__link" href="/adminprofile">Home</Breadcrumb.Item>
                    <Breadcrumb.Item className="admin-breadcrumb__link" active>Orders</Breadcrumb.Item>
                </Breadcrumb>
                <Table className="admin-table" striped bordered hover>
                    <thead className="admin-table__header">
                        <tr className="admin-table__header-row">
                            <th className="admin-table__header-col">S/N</th>
                            <th className="admin-table__header-col">Date Created</th>
                            <th className="admin-table__header-col">No.</th>
                            <th className="admin-table__header-col">Customer</th>
                            <th className="admin-table__header-col">Total</th>
                            <th className="admin-table__header-col">Status</th>
                            <th className="admin-table__header-col">Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody className="admin-table__body">
                        {orders.map((orders, index) => (
                            <AdminOrderRow key={orders.order_id} sn={index+1} 
                            cdate={new Date(orders.created_at).toUTCString().substring(0, 22)} 
                            number={orders.order_id} invoice_id={orders.invoice_id} 
                            first_name={orders.first_name} last_name={orders.last_name}
                            total={orders.total_amount} status={orders.status} ddate={orders.delivery_date}/>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}