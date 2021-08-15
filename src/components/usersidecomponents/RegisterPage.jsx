import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Col, Card } from "react-bootstrap";
import '../css/registerpage.css'
const speakeasy = require('speakeasy');

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState(0);
    const [unitNo, setUnitNo] = useState("");
    const [pContactNo, setPContactNo] = useState("");
    const [sContactNo, setSContactNo] = useState("");
    const [newPass, setNewPass] = useState("");
    const [cfmPass, setCfmPass] = useState("");
    const [letVerify, setLetVerify] = useState(false)
    const [tempSecret, setTempSecret] = useState("")
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false)

    const [newPassInputText, setNewPassInputText] = useState("Password should only be 6 - 15 characters long, minimum 1 small letter, 1 big letter, 1 special character and you can only use these special characters ('!','@','#','*','_').");
    const [cfmPassInputText, setCfmPassInputText] = useState("Password should only be 6 - 15 characters long, minimum 1 small letter, 1 big letter, 1 special character and you can only use these special characters ('!','@','#','*','_').");

    const [lengthFailText, setLengthFailText] = useState("");
    const [minimumOneSmallLetterFailText, setMinimumOneSmallLetterFailText] = useState("Minimum 1 small letter needed.");
    const [minimumOneBigLetterFailText, setMinimumOneBigLetterFailText] = useState("Minimum 1 capital letter needed.");
    const [minimumOneNumberFailText, setMinimumOneNumberFailText] = useState("Minimum 1 number needed");
    const [minimumOneSpecialCharacterFailText, setMinimumOneSpecialCharacterFailText] = useState("Minimum 1 special character needed");
    const [nonAllowedSpecialCharacterFoundText, setNonAllowedSpecialCharacterFoundText] = useState("");

    const [newPassMainRegexFail, setNewPassMainRegexFail] = useState(false);
    const [passwordValidateBoolean, setPasswordValidateBoolean] = useState(true);

    const validateNewPassword = () => {
        var mainPasswordRegEx = new RegExp("(?=^.{6,15}$)((?=.*)(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*");

        var allowedSpecialCharactersRegEx = new RegExp("[!@#*_]+");

        var nonAlphaNumericRegEx = new RegExp("[^A-Za-z0-9]");
        var nonNumberRegEx = new RegExp("^[a-zA-Z]+$");
        var smallLetterRegEx = new RegExp("[a-z]");
        var bigLetterRegEx = new RegExp("[A-Z]");

        const smallLetterArray = [];
        const bigLetterArray = [];
        const numberArray = [];
        const specialCharacterArray = [];
        const specialAllowedCharacterArray = [];

        const inputString = newPass;
        const inputStringArray = inputString.split('');

        const passwordInitialValidation = mainPasswordRegEx.test(inputString);

        if (inputString.length === 0) {
            const failArray = [setLengthFailText, setMinimumOneSmallLetterFailText, setMinimumOneBigLetterFailText, setMinimumOneNumberFailText, setMinimumOneSpecialCharacterFailText, setNonAllowedSpecialCharacterFoundText]
            failArray.forEach((txt) => {
                txt("");
            })
        }

        const specialCharacterRegEx = (inputStringArray) => {

            //for each character in the input:
            inputStringArray.forEach((arrayCharacter) => {
                //takes out all non-alphanumeric characters (leaves in only special characters)
                if (nonAlphaNumericRegEx.test(arrayCharacter)) {
                    //takes in all the non-allowed special characters
                    if (!allowedSpecialCharactersRegEx.test(arrayCharacter)) {
                        //appends all to string and tests if its empty to make sure there are no non-allowed special characters
                        specialCharacterArray.push(arrayCharacter);
                        console.log("One  " + specialCharacterArray);
                        if (!(specialCharacterArray.join('') === '')) {
                            setNewPassInputText("Password Invalid");
                            setNewPassMainRegexFail(true);
                            setNonAllowedSpecialCharacterFoundText("Illegal Special Characters used. Only these Special Characters are allowed ('!','@','#','*','_').");
                        }
                    }
                    console.log("acknowledged")
                    if (allowedSpecialCharactersRegEx.test(arrayCharacter)) {
                        if (specialCharacterArray.join('').length === 0) {
                            setNewPassInputText("Password Valid");

                            setNewPassMainRegexFail(false);

                            const failArray = [setLengthFailText, setMinimumOneSmallLetterFailText, setMinimumOneBigLetterFailText, setMinimumOneNumberFailText, setMinimumOneSpecialCharacterFailText, setNonAllowedSpecialCharacterFoundText]

                            failArray.forEach((txt) => {
                                txt("");
                            })

                        }
                    }
                } else {
                    setNonAllowedSpecialCharacterFoundText("");
                }
            })
        }

        const inputFailRegEx = (inputString, inputStringArray) => {
            //judge length and set text according to failure
            if (!(inputString.length >= 6 && inputString.length <= 15)) {
                (inputString.length < 6) ? setLengthFailText("Password is too short.") : setLengthFailText("Password is too long.");
            }

            if ((inputString.length >= 6 && inputString.length <= 15) || inputString.length === 0) {
                setLengthFailText("")
            }

            if (inputString.length > 0) {
                setMinimumOneSmallLetterFailText("Minimum 1 small letter needed.");
                setMinimumOneBigLetterFailText("Minimum 1 capital letter needed.");
                setMinimumOneNumberFailText("Minimum 1 number needed");
                setMinimumOneSpecialCharacterFailText("Minimum 1 special character needed");
            }
            //for each character in the input:
            inputStringArray.forEach((arrayCharacter) => {
                //takes out all non-alphanumeric characters
                if (!nonAlphaNumericRegEx.test(arrayCharacter)) {
                    //takes in all non-numeric characters
                    if (nonNumberRegEx.test(arrayCharacter)) {
                        //takes in all small letters
                        if (smallLetterRegEx.test(arrayCharacter)) {
                            smallLetterArray.push(arrayCharacter);
                            if ((smallLetterArray.join('').length > 0)) {
                                setMinimumOneSmallLetterFailText("")
                            } else {
                                setMinimumOneSmallLetterFailText("Minimum 1 small letter needed.")
                            }
                        }
                        //takes in all big letters
                        if (bigLetterRegEx.test(arrayCharacter)) {
                            bigLetterArray.push(arrayCharacter);
                            if ((bigLetterArray.join('').length > 0)) {
                                setMinimumOneBigLetterFailText("")
                            } else {
                                setMinimumOneBigLetterFailText("Minimum 1 capital letter needed.")
                            }
                        }

                        //takes in all numeric characters
                    } else {
                        numberArray.push(arrayCharacter);

                        if ((numberArray.join('').length > 0)) {
                            setMinimumOneNumberFailText("")
                        } else {
                            setMinimumOneNumberFailText("Minimum 1 number needed.")
                        }
                    }
                } else {
                    specialAllowedCharacterArray.push(arrayCharacter);
                    if ((specialAllowedCharacterArray.join('').length > 0)) {
                        setMinimumOneSpecialCharacterFailText("")
                    } else {
                        setMinimumOneSpecialCharacterFailText("Minimum 1 special character needed.")
                    }
                }
            })

        }

        //Password needs 1 small, 1 large, 1 number, 1 special character
        if (passwordInitialValidation) {
            setNewPassInputText("");
            specialCharacterRegEx(inputStringArray);
        }

        //Fail
        if (!mainPasswordRegEx.test(inputString)) {
            setNewPassInputText("Password Invalid");
            setNewPassMainRegexFail(true);
            specialCharacterRegEx(inputStringArray);
            inputFailRegEx(inputString, inputStringArray);
        }

    }

    const validateCfmPassword = () => {
        setPasswordValidateBoolean(newPass === cfmPass);
        if (!passwordValidateBoolean) {
            setCfmPassInputText("Passwords are not the same")
        } else {
            setCfmPassInputText("Passwords are the same!");
        }
    }
    //Check if email is new
    const checkUserEmail = (email) => {
        alert(email)
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/checkUseremail/${email}`)
                .then(res => res.json())
                .then((json) => {
                    resolve(json)
                }).catch((err) => {
                    alert(`Error at checkUserEmail: ${err}`)
                    console.log(err);
                    reject(err)
                });
        })
    }

    //Generate 6-digit token
    const genToken = (temp_secret_key) => {
        fetch(`https://apibounwe.herokuapp.com/genToken/${temp_secret_key}`)
            .then(res => res.json())
            .then((json) => {
                setTempSecret(temp_secret_key)
                sendEmail({
                    from: 'eugenekeezl20.19@ichat.sp.edu.sg', to: email,
                    subject: 'Sending u a 6-digit token to verify your email for the first time', text: JSON.stringify(json), 
                    html: `<h3><b>2 Factor Authentication token</b></h3>
                    <p>Here's your 6-digit code to complete your account registration:</p>
                    <p><b>${json.token}</b></p>
                    <p>It will expire <b>5 minutes from now</b></p>`
                })
            }).catch((err) => {
                alert(`Error at genToken: ${err}`)
                console.log(err);
            });
    }

    //Send an email to the user(Currently only can send to emails that I verify in AWS SES cause still in sandbox,
    //to send to anyone need finish doing and hosting the website to submit request to AWS for review)
    const sendEmail = (data) => {
        fetch(`https://apibounwe.herokuapp.com/sendEmail`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                alert('An email has been sent to you to verify your email before adding you to DB')
            }).catch((err) => {
                alert(`Error at sendEmail(Register): ${err}`)
                console.log(err);
            });
    }

    //Verify the user's entered 6 digit token
    const verifyToken = (data) => {
        fetch(`https://apibounwe.herokuapp.com/userVerify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                if (json) {
                    //Now send the entered information into the database
                    registerUser({
                        email: email, first_name: firstName, last_name: lastName, password: cfmPass, address: address,
                        postal_code: postalCode, unit_no: unitNo, pcontact_no: pContactNo, scontact_no: sContactNo,
                        secret_key: tempSecret
                    })
                    //And redirect to login page
                    setVerified(true)
                    return
                }
                alert(JSON.stringify(`Token verified is ${JSON.stringify(json)}`))
            }).catch((err) => {
                alert(`Error at verifyToken: ${err}`)
                console.log(err);
            });
    }

    //Register a user
    const registerUser = (data) => {
        fetch(`https://apibounwe.herokuapp.com/userRegister`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                console.log(JSON.stringify(json))
            }).catch((err) => {
                alert(`Error at registerUser: ${err}`);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (newPass.length === 0) {
            alert("Please Enter a Password.")
        } else {
            if (!newPassMainRegexFail) {
                if (passwordValidateBoolean) {
                    //Generate a 6 digit token for verification with email
                    checkUserEmail(email)
                    .then((json) => {
                        if(json) {
                            setLetVerify(true)
                            genToken(speakeasy.generateSecret().base32)
                        }
                        else {
                            alert(`Your email ${email} is already in use`)
                        }
                    })
                    
                } else {
                    alert("New password and confirm password are different. Please use the same one");
                }
            } else {
                alert("Password Invalid. Please try again.")
            }
        }
    }

    useEffect(() => {
        validateNewPassword();
        validateCfmPassword();
    });

    return (
        <Container className="user-container user-container--register" fluid>
            {verified ? <Redirect push to="/login" /> : null}
            <Col style={{paddingBottom:'7.5vh'}} className="user-col user-col--register-page" md={{span:8,offset:2}}>
                <div className="user-div__header-div">
                    <span className="user-span__header user-span__header--register">Register Account</span>
                </div>
                <div className="user-div__register-form">
                {!letVerify ?
                    <Form className="user-card__password-form" onSubmit={onSubmit}>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__email" controlId="email">
                            <Form.Label className="user-card__label">Enter Email<span className="user-span__asterisk">*</span></Form.Label>
                            <Form.Control
                                required
                                className="user-card__input"
                                type="email"
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__first-name" controlId="first-name">
                            <Form.Label className="user-card__label">Enter First Name<span className="user-span__asterisk">*</span></Form.Label>
                            <Form.Control
                                required
                                className="user-card__input"
                                type="text"
                                placeholder="Enter First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__last-name" controlId="last-name">
                            <Form.Label className="user-card__label">Enter Last Name<span className="user-span__asterisk">*</span></Form.Label>
                            <Form.Control
                                required
                                className="user-card__input"
                                type="text"
                                placeholder="Enter Last name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__address" controlId="address">
                            <Form.Label className="user-card__label">Enter Address</Form.Label>
                            <Form.Control
                                className="user-card__input"
                                type="text"
                                placeholder="Enter Address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__postal-code" controlId="postal-code">
                            <Form.Label className="user-card__label">Enter Postal Code (Do Not Include Letters)</Form.Label>
                            <Form.Control
                                maxLength="6"
                                className="user-card__input"
                                type="text"
                                placeholder="Enter Postal Code"
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__unit-no" controlId="unit-no">
                            <Form.Label className="user-card__label">Enter Unit No</Form.Label>
                            <Form.Control
                                className="user-card__input"
                                type="text"
                                placeholder="Enter Unit No"
                                onChange={(e) => setUnitNo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__p-contact-no" controlId="p-contact-no">
                            <Form.Label className="user-card__label">Enter Primary Contact Number<span className="user-span__asterisk">*</span> (Do Not Include +65)</Form.Label>
                            <Form.Control
                                required
                                className="user-card__input"
                                type="text"
                                placeholder="Enter Primary Contact No"
                                onChange={(e) => setPContactNo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__s-contact-no" controlId="s-contact-no">
                            <Form.Label className="user-card__label">Enter Secondary Contact Number (Do Not Include +65)</Form.Label>
                            <Form.Control
                                className="user-card__input"
                                type="text"
                                placeholder="Enter Secondary Contact No"
                                onChange={(e) => setSContactNo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__new-password" controlId="new-password">
                            <Form.Label className="user-card__label">New Password<span className="user-span__asterisk">*</span></Form.Label>
                            <Form.Control
                                maxLength="15"
                                required
                                autoFocus
                                className="user-card__input"
                                type="password"
                                placeholder="Create New Password"
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                            {
                                (newPass === "")
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">Password should only be 6 - 15 characters long, minimum 1 small letter, 1 big letter, 1 special character and you can only use these special characters ('!','@','#','*','_').</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(newPass === "")
                                    ?
                                    <>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(newPass === "")
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">{newPassInputText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(lengthFailText.length === 0)
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">{lengthFailText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(minimumOneSmallLetterFailText.length === 0)
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">{minimumOneSmallLetterFailText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(minimumOneBigLetterFailText.length === 0)
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">{minimumOneBigLetterFailText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(minimumOneNumberFailText.length === 0)
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">{minimumOneNumberFailText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(minimumOneSpecialCharacterFailText.length === 0)
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">{minimumOneSpecialCharacterFailText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(nonAllowedSpecialCharacterFoundText.length === 0)
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub-label">{nonAllowedSpecialCharacterFoundText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                        </Form.Group>
                        <Form.Group size="md" className="user-card__form-group user-card__form-group--register-page user-card__confirm-password" controlId="confirm-password">
                            <Form.Label className="user-card__label">Confirm Password<span className="user-span__asterisk">*</span></Form.Label>
                            <Form.Control
                                maxLength="15"
                                required
                                className="user-card__input"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setCfmPass(e.target.value)}
                            />
                            {
                                !(cfmPass === "")
                                    ?
                                    <>
                                        <Form.Label className="user-card__sub--label">{cfmPassInputText}</Form.Label>
                                        <br />
                                    </>
                                    : null
                            }
                            {
                                !(cfmPass === "")
                                    ?
                                    <>
                                        <br />
                                    </>
                                    : null
                            }
                            <br />
                        </Form.Group>
                        <Button className="user-card__btn--submit" variant="success" size="lg" type="submit">
                            Submit
                        </Button>
                    </Form>
                    : null}
                {letVerify ?
                    <Form>
                        <Card.Title className="user-card__header">Verify the code sent to your email</Card.Title>
                        <Form.Group className="user-form__input-container" size="lg" controlId="text">
                            <Form.Label className="user-form__label">6-digit code</Form.Label>
                            <Form.Control
                                type="text"
                                className="user-form__input"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="user-form__button" block size="lg"
                            onClick={() => verifyToken({ temp_secret_key: tempSecret, token: token })}>
                            Verify
                        </Button>
                    </Form>
                    : null}
                </div>
            </Col>
        </Container>
    )
}

export default RegisterPage