const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  formControl.querySelector('small').innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if(username.value.trim() === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }

  if(email.value.trim() === '') {
    showError(email, 'Email is required');
  } else if(!isValidEmail(email.value.trim())) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
  }

  if(password.value.trim() === '') {
    showError(password, 'Password is required');
  } else if(password.value.length < 8) {
    showError(password, 'Password must be at least 8 characters');
  } else {
    showSuccess(password);
  }

  if(password2.value.trim() === '') {
    showError(password2, 'Please confirm your password');
  } else if(password2.value !== password.value) {
    showError(password2, 'Passwords do not match');
  } else {
    showSuccess(password2);
  }
});
