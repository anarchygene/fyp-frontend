import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Form, FormControl, Table } from 'react-bootstrap';
import '../css/manageadmins.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink, 
  Redirect
} from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import ManageAdminRow from './ManageAdminRow';


function ManageAdmins({ admins, getAdminDetail }) {

  const [search, setSearch] = useState("")
  return (
    <Container className="admin-container" fluid>
      <Row className="admin-row">
        <Form className="admin-form">
          <Form.Group className="admin-form__input-container">
            <Form.Control onChange={(e) => setSearch(e.target.value)} className="admin-form__input-container" type="text" placeholder="Search" />
            <Link to={`/searchadmin/${search}`}><Button type="submit">Search</Button></Link>
          </Form.Group>
        </Form>
        <h1 className="admin-header">
          Manage Admin
        </h1>
        <div className="admin-line-div"></div>
      </Row>
      <Row className="admin-row">
        <Breadcrumb className="admin-breadcrumb">
          <Breadcrumb.Item className="admin-breadcrumb__link" href="/adminprofile">Home</Breadcrumb.Item>
          <Breadcrumb.Item className="admin-breadcrumb__link" active>Manage Admins</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Link to="/addadmin"><Button className="admin-button">Add Admin</Button></Link>
      <Row className="admin-row">
        <Table striped bordered hover className="admin-table" id="manage-admins-table">
          <thead className="admin-table__header">
            <tr className="admin-table__header-row">
              <th className="admin-table__header-data">S/N</th>
              <th className="admin-table__header-data">Name</th>
              <th className="admin-table__header-data">Email</th>
              <th className="admin-table__header-data">Access Rights</th>
              <th className="admin-table__header-data">Delete</th>
            </tr>
          </thead>
          <tbody className="admin-table__body">
            {admins.map((admins, index) => (
              <ManageAdminRow key={admins.admin_id} admins={admins} sn={index + 1} getAdminDetail={getAdminDetail} />
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default ManageAdmins;