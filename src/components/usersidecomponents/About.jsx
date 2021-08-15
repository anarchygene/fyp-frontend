import React from 'react'
import { Row, Table, Container } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../css/aboutus.css';

const About = () => {
    return (
        <Container style={{ marginLeft: '1.5vw', marginTop:'3.5vh'}} className="user-container user-container--text-color" fluid>
            <Row className="user-row">
                <Breadcrumb className="user-breadcrumb">
                    <Breadcrumb.Item className="user-breadcrumb__link" href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item className="user-breadcrumb__link" active>About Us</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row className="user-row">
                <Row className="user-inner-row">
                    <span className="user-header">
                        About Us
                    </span>
                </Row>
                <Row className="user-inner-row user-inner-row--overflow">
                    <div className="user-inner-div">
                        <p className="user-text">NINEMARS ENTERPRISE is an ACRA-registered entity that has been operating for
                            2 years 2 months in Singapore since its incorporation year in 2019. Officially, NINEMARS ENTERPRISE PTE. LTD. is
                            registered as Exempt Private Limited Company with its address in District 23 (Hillview, Dairy Farm, Bukit Panjang,
                            Choa Chu Kang), primarily operates in the sector of "WHOLESALE TRADE OF A VARIETY OF GOODS WITHOUT A
                            DOMINANT PRODUCT", SSIC code - 46900</p>
                        <br/>
                        <p className="user-text user-text--spacebtwn">Previously, NINEMARS ENTERPRISE PTE. LTD. also operated under the name of ARANN FOOD PTE. LTD.</p>
                        <br/>

                        <p className="user-text user-text--spacebtwn">The company appears to be exempted from statutory auditing requirements</p>

                        <br/>
                        <p className="user-text user-text--spacebtwn">NINEMARS ENTERPRISE PTE. LTD. is a non-listed entity in the private market with no IPO filing</p>

                        <br/>
                        <p className="user-text user-text--spacebtwn">As of 1 March 2020, the company is not involved in any litigation based on the public records of the Supreme Court of
                            Singapore. This information is provided to the best of our research ability and we make no warranties over any data
                            inaccuracies or omissions.</p>

                    </div>
                </Row>
                <Row className="user-inner-row">
                    <span className="user-header user-header--bottom-margin">Contact Us</span>
                    <br/>
                    <Table className="user-table" bordered>
                        <tbody className="user-table__body">
                            <tr className="user-table__body-row">
                                <td className="user-table__body-data user-table__body-data--header">Phone</td>
                                <td className="user-table__body-data user-table__body-data--text">+65 6873 0065</td>
                            </tr>                        
                            <tr className="user-table__body-row">
                                <td className="user-table__body-data user-table__body-data--header">Address</td>
                                <td className="user-table__body-data user-table__body-data--text">1 BUKIT BATOK CRESCENT, #05-20, WCEGA PLAZA, Singapore 658064</td>
                            </tr>                        
                            <tr className="user-table__body-row">
                                <td className="user-table__body-data user-table__body-data--header">Postal District</td>
                                <td className="user-table__body-data user-table__body-data--text">District 23 (Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang)</td>
                            </tr>                        
                        </tbody>
                    </Table>

                </Row>              
            </Row>
        </Container>
    )
}

export default About
