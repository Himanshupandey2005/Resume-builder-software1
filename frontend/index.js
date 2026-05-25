const API = 'https://resume-builder-software1.onrender.com/api'; // base URL

// ─── FORM TOGGLE ───
const showRegister = () => {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
};

const showLogin = () => {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
};

// ─── REGISTER ───
const register = async () => {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) showLogin(); // register ke baad login pe le jao
};

// ─── LOGIN ───
const login = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem('token', data.token); // token save karo
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // dashboard pe jao
    } else {
        alert(data.message);
    }
};