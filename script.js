const signInButton = document.querySelector('.sign-in');
const loginButton = document.querySelector('.log-in');

signInButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
    displayErrorMessage('Please fill in all fields.');
  } else if (password !== confirmPassword) {
    displayErrorMessage('Passwords do not match.');
  } else {
    // Save data to local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Show alert
    window.alert('Username and password saved successfully!');
    
    // Redirect to sign-in page
    window.location.href = 'home.html'; // Change to appropriate URL
  }
});

loginButton.addEventListener('click', () => {
  // Redirect to login page
  window.location.href = 'login.html'; // Change to appropriate URL
});

function displayErrorMessage(message) {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}
