(function () {
  "use strict";

  var c = window.siteContent;
  var header = document.getElementById("site-header");
  var main = document.getElementById("main");
  var footer = document.getElementById("site-footer");
  var toastEl = document.getElementById("toast");

  var TABS = [
    { id: "experience", label: "经历" },
    { id: "projects", label: "作品" },
    { id: "thoughts", label: "笔记" }
  ];
  var DEFAULT_TAB = "experience";
  var ids = TABS.map(function (t) { return t.id; });

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  /* 先转义再包裹，无注入风险：把 +15.06% / -3pp 这类数字高亮 */
  function hi(s) {
    return esc(s).replace(/([+\-−]?\d[\d,.]*\s?(?:%|pp))/g, '<b class="num">$1</b>');
  }

  function isExternal(url) {
    return /^(https?:)?\/\//.test(url) || /^mailto:/.test(url);
  }

  function linkAttrs(url) {
    return 'href="' + esc(url) + '"' + (isExternal(url) ? ' target="_blank" rel="noopener"' : "");
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  var ICON_ARROW_UP_RIGHT =
    '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 17 17 7M9 7h8v8"/></svg>';

  var ICON_ARROW_RIGHT =
    '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var ICON_CHEVRON =
    '<svg class="chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- header ---------- */
  header.innerHTML =
    '<div class="wrap header-inner">' +
      '<a class="brand" href="#' + DEFAULT_TAB + '" data-tab-link="' + DEFAULT_TAB + '">' + esc(c.hero.name) + '</a>' +
      '<nav class="tabs" role="tablist" aria-label="页面导航">' +
        TABS.map(function (t) {
          return '<button class="tab" role="tab" id="tab-' + t.id + '" data-tab="' + t.id + '"' +
            ' aria-controls="panel-' + t.id + '" aria-selected="false" tabindex="-1">' +
            esc(t.label) + '</button>';
        }).join("") +
      '</nav>' +
      '<button id="theme-toggle" class="icon-btn" aria-label="切换深浅色" aria-pressed="false">' +
        '<svg class="icon-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
        '<svg class="icon-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>' +
      '</button>' +
    '</div>';

  /* ---------- 片段构造 ---------- */
  function heroHTML() {
    return '' +
      '<section class="hero">' +
        '<div class="hero-text">' +
          '<h1>' + esc(c.hero.greeting) + '</h1>' +
          '<p class="hero-line">' + esc(c.hero.summary) + '</p>' +
          '<p class="hero-line">' + esc(c.hero.belief) + '</p>' +
          '<div class="hero-actions">' +
            '<button class="pill" data-copy="wechat">复制微信号</button>' +
            '<button class="pill" data-copy="email">复制邮箱</button>' +
          '</div>' +
        '</div>' +
        '<figure class="hero-photo" id="hero-photo">' +
          '<img src="' + esc(c.hero.photo) + '" alt="' + esc(c.hero.name) + '" loading="lazy" decoding="async" />' +
          '<figcaption class="photo-hint">放一张照片到<br />' + esc(c.hero.photo) + '</figcaption>' +
        '</figure>' +
      '</section>';
  }

  function aboutHTML() {
    var a = c.about;
    if (!a) return "";
    return '' +
      '<section class="section">' +
        '<h2 class="section-title">' + esc(a.title) + '</h2>' +
        '<div class="prose">' +
          a.paragraphs.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") +
        '</div>' +
        (a.keywords && a.keywords.length
          ? '<ul class="tags">' + a.keywords.map(function (k) {
              return '<li class="tag">' + esc(k) + '</li>';
            }).join("") + '</ul>'
          : "") +
      '</section>';
  }

  function educationHTML() {
    var e = c.education;
    return '' +
      '<section class="section">' +
        '<h2 class="section-title">' + esc(e.title) + '</h2>' +
        '<div class="edu">' +
          '<h3 class="edu-school">' + esc(e.school) + '</h3>' +
          '<p class="edu-meta">' + esc(e.meta) + '</p>' +
          (e.note ? '<p class="edu-note">' + esc(e.note) + '</p>' : "") +
        '</div>' +
      '</section>';
  }

  function experienceHTML() {
    var x = c.experience;
    return '' +
      '<section class="section">' +
        '<h2 class="section-title">' + esc(x.title) + '</h2>' +
        '<ol class="timeline">' +
          x.items.map(function (item, i) {
            return '<li class="exp">' +
              '<h3 class="exp-head">' +
                '<span class="exp-main">' + esc(item.company) +
                  '<span class="exp-sep">·</span>' +
                  '<span class="exp-role">' + esc(item.role) + '</span>' +
                '</span>' +
                '<span class="exp-date">' + esc(item.date) + '</span>' +
              '</h3>' +
              '<p class="exp-summary">' + hi(item.summary) + '</p>' +
              (item.points && item.points.length
                ? '<ul class="exp-points">' + item.points.map(function (p, pi) {
                    var idx = p.indexOf("：");
                    var no = '<span class="pt-index">' + pad(pi + 1) + '</span>';
                    if (idx > 0) {
                      return '<li><span class="pt-label">' + no + esc(p.slice(0, idx)) + '</span>' +
                        '<span class="pt-text">' + hi(p.slice(idx + 1)) + '</span></li>';
                    }
                    return '<li><span class="pt-label">' + no + '</span><span class="pt-text">' + hi(p) + '</span></li>';
                  }).join("") + '</ul>'
                : "") +
            '</li>';
          }).join("") +
        '</ol>' +
        (x.placeholder ? '<p class="placeholder">' + esc(x.placeholder) + '</p>' : "") +
      '</section>';
  }

  /* 卡片墙：其他作品（海报、实践成果等） */
  function otherProjectsHTML(group) {
    if (!group) return "";
    var items = group.items || [];
    return '' +
      '<section class="section">' +
        '<h2 class="section-title">' + esc(group.title) + '</h2>' +
        (items.length
          ? '<div class="cards">' + items.map(function (it) {
              var inner =
                (it.image ? '<span class="card-cover"><img src="' + esc(it.image) + '" alt="' + esc(it.title) + '" loading="lazy" decoding="async" /></span>' : '') +
                '<span class="card-body">' +
                  '<span class="card-title">' + esc(it.title) + '</span>' +
                  (it.description ? '<span class="card-desc">' + esc(it.description) + '</span>' : '') +
                '</span>';
              return it.url
                ? '<a class="card" ' + linkAttrs(it.url) + '>' + inner + '</a>'
                : '<div class="card">' + inner + '</div>';
            }).join("") + '</div>'
          : (group.placeholder ? '<p class="placeholder">' + esc(group.placeholder) + '</p>' : "")) +
      '</section>';
  }

  /* 左标题 + 右描述的行列表，作品与在别处共用 */
  function rowListHTML(group) {
    return '' +
      '<section class="section">' +
        '<h2 class="section-title">' + esc(group.title) + '</h2>' +
        '<div class="rows">' +
          group.items.map(function (it) {
            return '<a class="row" ' + linkAttrs(it.url) + '>' +
              '<span class="row-title">' + esc(it.title) +
                '<span class="row-badge" aria-hidden="true">' +
                  ICON_ARROW_UP_RIGHT +
                '</span>' +
              '</span>' +
              '<span class="row-desc">' + esc(it.description) + '</span>' +
            '</a>';
          }).join("") +
        '</div>' +
      '</section>';
  }

  function thoughtBody(text) {
    var lines = Array.isArray(text) ? text : [text];
    return lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join("");
  }

  function thoughtsHTML() {
    var t = c.thoughts;
    return '' +
      '<section class="section">' +
        '<h2 class="section-title">' + esc(t.title) + '</h2>' +
        (t.intro ? '<p class="section-intro">' + esc(t.intro) + '</p>' : "") +
        '<div class="thoughts">' +
          t.items.map(function (item) {
            var preview = item.preview || (Array.isArray(item.text) ? item.text[0] : item.text);
            return '<details class="thought">' +
              '<summary>' +
                '<span class="thought-main">' +
                  '<span class="thought-title">' + esc(item.title) + '</span>' +
                  '<span class="thought-preview">' + esc(preview) + '</span>' +
                '</span>' +
                '<span class="thought-meta">' +
                  '<time class="thought-date">' + esc(item.date) + '</time>' +
                  ICON_CHEVRON +
                '</span>' +
              '</summary>' +
              '<div class="thought-body prose">' + thoughtBody(item.text) + '</div>' +
            '</details>';
          }).join("") +
        '</div>' +
      '</section>';
  }

  /* ---------- 面板 ---------- */
  main.innerHTML =
    '<div class="panel wrap" id="panel-experience" role="tabpanel" aria-labelledby="tab-experience" tabindex="-1" hidden>' +
      heroHTML() + educationHTML() + experienceHTML() +
    '</div>' +
    '<div class="panel wrap" id="panel-projects" role="tabpanel" aria-labelledby="tab-projects" tabindex="-1" hidden>' +
      rowListHTML(c.projects) + otherProjectsHTML(c.otherProjects) + rowListHTML(c.elsewhere) +
    '</div>' +
    '<div class="panel wrap" id="panel-thoughts" role="tabpanel" aria-labelledby="tab-thoughts" tabindex="-1" hidden>' +
      thoughtsHTML() +
    '</div>';

  /* ---------- footer ---------- */
  footer.innerHTML =
    '<div class="wrap footer-inner">' +
      '<p class="slogan">' + esc(c.footer.slogan) + '</p>' +
      '<p class="copyright">© ' + esc(c.hero.name) + '</p>' +
    '</div>';

  /* ---------- 照片缺失时的占位 ---------- */
  var photo = document.querySelector("#hero-photo img");
  if (photo) {
    var markEmpty = function () {
      document.getElementById("hero-photo").classList.add("is-empty");
    };
    photo.addEventListener("error", markEmpty);
    if (photo.complete && photo.naturalWidth === 0) markEmpty();
  }

  /* ---------- Tab 切换 ---------- */
  var tabBtns = ids.map(function (id) { return document.getElementById("tab-" + id); });

  function setTab(raw, focusTab) {
    var id = ids.indexOf(raw) > -1 ? raw : DEFAULT_TAB;
    TABS.forEach(function (t, i) {
      var active = t.id === id;
      var panel = document.getElementById("panel-" + t.id);
      tabBtns[i].setAttribute("aria-selected", active ? "true" : "false");
      tabBtns[i].tabIndex = active ? 0 : -1;
      if (active) {
        panel.removeAttribute("hidden");
        panel.classList.remove("is-enter");
        void panel.offsetWidth; /* 重置进场动画 */
        panel.classList.add("is-enter");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
    document.title = TABS[ids.indexOf(id)].label + " · " + c.hero.name;
    if (focusTab) tabBtns[ids.indexOf(id)].focus();
  }

  function go(id) {
    if (location.hash.replace("#", "") === id) setTab(id);
    else location.hash = id; /* 交给 hashchange，保留浏览器前进/后退 */
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () { go(btn.dataset.tab); });
  });
  document.querySelectorAll("[data-tab-link]").forEach(function (link) {
    link.addEventListener("click", function (e) { e.preventDefault(); go(link.dataset.tabLink); });
  });

  document.querySelector(".tabs").addEventListener("keydown", function (e) {
    var step = { ArrowLeft: -1, ArrowRight: 1, Home: "first", End: "last" };
    if (!(e.key in step)) return;
    e.preventDefault();
    var cur = ids.indexOf(document.querySelector('.tab[aria-selected="true"]').dataset.tab);
    var next = step[e.key] === "first" ? 0
      : step[e.key] === "last" ? ids.length - 1
      : (cur + step[e.key] + ids.length) % ids.length;
    location.hash = ids[next];
    setTimeout(function () { setTab(ids[next], true); }, 0);
  });

  window.addEventListener("hashchange", function () { setTab(location.hash.replace("#", "")); });
  setTab(location.hash.replace("#", ""));

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-show"); }, 1800);
  }

  /* ---------- 复制微信号 ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var kind = btn.dataset.copy;
      var value = kind === "wechat" ? c.hero.wechat : c.hero.email;
      var label = kind === "wechat" ? "微信号" : "邮箱";

      if (!value || value === "TODO") {
        toast(label + "还没填，去 js/data.js 里补上");
        return;
      }

      function done() {
        var original = btn.textContent;
        btn.textContent = "已复制";
        btn.dataset.copied = "true";
        toast(label + "已复制：" + value);
        setTimeout(function () {
          btn.textContent = original;
          btn.dataset.copied = "false";
        }, 1600);
      }

      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); }
        catch (err) { toast(label + "：" + value); }
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done, fallback);
      } else {
        fallback();
      }
    });
  });

  /* ---------- 主题 ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  function isDark() { return document.documentElement.getAttribute("data-theme") === "dark"; }
  function syncBtn() {
    themeBtn.setAttribute("aria-pressed", isDark() ? "true" : "false");
    themeBtn.setAttribute("aria-label", isDark() ? "切换到浅色模式" : "切换到深色模式");
  }
  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncBtn();
  });
  syncBtn();

  /* 没手动选过时，跟随系统变化 */
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function onScheme(e) {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (saved) return;
    document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    syncBtn();
  }
  if (mq.addEventListener) mq.addEventListener("change", onScheme);

  /* ---------- 滚动时 header 出分隔线 ---------- */
  function onScroll() { header.classList.toggle("is-stuck", window.scrollY > 4); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();