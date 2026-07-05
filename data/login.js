const LOGIN_USER = "admin";
const LOGIN_PASSWORD = "ideal2026";
const AUTH_KEY = "ideal-moreno-auth";

const form = document.querySelector("[data-login-form]");
const error = document.querySelector("[data-login-error]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const user = String(data.get("user") || "").trim();
  const password = String(data.get("password") || "");

  if (user === LOGIN_USER && password === LOGIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "true");
    window.location.href = "admin.html";
    return;
  }

  error.textContent = "Usuario o contraseña incorrectos.";
});
