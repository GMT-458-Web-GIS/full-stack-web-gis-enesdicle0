const API_BASE = "http://localhost:3000";
const $ = (id) => document.getElementById(id);

function saveSession(data) {
  // backend artık bunları dönüyor
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("role", data.role);
}

$("btnRegister").addEventListener("click", async () => {
  $("r_out").textContent = "Registering...";
  const username = $("r_user").value.trim();
  const password = $("r_pass").value.trim();
  const role = $("r_role").value;

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });
    const data = await res.json();
    $("r_out").textContent = JSON.stringify(data);

    if (data.ok) {
      saveSession(data);
      alert("Registered & logged in!");
    }
  } catch (e) {
    $("r_out").textContent = "Error: " + e.message;
  }
});

$("btnLogin").addEventListener("click", async () => {
  $("l_out").textContent = "Logging in...";
  const username = $("l_user").value.trim();
  const password = $("l_pass").value.trim();

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    $("l_out").textContent = JSON.stringify(data);

    if (data.ok) {
      saveSession(data);
      alert("Login success!");
    }
  } catch (e) {
    $("l_out").textContent = "Error: " + e.message;
  }
});

$("btnGoGame").addEventListener("click", () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) {
    alert("Login first!");
    return;
  }
  window.location.href = "./index.html";
});
