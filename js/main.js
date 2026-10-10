const c = window.siteContent;
const app = document.getElementById("app");
const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");

const TABS = [
  { id: "about", label: "关于我" },
  { id: "experience", label: "经历" },
  { id: "projects", label: "作品" },
  { id: "thoughts", label: "笔记" }
];
const DEFAULT_TAB = "experience";

const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

header.innerHTML = `
  <div class="wrap header-inner">
    <a class="brand" href="#${DEFAULT_TAB}" data-tab-link="${DEFAULT_TAB}">${esc(c.hero.name)}</a>
    <nav class="tabs" role="tablist" aria-label="页面导航">
      ${TABS.map((t) => `
        <button class="tab" role="tab" id="tab-${t.id}" data-tab="${t.id}"
          aria-controls="panel-${t.id}" aria-selected="false">${esc(t.label)}</button>`).join("")}
    </nav>
    <button id="theme-toggle" class="icon-btn" aria-label="切换深浅色" aria-pressed="false">
      <svg class="icon-moon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>
    </button>
  </div>`;

const hero = `
  <section class="hero">
    <div>
      <h1>${esc(c.hero.greeting)}</h1>
      <p class="summary">${esc(c.hero.summary)}</p>
      <p class="belief">${esc(c.hero.belief)}</p>
      <div class="actions">
        <button class="action-link" data-copy="wechat">复制微信号</button>
        <button class="action-link" data-copy="email">复制邮箱</button>
      </div>
    </div>
    <div class="hero-photo" id="hero-photo">
      <img src="${esc(c.hero.photo)}" alt="${esc(c.hero.name)}" onerror="this.closest('.hero-photo').classList.add('is-empty')" />
      <div class="photo-hint">把照片放到 ${esc(c.hero.photo)}</div>
    </div>
  </section>`;

app.innerHTML = `
  <section class="panel wrap" id="panel-about" role="tabpanel" aria-labelledby="tab-about" hidden>
    <h2 class="panel-title">关于我</h2>
    <div class="about">
      ${c.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
      <div class="placeholder">${esc(c.about.placeholder)}</div>
    </div>
    <div class="elsewhere">
      ${c.elsewhere.map((e) => `
        <a class="item" href="${esc(e.url)}" target="_blank" rel="noopener">
          <span>${esc(e.title)}</span><span class="desc">${esc(e.description)} →</span>
        </a>`).join("")}
    </div>
  </section>

  <section class="panel wrap" id="panel-experience" role="tabpanel" aria-labelledby="tab-experience" hidden>
    ${hero}
    <div style="height:44px"></div>
    <div class="edu">
      <div class="school">${esc(c.education.school)}</div>
      <div class="degree">${esc(c.education.degree)}</div>
      <div class="honors">${esc(c.education.honors)}</div>
    </div>
    ${c.experiences.map((e) => `
      <article class="exp">
        <div class="date">${esc(e.date)}</div>
        <div class="company">${esc(e.company)} · <span class="role">${esc(e.role)}</span></div>
        <p class="summary">${esc(e.summary)}</p>
        ${e.points && e.points.length ? `<ul class="points">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
      </article>`).join("")}
  </section>

  <section class="panel wrap" id="panel-projects" role="tabpanel" aria-labelledby="tab-projects" hidden>
    <h2 class="panel-title">作品</h2>
    <div class="projects">
      ${c.projects.map((p) => `
        <a class="project" href="${esc(p.url)}">
          <span><span class="title">${esc(p.title)}</span><span class="desc">${esc(p.description)}</span></span>
          <span class="arrow">→</span>
        </a>`).join("")}
    </div>
  </section>

  <section class="panel wrap" id="panel-thoughts" role="tabpanel" aria-labelledby="tab-thoughts" hidden>
    <h2 class="panel-title">笔记</h2>
    <div class="thoughts">
      ${c.thoughts.map((t) => `
        <details class="thought">
          <summary>
            <span class="meta">
              <span class="date">${esc(t.date)}</span>
              <span class="thought-title">${esc(t.title)}</span>
            </span>
            <svg class="chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </summary>
          <div class="thought-body">${esc(t.text)}</div>
        </details>`).join("")}
    </div>
  </section>`;

footer.innerHTML = `
  <div class="wrap footer-inner">
    <p class="slogan">${esc(c.footer.slogan)}</p>
    <nav class="footer-links">
      <a href="mailto:${esc(c.hero.email)}">邮箱</a>
      <a href="${esc(c.hero.github)}" target="_blank" rel="noopener">GitHub</a>
    </nav>
  </div>`;

function setTab(id, updateHash) {
  const tab = TABS.some((t) => t.id === id) ? id : DEFAULT_TAB;
  TABS.forEach((t) => {
    const btn = document.getElementById("tab-" + t.id);
    const panel = document.getElementById("panel-" + t.id);
    const active = t.id === tab;
    btn.setAttribute("aria-selected", active ? "true" : "false");
    if (active) panel.removeAttribute("hidden"); else panel.setAttribute("hidden", "");
  });
  document.title = TABS.find((t) => t.id === tab).label + " · " + c.hero.name;
  if (updateHash) history.replaceState(null, "", "#" + tab);
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-tab]").forEach((btn) => btn.addEventListener("click", () => setTab(btn.dataset.tab, true)));
document.querySelectorAll("[data-tab-link]").forEach((link) => link.addEventListener("click", (e) => { e.preventDefault(); setTab(link.dataset.tabLink, true); }));
window.addEventListener("hashchange", () => setTab(location.hash.replace("#", ""), false));
setTab(location.hash.replace("#", ""), false);

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const kind = btn.dataset.copy;
    const value = kind === "wechat" ? c.hero.wechat : c.hero.email;
    if (!value || value === "TODO") {
      alert(kind === "wechat" ? "请先在 js/data.js 里把 wechat 改成你的微信号" : "邮箱未设置");
      return;
    }
    try { await navigator.clipboard.writeText(value); }
    catch (err) {
      const ta = document.createElement("textarea");
      ta.value = value; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    const original = btn.textContent;
    btn.textContent = "已复制";
    btn.dataset.copied = "true";
    setTimeout(() => { btn.textContent = original; btn.dataset.copied = "false"; }, 1500);
  });
});

const themeBtn = document.getElementById("theme-toggle");
function isDark() { return document.documentElement.getAttribute("data-theme") === "dark"; }
function syncThemeBtn() { themeBtn.setAttribute("aria-pressed", isDark() ? "true" : "false"); }
themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("theme", next);
  syncThemeBtn();
});
syncThemeBtn();
