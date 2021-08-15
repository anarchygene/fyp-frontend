import React from 'react'
import {useState, useEffect } from 'react'
import { Container, Button, Form, Card } from 'react-bootstrap';
import '../css/createpasswordadmin.css';

function CreatePasswordAdmin(){
    const [newPass, setNewPass] = useState("");
    const [cfmPass, setCfmPass] = useState("");

    const [newPassInputText, setNewPassInputText] = useState("Password should only be 6 - 15 characters long, minimum 1 small letter, 1 big letter, 1 special character and you can only use these special characters ('!','@','#','*','_').");
    const [cfmPassInputText, setCfmPassInputText] = useState("Password should only be 6 - 15 characters long, minimum 1 small letter, 1 big letter, 1 special character and you can only use these special characters ('!','@','#','*','_').");
    
    const [lengthFailText,setLengthFailText] = useState("");
    const [minimumOneSmallLetterFailText,setMinimumOneSmallLetterFailText] = useState("Minimum 1 small letter needed.");
    const [minimumOneBigLetterFailText,setMinimumOneBigLetterFailText] = useState("Minimum 1 capital letter needed.");
    const [minimumOneNumberFailText,setMinimumOneNumberFailText] = useState("Minimum 1 number needed");
    const [minimumOneSpecialCharacterFailText,setMinimumOneSpecialCharacterFailText] = useState("Minimum 1 special character needed");
    const [nonAllowedSpecialCharacterFoundText,setNonAllowedSpecialCharacterFoundText] = useState("");
    
    const [newPassMainRegexFail,setNewPassMainRegexFail] = useState(false);
    const [passwordValidateBoolean,setPasswordValidateBoolean] = useState(true);    
    
    const validateNewPassword = () =>{
        var mainPasswordRegEx = new RegExp("(?=^.{6,15}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*");
        
        var allowedSpecialCharactersRegEx = new RegExp("[!@#*_]+");
        
        var nonAlphaNumericRegEx = new RegExp("[^A-Za-z0-9]");
        
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

        if(inputString.length===0){
            const failArray = [setLengthFailText,setMinimumOneSmallLetterFailText,setMinimumOneBigLetterFailText,setMinimumOneNumberFailText,setMinimumOneSpecialCharacterFailText,setNonAllowedSpecialCharacterFoundText]
            failArray.forEach((txt)=>{
                txt("");
            })
        } 

        const specialCharacterRegEx = (inputStringArray) =>{
    
            //for each character in the input:
            inputStringArray.forEach((arrayCharacter)=>{
                //takes out all non-alphanumeric characters (leaves in only special characters)
                if(nonAlphaNumericRegEx.test(arrayCharacter)){
                    //takes in all the non-allowed special characters
                    if(!allowedSpecialCharactersRegEx.test(arrayCharacter)){
                        //appends all to string and tests if its empty to make sure there are no non-allowed special characters
                        specialCharacterArray.push(arrayCharacter);
                        console.log("One  "+specialCharacterArray);
                        if(!(specialCharacterArray.join('') === '')){
                            setNewPassInputText("Password Invalid");
                            setNewPassMainRegexFail(true);
                            setNonAllowedSpecialCharacterFoundText("Illegal Special Characters used. Only these Special Characters are allowed ('!','@','#','*','_').");
                        } 
                    } 
                    console.log("acknowledged")
                    if(allowedSpecialCharactersRegEx.test(arrayCharacter)){
                        if(specialCharacterArray.join('').length===0){
                            setNewPassInputText("Password Valid");    
            
                            setNewPassMainRegexFail(false);
                            
                            const failArray = [setLengthFailText,setMinimumOneSmallLetterFailText,setMinimumOneBigLetterFailText,setMinimumOneNumberFailText,setMinimumOneSpecialCharacterFailText,setNonAllowedSpecialCharacterFoundText]
           
                            failArray.forEach((txt)=>{
                                txt("");
                            })
                 
                        }
                    }
                } else {
                    setNonAllowedSpecialCharacterFoundText("");
                }
            })
        }
        
        const inputFailRegEx = (inputString, inputStringArray) =>{            
            //judge length and set text according to failure
            if (!(inputString.length >= 6 && inputString.length <= 15)){
                (inputString.length < 6)?setLengthFailText("Password is too short."):setLengthFailText("Password is too long.");
            }
            
            if ((inputString.length >= 6 && inputString.length <= 15)||inputString.length===0){
                setLengthFailText("")
            }
            
            if(inputString.length>0){
                setMinimumOneSmallLetterFailText("Minimum 1 small letter needed.");
                setMinimumOneBigLetterFailText("Minimum 1 capital letter needed.");
                setMinimumOneNumberFailText("Minimum 1 number needed");
                setMinimumOneSpecialCharacterFailText("Minimum 1 special character needed");
            }  
            //for each character in the input:
            inputStringArray.forEach((arrayCharacter)=>{
                //takes out all non-alphanumeric characters
                if(!nonAlphaNumericRegEx.test(arrayCharacter)){
                    //takes in all non-numeric characters
                    if(nonNumberRegEx.test(arrayCharacter)){    
                        //takes in all small letters
                        if(smallLetterRegEx.test(arrayCharacter)){
                            smallLetterArray.push(arrayCharacter);
                            if((smallLetterArray.join('').length>0)){
                                setMinimumOneSmallLetterFailText("")
                            } else {
                                setMinimumOneSmallLetterFailText("Minimum 1 small letter needed.")                            
                            }                     
                        }                     
                        //takes in all big letters
                        if(bigLetterRegEx.test(arrayCharacter)){
                            bigLetterArray.push(arrayCharacter);
                            if((bigLetterArray.join('').length>0)){
                                setMinimumOneBigLetterFailText("")
                            } else {
                                setMinimumOneBigLetterFailText("Minimum 1 capital letter needed.")
                            }                        
                        }
                        
                        //takes in all numeric characters
                    } else {
                        numberArray.push(arrayCharacter);
    
                        if((numberArray.join('').length>0)){
                            setMinimumOneNumberFailText("")
                        } else {
                            setMinimumOneNumberFailText("Minimum 1 number needed.")
                        }  
                    }
                } else {
                    specialAllowedCharacterArray.push(arrayCharacter);
                    if((specialAllowedCharacterArray.join('').length>0)){
                        setMinimumOneSpecialCharacterFailText("")
                    } else {
                        setMinimumOneSpecialCharacterFailText("Minimum 1 special character needed.")
                    }  
                }
            })
            
        }

        //Password needs 1 small, 1 large, 1 number, 1 special character
        if(passwordInitialValidation){
            setNewPassInputText("");
            specialCharacterRegEx(inputStringArray);
        }
    
        //Fail
        if(!mainPasswordRegEx.test(inputString)){
            setNewPassInputText("Password Invalid");
            setNewPassMainRegexFail(true);
            specialCharacterRegEx(inputStringArray);
            inputFailRegEx(inputString, inputStringArray);
        }

    } 
    
    const validateCfmPassword = () =>{
        setPasswordValidateBoolean(newPass === cfmPass);
        if(!passwordValidateBoolean){
            setCfmPassInputText("Passwords are not the same")
        } else {
            setCfmPassInputText("Passwords are the same!");
        }
    }

    const onSubmit = (e) => {
        if (newPass.length===0){
            alert("Please Enter a Password.")
            e.preventDefault();
        } else {
            if(!newPassMainRegexFail){
                if (passwordValidateBoolean){
                    //insert proper POST function here
                    alert("Password Confirmed");
                    e.preventDefault();
                } else {
                    alert("New password and confirm password are different. Please use the same one");
                    e.preventDefault();
                }
            } else {
                alert("Password Invalid. Please try again.")
                e.preventDefault();
            }
        }
        
    }

    useEffect(() => {    
        validateNewPassword();
        validateCfmPassword();
    });

    return(
        <Container className="admin-container" fluid>
            <Card className="admin-card">
                <Form className="admin-form" onSubmit={onSubmit}>
                    <Form.Group size="md" className="admin-form__form-group"  controlId="new-password">
                        <Form.Label className="admin-form__input-label">New Password</Form.Label>
                        <Form.Control
                            autoFocus
                            className="admin-form__input"
                            type="password"
                            placeholder="Create New Password"
                            onChange={(e) => setNewPass(e.target.value)}
                            />
                        {
                            (newPass==="")
                            ?                                
                            <>
                            <Form.Label className="admin-form__input-sub-label">Password should only be 6 - 15 characters long, minimum 1 small letter, 1 big letter, 1 special character and you can only use these special characters ('!','@','#','*','_').</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(newPass==="")
                            ?                                
                            <>
                            <Form.Label className="admin-form__input-sub-label">{newPass}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(newPass==="")
                            ?                                
                            <>
                            <Form.Label className="admin-form__input-sub-label">{newPassInputText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(lengthFailText.length===0)
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{lengthFailText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(minimumOneSmallLetterFailText.length===0)
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{minimumOneSmallLetterFailText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(minimumOneBigLetterFailText.length===0)
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{minimumOneBigLetterFailText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(minimumOneNumberFailText.length===0)
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{minimumOneNumberFailText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(minimumOneSpecialCharacterFailText.length===0)
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{minimumOneSpecialCharacterFailText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(nonAllowedSpecialCharacterFoundText.length===0)
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{nonAllowedSpecialCharacterFoundText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                    </Form.Group>
                    <Form.Group size="md" className="admin-form__form-group" controlId="confirm-password">
                        <Form.Label className="admin-form__input-label">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            className="admin-form__input"
                            placeholder="Confirm Password"
                            onChange={(e) => setCfmPass(e.target.value)}
                            />
                        {
                            !(cfmPass === "")
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{cfmPassInputText}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        {
                            !(cfmPass === "")
                            ?
                            <>
                            <Form.Label className="admin-form__input-sub-label">{cfmPass}</Form.Label>
                            <br/>
                            </>
                            :null
                        }
                        <br/>
                    </Form.Group>
                    <Button className="admin-form__button" block size="lg" type="submit"> 
                        Submit 
                    </Button> 
                </Form>
            </Card>
        </Container>
    )
}

export default CreatePasswordAdmin;