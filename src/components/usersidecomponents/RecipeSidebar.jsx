import React, { useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../css/sidebar.css'
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons'


function RecipeSidebar(rcat) {
    const [categories, setCategories] = useState(rcat.rcat);
    useEffect(() => {
    }, [])

    const activeStyleNavbar = {
        color: 'HSL(154, 64%, 98%)'
    }

    const SidebarHeader = ({ rcat_name, rcat_id }) => {
        let rcat_name2 = rcat_name.split('')
        rcat_name2[0] = rcat_name2[0].toUpperCase()
        return (
            <>
                <Link
                    activeStyle={activeStyleNavbar}
                    to={`/recipes/${rcat_name}`}>
                    <Accordion.Header className="sidebar__header sidebar__header--inactive">
                        <div className="sidebar__header-card sidebar__header-card--inactive"><span className="sidebar__header-card-span">{rcat_name2}</span></div>
                    </Accordion.Header>
                </Link>
            </>
        )
    }



    return (
        <>
            <Accordion className="sidebar" flush>
                {categories.map((category, index) => (
                    <Accordion.Item className="sidebar__item" eventKey={index}>
                        <SidebarHeader rcat_name={category.rcat_name} rcat_id={category.rcat_id} />
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

export default RecipeSidebar;
