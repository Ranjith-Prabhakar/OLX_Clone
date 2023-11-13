import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import './App.css';
import { AuthContext, FirebaseContext } from './store/firebaseContext';
import { onAuthStateChanged } from "firebase/auth";

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const { user, setUser } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  useEffect(() => {
    // auth.auth().onAuthStateChanged((isLoggedInUser) => {
    //   setUser(isLoggedInUser)
    //   console.log("user", user)
    // })
    onAuthStateChanged(auth, (user1) => {
      if (user1) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user1.uid;
        console.log("user1", user1)
        setUser(user1)
        console.log("user", user)
        // ...
      } else {
        // User is signed out
        // ...
        console.log('no user logged in')
      }
    });
  }, [])
  return (
    <div>
      <Router >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
