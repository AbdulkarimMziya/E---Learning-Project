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
  onAuthStateChanged,
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
// Check user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;
    document.getElementById('signing').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    console.log('User is logged in')
  } else {
    // User is signed out
    document.getElementById('logout').style.display = 'none';
    console.log('User is not logged in!!!')
  }
});


// Signup Form
document.getElementById("signup-form").addEventListener("click", function(evt) {
  evt.preventDefault();

  var email =  document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });		  		  
});


// Login Form
document.getElementById("login-form").addEventListener("submit", function(evt) {
  evt.preventDefault();

  let email = document.getElementById('login-email').value
  let password = document.getElementById('login-password').value

  signInWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    // console.log(cred.user);
    alert(cred.user.email +" Login successfully!!!");
    
    window.location.href = "index.html";
    get(child(dbref, 'UserAuthList/' + cred.user.uid)).then((snapshot) =>{
      if(snapshot.exists){
        sessionStorage.setItem("user-info", JSON.stringify({
          firstname: snapshot.val().firstname,
          lastname: snapshot.val().lastname
        }))
        sessionStorage.setItem("user-creds", JSON.stringify(cred.user));
      }
    })
    // Update the welcome message with user information

    // *reset values
  })
  .catch((error) => {
    alert(error.message)
    console.log(error.message)
    console.log(error.code)
  })
});


// Logout   
document.getElementById("logout").addEventListener("click", function() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sign-out successful.');
    alert('Sign-out successful.');
    // Redirect the user to the login page or any other desired page
    document.getElementById('logout').style.display = 'none';
  }).catch((error) => {
    // An error happened.
    console.error('Error during sign-out:', error);
    alert('An error occurred during sign-out. Please try again later.');
  });		  		  
});
