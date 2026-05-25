const API = 'https://resume-builder-software1.onrender.com/api';
const token = localStorage.getItem('token');
const resumeId = new URLSearchParams(window.location.search).get('id');

if (!token) window.location.href = 'index.html';

// ─── BACK BUTTON ───
const goBack = () => {
    window.location.href = 'dashboard.html';
};

// ─── SECTIONS LOAD KARO ───
const loadSections = async () => {
    const res = await fetch(`${API}/section/${resumeId}`, {
        headers: { 'authorization': token }
    });

    const sections = await res.json();
    const sectionsList = document.getElementById('sectionsList');
    sectionsList.innerHTML = '';

    if (sections.length === 0) {
        sectionsList.innerHTML = '<p style="color:#aaa; font-size:14px;">Koi section nahi — left panel se add karo!</p>';
        return;
    }

    sections.forEach(section => {
        const div = document.createElement('div');
        div.id = `section-${section.id}`;
        div.innerHTML = `
            <h3>${section.section_title}</h3>

            <!-- Text Styling Toolbar -->
            <div class="section-toolbar no-print">
                <button class="tool-btn" onclick="applyStyle('bold')" title="Bold"><b>B</b></button>
                <button class="tool-btn" onclick="applyStyle('italic')" title="Italic"><i>I</i></button>
                <button class="tool-btn" onclick="applyStyle('underline')" title="Underline"><u>U</u></button>

                <select class="tool-select" onchange="applyFontSize(this.value)" title="Font Size">
                    <option value="">Size</option>
                    <option value="11px">Small</option>
                    <option value="14px">Normal</option>
                    <option value="17px">Large</option>
                    <option value="20px">X-Large</option>
                </select>

                <select class="tool-select" onchange="applyWritingStyle(this.value)" title="Writing Style">
                    <option value="">Style</option>
                    <option value="normal">Normal</option>
                    <option value="formal">Formal</option>
                    <option value="modern">Modern</option>
                    <option value="compact">Compact</option>
                </select>

                <input class="tool-color" type="color" onchange="applyColor(this.value)" title="Text Color" value="#1a1a2e">

                <button class="item-del-btn no-print" onclick="deleteSection(${section.id})">
                    <i class="ti ti-trash"></i>
                </button>
            </div>

            <!-- Item Add Form -->
            <div class="item-form no-print">
                <input class="item-input" type="text" id="key-${section.id}" placeholder="Label (optional)">
                <input class="item-input" type="text" id="val-${section.id}" placeholder="Value (required)">
                <button class="item-add-btn" onclick="addItem(${section.id})">+ Add</button>
            </div>

            <!-- Items List -->
            <div id="items-${section.id}" class="section-content"></div>
        `;
        sectionsList.appendChild(div);
        loadItems(section.id);
    });
};

// ─── SECTION ADD KARO ───
const addSection = async () => {
    const section_type = document.getElementById('sectionType').value;
    const section_title = document.getElementById('sectionTitle').value;

    if (!section_title) return alert('Section title likho!');

    await fetch(`${API}/section`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({ resume_id: resumeId, section_type, section_title })
    });

    document.getElementById('sectionTitle').value = '';
    loadSections();
};

// ─── SECTION DELETE KARO ───
const deleteSection = async (id) => {
    if (!confirm('Delete karna chahte ho?')) return;

    await fetch(`${API}/section/${id}`, {
        method: 'DELETE',
        headers: { 'authorization': token }
    });

    loadSections();
};

