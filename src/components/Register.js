import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios'; 
import { Link } from "react-router-dom";
//requirements for password and user
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'; //for "post" URL for endpoint for API

const Register = () => {
    const userRef = useRef(); //allows us to set focus on user input when it loads
    const errRef = useRef(); //set focus on error
//state for user field
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false); //boolean
    const [userFocus, setUserFocus] = useState(false); //boolean
//state for password field
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
//state for validating password field
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
//state for error message or success
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
//useEffect hook. First for setting focus when component loads
    useEffect(() => {
        userRef.current.focus();
    }, []) //dependency array
//useEffect applied to username
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])
//useEffect for password 
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd); //comparing password to password match state
    }, [pwd, matchPwd])
//useEffect for error message
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]) //anytime user changes the state of one of these three state pieces in dependency array, then error message will clear out
//"submit button"
    const handleSubmit = async (e) => { 
        e.preventDefault(); //only thing enforcing REGEX validation is the submit button, which can compromise security
        //"if" button that validates the state of the user and password again
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return; //doesn't submit anything to backend that would have the database that would save the user with invalid info
        } //using axios for try/catch block
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }), //provide payload, backend expecting properties user and pwd
                {
                    headers: { 'Content-Type': 'application/json' }, //headers has its own object
                    withCredentials: true 
                }
            );
            console.log(JSON.stringify(response?.data)); //axios can send back data, access token
            //console.log(JSON.stringify(response)) //full response object that you want to see 
            setSuccess(true);
            
            setUser('');
            setPwd('');
            setMatchPwd('');

        } catch (err) { //standard logic for conditionals in error block
            if (!err?.response) { //optional chaining 
                setErrMsg('No Server Response'); 
            } else if (err.response?.status === 409) { //optional chaining on status 
                setErrMsg('Username Taken');
            } else { //or generic error
                setErrMsg('Registration Failed')
            } //set focus on error field for screen readers
            errRef.current.focus();
        }
    }
//jsx
    return (
        <> 
            {success ? ( 
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
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
                            Password: <br/>
                            Must be 8 to 24 characters.<br />
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

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form> 
                    <p>
                        Already registered?<br />
                        <span className="line">
                        <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register;