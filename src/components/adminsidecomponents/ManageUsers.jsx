import React, { useState } from 'react';
import { Table, Container, Row, Button, Form } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import ManageUserRow from './ManageUserRow';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink, 
  Redirect, 
  useParams
} from "react-router-dom";

function ManageUsers({ users }) {
  const [search, setSearch] = useState("")

  return (
    <Container className="manage-users-container" fluid>
      <Row className="header-row">
        <Form className="admin-form">
          <Form.Group className="admin-form__input-container">
            <Form.Control onChange={(e) => setSearch(e.target.value)} className="admin-form__input-container" type="text" placeholder="Search" />
            <Link to={`/searchuser/${search}`}><Button type="submit">Search</Button></Link>
          </Form.Group>
        </Form>
        <h1 className="admin-header">
          Manage Users
        </h1>
        <div className="admin-line-div"></div>
      </Row>
      <Row>
        <Breadcrumb className="admin-breadcrumb">
          <Breadcrumb.Item className="admin-breadcrumb__link" href="/adminprofile">Home</Breadcrumb.Item>
          <Breadcrumb.Item className="admin-breadcrumb__link" active>Manage Users</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Table striped className="admin-table" bordered hover>
        <thead className="admin-table__header">
          <tr className="admin-table__header-row">
            <th className="admin-table__header-data">S/N</th>
            <th className="admin-table__header-data">Name</th>
            <th className="admin-table__header-data">Primary Contact Number</th>
            <th className="admin-table__header-data">Secondary Contact Number</th>
            <th className="admin-table__header-data">Billing Address</th>
            <th className="admin-table__header-data">Last Order Invoice ID</th>
          </tr>
        </thead>
        <tbody className="admin-table__body">
          {users.map((users, index) => (
            <ManageUserRow id={users.user_id} sn={index + 1} name={users.first_name + " " + users.last_name} pcontact={users.pcontact_no} scontact={users.scontact_no} address={users.address} order={users.invoice_id}/>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ManageUsers;