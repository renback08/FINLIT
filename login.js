const loginForm = document.querySelector("form.login");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const emailError = document.getElementById("emailError");
const togglePassword = document.getElementById("togglePassword");

// Email validation
emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    emailError.textContent = isValidEmail ? '' : 'Please enter a valid email address';
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈'; // Change icon
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rememberMe = document.getElementById("rememberMe").checked;
    console.log(`Login submitted. Remember Me: ${rememberMe ? 'Enabled' : 'Disabled'}`);
    // Implement actual login logic here
});

