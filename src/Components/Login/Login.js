import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/firebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import {Link,useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { auth, firebase } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire(errorMessage);

      });

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => { setEmail(e.target.value) }}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue={email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e) => { setPassword(e.target.value) }}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue={password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