// ─── ITEM ADD KARO ───
const addItem = async (section_id) => {
    const field_key = document.getElementById(`key-${section_id}`).value || ''; // optional
    const field_value = document.getElementById(`val-${section_id}`).value;

    if (!field_value) return alert('Value likhna zaroori hai!');

    await fetch(`${API}/section/item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({ section_id, field_key, field_value })
    });

    // inputs clear karo
    document.getElementById(`key-${section_id}`).value = '';
    document.getElementById(`val-${section_id}`).value = '';

    loadItems(section_id);
};

// ─── ITEMS LOAD KARO ───
const loadItems = async (section_id) => {
    const res = await fetch(`${API}/section/item/${section_id}`, {
        headers: { 'authorization': token }
    });

    const items = await res.json();
    const itemsDiv = document.getElementById(`items-${section_id}`);
    itemsDiv.innerHTML = '';

    items.forEach(item => {
        // field_key optional hai — agar hai toh dikha, nahi toh sirf value
        itemsDiv.innerHTML += item.field_key
            ? `<p><b>${item.field_key}:</b> ${item.field_value}</p>`
            : `<p>${item.field_value}</p>`;
    });
};

// ─── PHOTO UPLOAD ───
const uploadPhoto = async () => {
    const fileInput = document.getElementById('photoInput');
    const file = fileInput.files[0];

    if (!file) return alert('Pehle photo select karo!');

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result;

        // dono jagah preview dikha do
        const preview = document.getElementById('photoPreview');
        preview.src = base64;
        preview.style.display = 'block';

        const previewLeft = document.getElementById('photoPreviewLeft');
        if (previewLeft) { previewLeft.src = base64; previewLeft.style.display = 'block'; }

        localStorage.setItem('photoBase64', base64);
    };
    reader.readAsDataURL(file);
};

// ─── PHOTO LOAD KARO ───
const loadPhoto = () => {
    const savedPhoto = localStorage.getItem('photoBase64');
    if (savedPhoto) {
        const preview = document.getElementById('photoPreview');
        preview.src = savedPhoto;
        preview.style.display = 'block';

        const previewLeft = document.getElementById('photoPreviewLeft');
        if (previewLeft) { previewLeft.src = savedPhoto; previewLeft.style.display = 'block'; }
    }
};

// ─── TEMPLATE SET KARO ───
const setTemplate = (templateName) => {
    const sectionsList = document.getElementById('sectionsList');
    sectionsList.className = '';
    sectionsList.classList.add(`template-${templateName}`);
    localStorage.setItem('template', templateName);
};

// ─── TEMPLATE LOAD KARO ───
const loadTemplate = () => {
    const saved = localStorage.getItem('template') || 'classic';
    setTemplate(saved);
};

// ─── TEXT STYLING ───
const applyStyle = (style) => {
    document.execCommand(style);
};

const applyFontSize = (size) => {
    if (!size) return;
    document.execCommand('fontSize', false, '7');
    const fontEls = document.querySelectorAll('font[size="7"]');
    fontEls.forEach(el => {
        el.removeAttribute('size');
        el.style.fontSize = size;
    });
};

const applyColor = (color) => {
    document.execCommand('foreColor', false, color);
};

// ─── WRITING STYLE ───
const applyWritingStyle = (style) => {
    const sectionsList = document.getElementById('sectionsList');
    // pehle saari style classes hata do
    sectionsList.classList.remove('style-formal', 'style-modern', 'style-compact', 'style-normal');
    if (style) sectionsList.classList.add(`style-${style}`);
};

// ─── ATS SCORE ───
const checkATS = async () => {
    const res = await fetch(`${API}/section/${resumeId}`, {
        headers: { 'authorization': token }
    });

    const sections = await res.json();
    let score = 0;
    let suggestions = [];

    const sectionTypes = sections.map(s => s.section_type);

    if (sectionTypes.includes('education')) score += 20;
    else suggestions.push('Education section add karo');

    if (sectionTypes.includes('experience')) score += 25;
    else suggestions.push('Experience section add karo');

    if (sectionTypes.includes('skills')) score += 20;
    else suggestions.push('Skills section add karo');

    if (sectionTypes.includes('projects')) score += 15;
    else suggestions.push('Projects section add karo');

    if (sectionTypes.includes('certifications')) score += 10;
    else suggestions.push('Certifications add karo');

    if (localStorage.getItem('photoBase64')) score += 10;
    else suggestions.push('Photo add karo');

    const color = score >= 70 ? '#27ae60' : score >= 40 ? '#f39c12' : '#e94560';

    document.getElementById('atsScore').innerHTML = `
        <h3>ATS Score: ${score}/100</h3>
        <div class="ats-bar-bg">
            <div class="ats-bar-fill" style="width:${score}%; background:${color};"></div>
        </div>
        <ul>${suggestions.map(s => `<li>⚠️ ${s}</li>`).join('')}</ul>
    `;
};

// ─── PDF DOWNLOAD ───
const downloadPDF = () => {
    document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');

    const element = document.getElementById('resumePreview');

    const options = {
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            scrollY: 0,
            useCORS: true,
            allowTaint: true,
            logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save().then(() => {
        document.querySelectorAll('.no-print').forEach(el => el.style.display = '');
    });
};

// ─── PAGE LOAD ───
loadSections();
loadTemplate();
loadPhoto();