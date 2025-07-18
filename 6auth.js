// --- Auth Modal Logic (fixed, deduped, linted) ---

// DOM Elements (declare once)
const getStartedBtn = document.getElementById("getStartedBtn");
const startBox = document.getElementById("startBox");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const landingPage = document.getElementById("landingPage");
const signupError = document.getElementById("signupError");
const loginError = document.getElementById("loginError");
const loader = document.getElementById("loader");

// Password toggle function (for inline use)
function togglePassword(fieldId, iconSpan) {
  const input = document.getElementById(fieldId);
  if (input.type === "password") {
    input.type = "text";
    iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M17.94 17.94C16.13 19.25 14.13 20 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.88 9.88A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3 0 .42-.09.82-.24 1.18"/><path stroke="currentColor" stroke-width="2" d="M1 1l22 22"/></svg>`;
  } else {
    input.type = "password";
    iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>`;
  }
}

// Helper to show/hide forms
function showForm(formId) {
  signupForm.classList.remove('active');
  loginForm.classList.remove('active');
  landingPage.classList.remove('active');
  loader.classList.remove('active');
  document.getElementById(formId).classList.add('active');
}

// Show loader, then signup form on "Get Started"
if (getStartedBtn) {
  getStartedBtn.addEventListener("click", () => {
    startBox.classList.remove("active");
    loader.classList.add("active");
    setTimeout(() => {
      loader.classList.remove("active");
      signupForm.classList.add("active");
    }, 3000);
  });
}

// Registration logic: after signup, redirect to login, then to landing page after login
signupForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const regno = document.getElementById("regno").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    signupError.textContent = "❌ Passwords do not match";
    return;
  }

  // Save user to localStorage
  const user = { name, email, regno, password };
  localStorage.setItem("user", JSON.stringify(user));
  signupError.textContent = "";

  // Redirect to login modal
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
  // Optionally, prefill regno in login form
  document.getElementById("loginRegNo").value = regno;
  document.getElementById("loginPassword").value = "";
  loginError.textContent = "";
});

// Login logic: after login, redirect to landing page
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const reg = document.getElementById("loginRegNo").value.trim();
  const pass = document.getElementById("loginPassword").value;
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser && savedUser.regno === reg && savedUser.password === pass) {
    loginError.textContent = "✅ Login successful";
    setTimeout(() => {
      loginForm.classList.remove("active");
      landingPage.classList.add("active");
      document.getElementById("userName").textContent = savedUser.name;
    }, 800); // short delay for feedback
  } else {
    loginError.textContent = "❌ Invalid credentials";
  }
});

// Forgot password stub
function forgotPassword() {
  alert("Password reset is not implemented in this demo.");
}

// Logout logic
function logout() {
  landingPage.classList.remove("active");
  startBox.classList.add("active");
  document.getElementById("userName").textContent = "User";
  // Optionally clear login fields
  document.getElementById("loginRegNo").value = "";
  document.getElementById("loginPassword").value = "";
  loginError.textContent = "";
}

// Expose for inline HTML
window.togglePassword = togglePassword;
window.forgotPassword = forgotPassword;
window.logout = logout;