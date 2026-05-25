const API = 'https://resume-builder-software1-backend.onrender.com/api'; // base URL
const token = localStorage.getItem('token'); // token lo

// agar token nahi hai toh login pe bhejo
if (!token) window.location.href = 'index.html';

// ─── RESUMES LOAD KARO ───
const loadResumes = async () => {
    const res = await fetch(`${API}/resume`, {
        headers: { 'authorization': token }
    });

    const resumes = await res.json();
    const resumeList = document.getElementById('resumeList');
    resumeList.innerHTML = ''; // pehle clear karo

    if (resumes.length === 0) {
        resumeList.innerHTML = '<p>Koi resume nahi hai — naya banao!</p>';
        return;
    }

    // har resume ka card banao
    resumes.forEach(resume => {
        resumeList.innerHTML += `
            <div>
                <h3>${resume.title}</h3>
                <button onclick="openResume(${resume.id})">Edit</button>
                <button onclick="deleteResume(${resume.id})">Delete</button>
            </div>
        `;
    });
};

// ─── NAYA RESUME BANANA ───
const createResume = async () => {
    const title = prompt('Resume ka naam likho:');
    if (!title) return;

    const res = await fetch(`${API}/resume`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({ title })
    });

    const data = await res.json();
    alert(data.message);
    loadResumes(); // list refresh karo
};

// ─── RESUME DELETE KARNA ───
const deleteResume = async (id) => {
    if (!confirm('Delete karna chahte ho?')) return;

    const res = await fetch(`${API}/resume/${id}`, {
        method: 'DELETE',
        headers: { 'authorization': token }
    });

    const data = await res.json();
    alert(data.message);
    loadResumes(); // list refresh karo
};

// ─── RESUME OPEN KARNA ───
const openResume = (id) => {
    window.location.href = `templates/template1.html?id=${id}`;
};

// ─── LOGOUT ───
const logout = () => {
    localStorage.removeItem('token'); // token delete karo
    window.location.href = 'index.html'; // login pe jao
};

// page load hote hi resumes load karo
loadResumes();