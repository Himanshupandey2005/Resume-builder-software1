const API = 'https://resume-builder-software1-backend.onrender.com/api'; // base URL

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

    try {
        const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const text = await res.text();

        console.log("REGISTER RESPONSE:", text);

        if (!text) {
            alert("Empty response from server");
            return;
        }

        const data = JSON.parse(text);

        alert(data.message);

        if (res.ok) {
            showLogin();
        }

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        alert("Something went wrong");
    }
};
// ─── LOGIN ───
const login = async () => {

    alert("NEW LOGIN FUNCTION RUNNING");

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {

        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();

        console.log("RAW RESPONSE:", text);

        alert(text);

        if (!text) {
            alert("Empty response from server");
            return;
        }

        const data = JSON.parse(text);

        if (res.ok) {

            localStorage.setItem('token', data.token);

            alert("Login successful!");

            window.location.href = 'dashboard.html';

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        alert("Something went wrong");

    }
};