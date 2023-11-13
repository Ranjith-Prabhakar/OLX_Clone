import React, { useState, useContext,useRef } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/firebaseContext';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom'
import Swal from 'sweetalert2';


export default function Signup() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { auth, firebase } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const emailInput = useRef()
  const Write = async (uid) => {
    try {
      const docRef = await addDoc(collection(firebase, "users"), {
        id: uid,
        userName: userName,
        phone: phone,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



  const handleFormSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("user", user)

        updateProfile(auth.currentUser, {
          displayName: userName
        }).then(() => {
          // Profile updated!
          Write(user.uid)
          // alert("Profile updated!")

          // ...
        }).catch((error) => {
          // An error occurred
          // alert("Profile not updated!")
          // ...
        });
       
        navigate('/login')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          Swal.fire("Email already exists");
          setEmail('')
          emailInput.current.value = ''
        }
      
      })

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            ref={emailInput}  
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}

          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => { setPhone(e.target.value) }}

          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}

          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
