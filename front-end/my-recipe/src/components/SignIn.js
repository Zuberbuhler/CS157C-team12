import React from "react";
import axios from "axios";
import "./css/SignIn.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div id="sign-in-form">
         <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
               {errMsg}
            </p>

            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
               <label htmlFor="email">
                  Email:
                  <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                  <FontAwesomeIcon
                     icon={faTimes}
                     className={validEmail || !email ? "hide" : "invalid"}
                  />
               </label>
               <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
               />
               <p
                  id="uidnote"
                  className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}
               >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Please enter a valid email address.
               </p>

               <label htmlFor="password">
                  Password:
                  <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                  <FontAwesomeIcon
                     icon={faTimes}
                     className={validPwd || !pwd ? "hide" : "invalid"}
                  />
               </label>
               <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
               />
               <p id="pwdnote" className={"offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a special character.
                  <br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
               </p>

               <button disabled={!validEmail || !validPwd ? true : false}>Sign In</button>
            </form>
            <p>
               Don't have an Account?
               <br />
               <span className="line">
                  <a href="/Register">Register</a>
               </span>
            </p>
         </section>
      </div>
   );
};

export default SignIn;
