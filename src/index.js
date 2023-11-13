import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/firebaseContext'
import {app,auth,firebase} from './firebase/config'
import Context from './store/firebaseContext'

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <FirebaseContext.Provider value={{ app,auth,firebase }} >
    <Context>
    <App />
    </Context>
  </FirebaseContext.Provider>
);
