import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const REGISTER_URL = 'http://localhost:8080/api/users';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const axios = require('axios').default;

const Register = () => {
    const emailRef = useRef(); //for user field
    const errRef = useRef(); //for error focus

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
      emailRef.current.focus();
    }, [])

    useEffect(() => {
      if(isValidEmail(email))
      {
        setValidEmail(true);
      }
      else
      { 
        setValidEmail(false);
      }
    }, [email])

    useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match);
    }, [pwd, matchPwd])
    
    useEffect(() => {
      setErrMsg("");
    }, [pwd, matchPwd])

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
            console.log("Invalid Submit")
            return;
        }

        console.log(email, pwd);
        let payload = {
          email:email,
          password:pwd
        }
        
        axios.post(REGISTER_URL, 
          payload
        )
        .then(function (response) {
          console.log(response);
          if(response.data === false)
          {
            console.log("Failed to insert new user.")
            setErrMsg("Account already Exists.")
          }
          else if (response.data === true){
            setSuccess(true)
          }
          else{
            setErrMsg("Something wrong!.")
          }
        })
        .catch(function (error) {
          console.log(error);
          setErrMsg("Registration Failed!")
          errRef.current.focus();
        });
    }
  return (
      <div className='App'>
      {success ? (
              <section>
                  <h1>Success!</h1>
                  <p>
                      <a href="/SignIn">Sign In</a>
                  </p>
              </section>
          ) : (
              <section>
                  <p ref = {errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                  <h1>Register</h1>

                  <form onSubmit={handleSubmit}>
                  <label htmlFor="email">
                      Email:
                      <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
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
                  <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Please enter a valid email address.
                  </p>

                  <label htmlFor="password">
                      Password:
                      <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
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
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.<br />
                      Must include uppercase and lowercase letters, a number and a special character.<br />
                      Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                  </p>
                  <label htmlFor="confirm_pwd">
                      Confirm Password:
                      <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                  </label>
                  <input
                      type="password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                  />
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                  </p>

                  <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>

                  </form>
                  <p>
                      Already registered?<br />
                      <span className="line">
                          <a href="/">Sign In</a>
                      </span>
                  </p>
              </section>
      )}
    </div>
  )
}

export default Register