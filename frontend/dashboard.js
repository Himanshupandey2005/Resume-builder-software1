const API = 'https://resume-builder-software1-backend.onrender.com/api';
const token = localStorage.getItem('token');

// token check
if (!token) {
    window.location.href = 'index.html';
}

// ─── RESUMES LOAD ───
const loadResumes = async () => {
    try {

        const res = await fetch(`${API}/resume`, {
            headers: {
                'authorization': token
            }
        });

        const data = await res.json();

        console.log(data);

        const resumeList = document.getElementById('resumeList');

        // agar response array nahi hai
        const resumes = Array.isArray(data) ? data : [];

        resumeList.innerHTML = '';

        if (!res.ok) {
            resumeList.innerHTML = `
                <p style="color:red;">
                    Server Error (${res.status})
                </p>
            `;
            return;
        }

        // empty state
        if (resumes.length === 0) {
            resumeList.innerHTML = `
                <p>Koi resume nahi hai — naya banao!</p>
            `;
            return;
        }

        // cards
        resumes.forEach(resume => {

            const updatedDate = resume.updated_at
                ? new Date(resume.updated_at).toLocaleDateString()
                : 'No date';

            resumeList.innerHTML += `
                <div style="
                    background:#16161f;
                    padding:20px;
                    border-radius:12px;
                    margin-bottom:12px;
                    border:1px solid rgba(255,255,255,0.08);
                ">
                    <h3 style="margin-bottom:10px;">
                        ${resume.title || 'Untitled Resume'}
                    </h3>

                    <p style="
                        color:rgba(255,255,255,0.5);
                        margin-bottom:15px;
                        font-size:13px;
                    ">
                        Updated: ${updatedDate}
                    </p>

                    <div style="display:flex; gap:10px;">
                        
                        <button onclick="openResume(${resume.id})"
                            style="
                                padding:8px 14px;
                                border:none;
                                border-radius:8px;
                                background:#2563eb;
                                color:white;
                                cursor:pointer;
                            ">
                            Edit
                        </button>

                        <button onclick="deleteResume(${resume.id})"
                            style="
                                padding:8px 14px;
                                border:none;
                                border-radius:8px;
                                background:#dc2626;
                                color:white;
                                cursor:pointer;
                            ">
                            Delete
                        </button>

                    </div>
                </div>
            `;
        });

    } catch (error) {

        console.error(error);

        document.getElementById('resumeList').innerHTML = `
            <p style="color:red;">
                Failed to load resumes
            </p>
        `;
    }
};

// ─── CREATE RESUME ───
const createResume = async () => {

    const title = prompt('Resume ka naam likho:');

    if (!title) return;

    try {

        const res = await fetch(`${API}/resume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ title })
        });

        const data = await res.json();

        alert(data.message || 'Resume created');

        loadResumes();

    } catch (error) {

        console.error(error);
        alert('Resume create nahi hua');
    }
};

// ─── DELETE RESUME ───
const deleteResume = async (id) => {

    if (!confirm('Delete karna chahte ho?')) return;

    try {

        const res = await fetch(`${API}/resume/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': token
            }
        });

        const data = await res.json();

        alert(data.message || 'Resume deleted');

        loadResumes();

    } catch (error) {

        console.error(error);
        alert('Delete failed');
    }
};

// ─── OPEN RESUME ───
const openResume = (id) => {

    window.location.href = `templates/template1.html?id=${id}`;
};

// ─── LOGOUT ───
const logout = () => {

    localStorage.removeItem('token');

    window.location.href = 'index.html';
};

// load resumes
loadResumes();