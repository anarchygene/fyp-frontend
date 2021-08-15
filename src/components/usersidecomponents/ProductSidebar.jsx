import React, {useState,useEffect} from 'react'
import {Accordion} from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../css/sidebar.css'

function ProductSidebar({pcat,psubcat}) {
    const [catArray,setCatArray]=useState(pcat);
    const [subcatArray,setSubcatArray]=useState(psubcat);
    
    const activeStyleNavbar =  {
        color: 'HSL(154, 64%, 98%)'
    }
    const activeStyleSubcatNavbar =  {
        color: 'HSL(154, 64%, 98%)'
    }
    
    function linkifyStringArrayCat(){
        catArray.map((catObj,index)=>{
            var catString = '';
            var catArrayInner = [];
            catArrayInner = catArray;
            //take name and cut whitespace and make everything lowercase
            catString = catObj.pcat_name;
            catObj.pcat_name = catString.replace(/\s+/g, ' ').trim()
            catString = catString.split(' ').join('');
            catString = catString.toLowerCase();
    
            catString = catString.replace(/[^a-zA-Z ]/g, "")
            catArrayInner[index].linkString=catString
            setCatArray(catArrayInner)
            //take that value and append to object under a new key "linkifyString"      
        })     
    }
    
    function linkifyStringArraySubcat(){
        subcatArray.map((subcatObj,index)=>{
            var subcatString = ''; 
            var subcatArrayInner = [];
            subcatArrayInner = subcatArray;

            //take name and cut whitespace and make everything lowercase (also trim out any unwanted spaces)
            subcatString = subcatObj.psubcat_name;
            subcatObj.psubcat_name = subcatString.replace(/\s+/g, ' ').trim()
            subcatString = subcatString.split(' ').join('');
            subcatString = subcatString.toLowerCase();
            subcatString = subcatString.replace(/[^a-zA-Z ]/g, "")
            subcatArrayInner[index].linkString=subcatString
            setSubcatArray(subcatArrayInner)

            //take that value and append to object under a new key "linkifyString"        
        })        
    }
    
    const SidebarHeader = ({catObjIndex}) =>{
        linkifyStringArrayCat()
        let a = catArray[catObjIndex].pcat_name
        a = a.split('')
        a[0] = a[0].toUpperCase()
        a = a.join('')
        return(
            <>
                <Link 
                    activeStyle={activeStyleNavbar} 
                    to={`/products/${catArray[catObjIndex].linkString}`}>
                        <Accordion.Header className="sidebar__header sidebar__header--inactive">
                            <div className="sidebar__header-card sidebar__header-card--inactive"><span className="sidebar__header-card-span">{a}</span></div>
                        </Accordion.Header>
                </Link>
            </>
        )
    }
    
    const SidebarOption = ({catVal,subcatVal,catObjIndex,subcatObjIndex}) =>{
        linkifyStringArraySubcat()
        let b = subcatArray[subcatObjIndex].psubcat_name
        b = b.split('')
        b[0] = b[0].toUpperCase()
        b = b.join('')
        if(catVal===subcatVal){
            return(
                <Link 
                activeStyle={activeStyleNavbar} 
                to={`/products/${catArray[catObjIndex].linkString}/${subcatArray[subcatObjIndex].linkString}`}>                    
                    <Accordion.Body className="sidebar__body">
                        <div className="sidebar__body-card">{b}</div>
                    </Accordion.Body>
                </Link>
            )
        } else{
            return null
        }
    }
    
    return (
        <>
            <Accordion className="sidebar" flush>
                {catArray.map((catObj,indexCat)=>(
                    <Accordion.Item  className="sidebar__item" eventKey={indexCat}>
                        <SidebarHeader catObjIndex={indexCat}/>
                        {subcatArray.map((subcatObj,indexSubcat) => (
                            !subcatObj.psubcat_name.includes('nil') ? 
                            <SidebarOption catVal={catObj.pcat_id} subcatVal={subcatObj.pcat_id} catObjIndex={indexCat} subcatObjIndex={indexSubcat}/>
                            : null
                            ))}             
                    </Accordion.Item>             
                ))
                }   
            </Accordion>
        </>
    )
}

export default ProductSidebar;
