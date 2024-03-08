import { firebaseConfig } from './config.js';
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
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';

import { getFirestore, collection, addDoc } from 'firebase/firestore';


// initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Services
const db = getDatabase();
const auth = getAuth(app);







const signupForm = document.querySelector('.registration.form');
const loginForm = document.querySelector('.login.form');
const forgotForm=document.querySelector('.forgot.form');
const container=document.querySelector('.container');
const signupBtn = document.querySelector('.signupbtn');


const anchors = document.querySelectorAll('a');
anchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    const id = anchor.id;
    switch(id){
    case 'loginLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
        break;
      case 'signupLabel':
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'none';
        break;
      case 'forgotLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'block';
        break;
    }
  });
});

/* Sign Up Form */
signupBtn.addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;

      sendEmailVerification(auth.currentUser)
        .then(() => {
          alert('Verification email sent. Please check your inbox and verify your email before signing in.');
        })
        .catch((error) => {
          alert('Error sending verification email: ' + error.message);
        });

      console.log('User data saved to Firestore');
      // You need to import Firestore if you're using it, the import statement is missing here
      const userRef = doc(db, 'users', uid); // Reference to the user document using the user's UID
      setDoc(userRef, { // Set data to the user document
        name: name,
        username: username,
        email: email
      });

      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
      forgotForm.style.display = 'none';
    })
    .catch((error) => {
      alert('Error signing up: ' + error.message);
    });
});

/* Login form */
const loginBtn = document.querySelector('.loginbtn');
loginBtn.addEventListener('click', () => {
  const email = document.querySelector('#inUsr').value.trim();
  const password = document.querySelector('#inPass').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log('User is signed in with a verified email.');
        location.href = "index.html";
      } else {
        alert('Please verify your email before signing in.');
      }
    })
    .catch((error) => {
      alert('Error signing in: ' + error.message);
    });
});

/* Forgot Btn */
const forgotBtn=document.querySelector('.forgotbtn');

forgotBtn.addEventListener('click', () => {
  const emailForReset = document.querySelector('#forgotinp').value.trim();
 if (emailForReset.length>0) {
  sendPasswordResetEmail(emailForReset)
    .then(() => {
      alert('Password reset email sent. Please check your inbox to reset your password.');
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
            forgotForm.style.display = 'none';
    })
    .catch((error) => {
    alert('Error sending password reset email: ' + error.message);
  });
  }
});

/* Sign Out Btn */
const signoutBtn = document.querySelector('#signoutbtn');

signoutBtn.addEventListener('click', () => {
  signOut()
    .then(() => {
      console.log('User signed out successfully');
      location.href = "index.html";
    })
    .catch((error) => {
      alert('Error signing out: ', error);
    });
});