import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Link } from "react-router-dom";
import '../css/sidebar.css'


function UserDetailSidebar() {
    return (
        <>
            <Accordion className="sidebar" flush>
                <Accordion.Item className="sidebar__item" eventKey='0'>
                    <Link
                        to={{
                            pathname: `/useraccountdetails/accountdetails`
                        }}>
                        <Accordion.Header className="sidebar__header sidebar__header--inactive">
                            <div className="sidebar__header-card sidebar__header-card--inactive">
                                <span className="sidebar__header-card-span">Account Details</span>
                            </div>
                        </Accordion.Header>
                    </Link>
                </Accordion.Item>
                <Accordion.Item className="sidebar__item" eventKey='0'>
                    <Link
                        to={{
                            pathname: `/useraccountdetails/orderhistory`
                        }}>
                        <Accordion.Header className="sidebar__header sidebar__header--inactive">
                            <div className="sidebar__header-card sidebar__header-card--inactive">
                                <span className="sidebar__header-card-span">Order History</span>
                            </div>
                        </Accordion.Header>
                    </Link>
                </Accordion.Item>
            </Accordion>

        </>
    )
}

export default UserDetailSidebar;