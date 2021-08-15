import React, {useEffect, useState} from 'react'
import { Row, Col, Accordion } from 'react-bootstrap';
import '../css/adminsidebar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import { PersonCircle } from 'react-bootstrap-icons';
import '../css/sidebar.css'

//Role checking middleware
const checkAccess = require('../access/permissions')
const perm = require('../access/roles')
const action = perm.actions
const roles = perm.roles

const activeStyleSidebar =  {
        color: '#FCA311'
}

function AdminSidebar() {  
    const [admin, setAdmin] = useState({})
    useEffect(() => {
        getAdminbyId(localStorage.getItem('admin_id'))
    }, [])
    
    const getAdminbyId = (admin_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/admin/${admin_id}`)
                .then(res => res.json())
                .then((json) => {
                    setAdmin(json[0])
                    return resolve(json[0])
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    let user = JSON.stringify({access_right: localStorage.getItem('access_right')})
    console.log(user)

    return (
        <>
            <Accordion className="sidebar" flush>
                <Accordion.Item  className="sidebar__item" eventKey='0'>
                    <Link 
                        to={{
                            pathname:`/adminprofile`
                        }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">
                                        <Col className="sidebar__col">
                                                <PersonCircle/>
                                            </Col>
                                            <Col>
                                            <Row className="sidebar__row sidebar__row--align">
                                                <span className="sidebar__row-text">                                    
                                                    {admin.first_name}
                                                </span>
                                            </Row>
                                            <Row className="sidebar__row sidebar__row--align">
                                                <span className="sidebar__row-text">                                    
                                                    {admin.access_right}
                                                </span>
                                            </Row>
                                        </Col>
                                    </span>
                                </div>
                            </Accordion.Header>
                    </Link>       
                </Accordion.Item>    
                {checkAccess(user, action.EDIT_PRODUCTS) &&
                    (<Accordion.Item  className="sidebar__item" eventKey='0'>
                    <Link 
                        to={{
                            pathname:`/manageproducts`
                        }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Manage Products</span>
                                </div>
                            </Accordion.Header>
                    </Link>       
                </Accordion.Item>)}
                {checkAccess(user, action.EDIT_PRODUCTS) &&
                    (<Accordion.Item  className="sidebar__item" eventKey='0'>
                    <Link 
                        to={{
                            pathname:`/manageusers`
                        }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Manage Users</span>
                                </div>
                            </Accordion.Header>
                    </Link>       
                </Accordion.Item>)}
                {checkAccess(user, action.EDIT_PRODUCTS) &&
                    (<Accordion.Item  className="sidebar__item" eventKey='0'>
                    <Link 
                        to={{
                            pathname:`/manageadmins`
                        }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Manage Admins</span>
                                </div>
                            </Accordion.Header>
                    </Link>       
                </Accordion.Item>)}
                {checkAccess(user, action.EDIT_RECIPES) &&
                    (<Accordion.Item  className="sidebar__item" eventKey='0'>
                    <Link 
                        to={{
                            pathname:`/managerecipes`
                        }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Manage Recipes</span>
                                </div>
                            </Accordion.Header>
                    </Link>       
                </Accordion.Item>)}
                {checkAccess(user, action.EDIT_ORDERS) &&
                    (<Accordion.Item className="sidebar__item" eventKey='0'>
                        <Link
                            to={{
                                pathname: `/manageorders`
                            }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Manage Orders</span>
                                </div>
                            </Accordion.Header>
                        </Link>
                    </Accordion.Item>)}
                {checkAccess(user, action.EDIT_DISCOUNT) &&
                    (<Accordion.Item className="sidebar__item" eventKey='0'>
                        <Link
                            to={{
                                pathname: `/managediscountcode`
                            }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Manage Discount Code</span>
                                </div>
                            </Accordion.Header>
                        </Link>
                    </Accordion.Item>)}
                <Accordion.Item  className="sidebar__item" eventKey='0'>
                    <Link 
                        to={{
                            pathname:`/createpasswordadmin`
                        }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Create Password (TEMP)</span>
                                </div>
                            </Accordion.Header>
                    </Link>       
                </Accordion.Item>    
                <Accordion.Item  className="sidebar__item" eventKey='0'>
                    <Link 
                        to={{
                            pathname:`/home`
                        }}>
                            <Accordion.Header className="sidebar__header sidebar__header--inactive">
                                <div className="sidebar__header-card sidebar__header-card--inactive">
                                    <span className="sidebar__header-card-span">Switch to User Side</span>
                                </div>
                            </Accordion.Header>
                    </Link>       
                </Accordion.Item> 
        </Accordion>
            
        </>
    )
}

export default AdminSidebar;
