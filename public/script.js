// ── Tab switching ───────────────────────────────
function switchTab(tab, e) {
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("tab-" + tab).classList.add("active");
  e.currentTarget.classList.add("active");
  if (tab === "view") loadResumes();
}

// ── Toast notification ──────────────────────────
function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "show " + type;
  setTimeout(() => {
    t.className = "";
  }, 3000);
}

// ── Clear form ──────────────────────────────────
function clearForm() {
  [
    "fullName",
    "email",
    "phone",
    "address",
    "objective",
    "education",
    "skills",
    "experience",
  ].forEach((id) => (document.getElementById(id).value = ""));
}

// ── Save resume ─────────────────────────────────
async function saveResume() {
  const fields = [
    "fullName",
    "email",
    "phone",
    "address",
    "objective",
    "education",
    "skills",
    "experience",
  ];
  const resume = {};
  for (const id of fields) {
    const val = document.getElementById(id).value.trim();
    if (!val) {
      showToast("Please fill in all fields.", "error");
      return;
    }
    resume[id] = val;
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  const btn = document.getElementById("saveBtn");
  btn.innerHTML = '<span class="spinner"></span>Saving...';
  btn.disabled = true;

  try {
    const res = await fetch("/save-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resume),
    });
    const data = await res.json();

    if (data.success) {
      showToast("✅ Resume saved! (ID: " + data.id + ")");
      clearForm();
    } else {
      showToast(data.message || "Something went wrong.", "error");
    }
  } catch (err) {
    showToast("❌ Cannot reach server. Is Node.js running?", "error");
  } finally {
    btn.innerHTML = "Save Resume";
    btn.disabled = false;
  }
}

// ── Load resumes ────────────────────────────────
async function loadResumes() {
  const list = document.getElementById("resumeList");
  const count = document.getElementById("resumeCount");
  list.innerHTML =
    '<div style="text-align:center;padding:40px;color:var(--muted)">Loading...</div>';

  try {
    const res = await fetch("/resumes");
    const data = await res.json();

    if (!data.success || !data.data.length) {
      count.textContent = "0 resumes saved";
      list.innerHTML = `
          <div class="empty-state">
            <div class="icon">📄</div>
            <p>No resumes saved yet.<br>Go to <strong>Build Resume</strong> to add one.</p>
          </div>`;
      return;
    }

    count.textContent = data.data.length + " resume(s) saved";
    list.innerHTML = "";

    const container = document.createElement("div");
    container.className = "resume-list";

    data.data.forEach((item) => {
      const date = new Date(item.created_at).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const card = document.createElement("div");
      card.className = "resume-card";
      card.innerHTML = `
          <div class="resume-card-header" onclick="toggleCard(this)">
            <div>
              <h3>${esc(item.full_name)}</h3>
              <div class="resume-meta">${esc(item.email)} · ${esc(item.phone)} · Saved ${date}</div>
            </div>
            <div class="card-actions">
              <button class="btn-icon" title="Delete" onclick="deleteResume(${item.id}, event)">🗑 Delete</button>
              <span class="chevron">▼</span>
            </div>
          </div>
          <div class="resume-card-body">
            <div class="resume-field"><strong>Address</strong>${esc(item.address)}</div>
            <div class="resume-field"><strong>Career Objective</strong>${esc(item.objective)}</div>
            <div class="resume-field"><strong>Education</strong>${esc(item.education)}</div>
            <div class="resume-field"><strong>Skills</strong>${esc(item.skills)}</div>
            <div class="resume-field"><strong>Projects / Experience</strong>${esc(item.experience)}</div>
          </div>`;

      container.appendChild(card);
    });

    list.appendChild(container);
  } catch (err) {
    count.textContent = "Error";
    list.innerHTML = `<div class="empty-state"><p>❌ Cannot reach server.<br>Make sure Node.js is running.</p></div>`;
  }
}

// ── Toggle card expand ──────────────────────────
function toggleCard(header) {
  header.closest(".resume-card").classList.toggle("open");
}

// ── Delete resume ───────────────────────────────
async function deleteResume(id, e) {
  e.stopPropagation();
  if (!confirm("Delete this resume? This cannot be undone.")) return;

  try {
    const res = await fetch("/resumes/" + id, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      showToast("Resume deleted.");
      loadResumes();
    } else {
      showToast("Delete failed.", "error");
    }
  } catch {
    showToast("❌ Server error.", "error");
  }
}

// ── Escape HTML helper ──────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
