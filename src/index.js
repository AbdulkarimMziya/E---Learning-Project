import { initializeApp } from 'firebase/app';

import {
  getDatabase,
  set,
  ref,
  child,
  get
} from 'firebase/database'

import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDvHWlJ7txJ8fTu1afqDwygk9v5ifh-9AE",
    authDomain: "e-learning-web-c83f9.firebaseapp.com",
    projectId: "e-learning-web-c83f9",
    storageBucket: "e-learning-web-c83f9.appspot.com",
    messagingSenderId: "577791964756",
    appId: "1:577791964756:web:7716600e9e4580690e5fc1"
};

// initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Services
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);


// Signup Form
let signupForm = document.getElementById('signup-form');
let firstname = document.getElementById('first-name');
let lastname = document.getElementById('last-name');
let EmailIn = document.getElementById('signup-email');
let PasswordIn = document.getElementById('signup-password');

let RegisterUser = evt => {
  evt.preventDefault();

  createUserWithEmailAndPassword(auth, EmailIn.value, PasswordIn.value)
  .then((cred) => {
    // console.log(cred.user);
    set(ref(db, 'UserAuthist/' + cred.user.uid),{
      firstname: firstname.value,
      lastname: lastname.value
    })
    // *reset values
    alert('User Registered...')
  })
  .catch((error) => {
    alert(error.message)
    console.log(error.message)
    console.log(error.code)
  })

}

signupForm.addEventListener('submit', RegisterUser);


// Login Form
let loginForm = document.getElementById('login-form');
let LoginUser = evt => {
  evt.preventDefault();

  signInWithEmailAndPassword(auth, EmailIn.value, PasswordIn.value)
  .then((cred) => {
    // console.log(cred.user);
    get(child(dbref, 'UserAuthList/' + cred.user.uid)).then((snapshot) =>{
      if(snapshot.exists){
        sessionStorage.setItem("user-info", JSON.stringify({
          firstname: snapshot.val().firstname,
          lastname: snapshot.val().lastname
        }))
        sessionStorage.setItem("user-creds", JSON.stringify(cred.user));
        window.location.href = "index.html";
      }
    })
    // *reset values
  })
  .catch((error) => {
    alert(error.message)
    console.log(error.message)
    console.log(error.code)
  })
}

loginForm.addEventListener('submit', LoginUser);

