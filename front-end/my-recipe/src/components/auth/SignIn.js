import React from "react";
import axios from "axios";
import "./SignIn.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Row, Col, Card } from "react-bootstrap";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignIn = () => {
   let navigate = useNavigate();

   const emailRef = useRef(); //for user field
   const errRef = useRef(); //for error focus

   const [email, setEmail] = useState("");
   const [validEmail, setValidEmail] = useState(false);
   const [emailFocus, setEmailFocus] = useState(false);

   const [pwd, setPwd] = useState("");
   const [validPwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

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
   }, [pwd]);

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
      let payload = {
         email: email,
         password: pwd,
      };

      axios
         .post("http://localhost:8080/api/users", payload)
         .then(function (response) {
            console.log(response);
            if (response.status === 200) {
               setSuccess(true);
               const data = response.data;
               const userObj = {
                  userId: data.id,
                  email: data.email,
                  password: data.password,
               };
               localStorage.setItem("user", JSON.stringify(userObj));
               homepageNav();
            } else {
               setErrMsg("Something wrong!.");
            }
         })
         .catch(function (error) {
            console.log(error);
            setErrMsg("Email or password are wrong!!!");
            errRef.current.focus();
         });
   };

   const homepageNav = () => {
      navigate("/homepage");
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
            <h4>Login</h4>
            <Form onSubmit={handleSubmit} className="">
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
                           id="uidnote"
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
                        <p id="pwdnote" className={"offscreen"}>
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
                  </Col>
               </Row>
               <Button type="submit" disabled={!validEmail || !validPwd ? true : false}>
                  Sign In
               </Button>
            </Form>
            <p>
               Don't have an Account?
               <br />
               <span className="line">
                  <Link to="/register">Register</Link>
               </span>
            </p>
         </Card>
      </div>
   );
};

export default SignIn;
