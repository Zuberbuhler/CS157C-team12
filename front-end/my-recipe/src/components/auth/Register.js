import React from "react";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { Button, Form, Row, Col, Card } from "react-bootstrap";

const REGISTER_URL = "http://localhost:8080/api/users/create";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const axios = require("axios").default;

const Register = () => {
   const navigate = useNavigate();
   const emailRef = useRef(); //for user field
   const errRef = useRef(); //for error focus

   const [email, setEmail] = useState("");
   const [validEmail, setValidEmail] = useState(false);
   const [emailFocus, setEmailFocus] = useState(false);

   const [pwd, setPwd] = useState("");
   const [validPwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

   const [matchPwd, setMatchPwd] = useState("");
   const [validMatch, setValidMatch] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

   const [errMsg, setErrMsg] = useState("");
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      emailRef.current.focus();
   }, []);

   useEffect(() => {
      if (isValidEmail(email)) {
         setValidEmail(true);
      } else {
         setValidEmail(false);
      }
   }, [email]);

   useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match);
   }, [pwd, matchPwd]);

   useEffect(() => {
      setErrMsg("");
   }, [pwd, matchPwd]);

   const isValidEmail = (email) => {
      return String(email)
         .toLowerCase()
         .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         );
   };

   const handleSubmit = async (e) => {
      // the only thing enforcing the regex validation is the submit button
      // that could be hacked in the console by somebody going into console
      // and grabbing that button and enabling it.
      e.preventDefault();
      // if button is enable with JS hack
      const v2 = PWD_REGEX.test(pwd);
      if (!v2) {
         setErrMsg("Invalid Entry");
         return;
      }

      let payload = {
         email: email,
         password: pwd,
      };

      axios
         .post(REGISTER_URL, payload)
         .then(function (response) {
            console.log(response);
            if (response.status === 200) {
               setSuccess(true);
               navigate("/");
            } else {
               setErrMsg("Account already Exists.");
            }
         })
         .catch(function (error) {
            setErrMsg("Account already Exists!");
            errRef.current.focus();
         });
   };
   return (
      <div className="myform">
         <Card
            className=" shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto bg-light"
            style={{ width: "30rem" }}
         >
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
               {errMsg}
            </p>
            <h4>Register</h4>
            <Form onSubmit={handleSubmit}>
               <Row>
                  <Col xs={5} md={11}>
                     <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="my-inline">
                           Email:
                           <FontAwesomeIcon
                              icon={faCheck}
                              className={validEmail ? "valid" : "hide"}
                           />
                           <FontAwesomeIcon
                              icon={faTimes}
                              className={validEmail || !email ? "hide" : "invalid"}
                           />
                        </Form.Label>
                        <Form.Control
                           type="email"
                           ref={emailRef}
                           autoComplete="off"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           required
                           aria-invalid={validEmail ? "false" : "true"}
                           aria-describedby="uidnote"
                           onFocus={() => setEmailFocus(true)}
                           onBlur={() => setEmailFocus(false)}
                        ></Form.Control>
                        <p
                           className={
                              emailFocus && email && !validEmail ? "instructions" : "offscreen"
                           }
                        >
                           <FontAwesomeIcon icon={faInfoCircle} />
                           Please enter a valid email address.
                        </p>
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="my-inline">
                           Password:
                           <FontAwesomeIcon
                              icon={faCheck}
                              className={validPwd ? "valid" : "hide"}
                           />
                           <FontAwesomeIcon
                              icon={faTimes}
                              className={validPwd || !pwd ? "hide" : "invalid"}
                           />
                        </Form.Label>
                        <Form.Control
                           type="password"
                           onChange={(e) => setPwd(e.target.value)}
                           value={pwd}
                           required
                           aria-invalid={validPwd ? "false" : "true"}
                           aria-describedby="pwdnote"
                           onFocus={() => setPwdFocus(true)}
                           onBlur={() => setPwdFocus(false)}
                        ></Form.Control>
                        <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                           <FontAwesomeIcon icon={faInfoCircle} />
                           8 to 24 characters.
                           <br />
                           Must include uppercase and lowercase letters, a number and a special
                           character.
                           <br />
                           Allowed special characters: <span aria-label="exclamation mark">
                              !
                           </span>{" "}
                           <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{" "}
                           <span aria-label="dollar sign">$</span>{" "}
                           <span aria-label="percent">%</span>
                        </p>
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label className="my-inline">
                           Confirm Password:
                           <FontAwesomeIcon
                              icon={faCheck}
                              className={validMatch && matchPwd ? "valid" : "hide"}
                           />
                           <FontAwesomeIcon
                              icon={faTimes}
                              className={validMatch || !matchPwd ? "hide" : "invalid"}
                           />
                        </Form.Label>
                        <Form.Control
                           type="password"
                           onChange={(e) => setMatchPwd(e.target.value)}
                           value={matchPwd}
                           required
                           aria-invalid={validMatch ? "false" : "true"}
                           aria-describedby="confirmnote"
                           onFocus={() => setMatchFocus(true)}
                           onBlur={() => setMatchFocus(false)}
                        ></Form.Control>
                        <p className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                           <FontAwesomeIcon icon={faInfoCircle} />
                           Must match the first password input field.
                        </p>
                     </Form.Group>
                  </Col>
               </Row>
               <Button
                  type="submit"
                  disabled={!validEmail || !validPwd || !validMatch ? true : false}
               >
                  Sign Up
               </Button>
            </Form>
            <p>
               Already registered?
               <br />
               <span className="line">
                  <Link to="/">Sign In</Link>
               </span>
            </p>
         </Card>
      </div>
   );
};

export default Register;
