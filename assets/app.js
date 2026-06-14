(function initLessonPage() {
  const params = new URLSearchParams(window.location.search);
  const pathId = parseInt(window.location.pathname.split("/").filter(Boolean).pop(), 10);
  const id = parseInt(params.get("id") || pathId, 10);
  const lesson = LESSONS[id];

  if (!lesson) {
    document.getElementById("lesson-title").textContent = "Lesson not found";
    document.getElementById("interactive").hidden = true;
    return;
  }

  document.title = `Lesson ${id} — ${lesson.title}`;
  document.getElementById("lesson-title").textContent = `Lesson ${id}: ${lesson.title}`;
  document.getElementById("lesson-subtitle").textContent = lesson.subtitle;

  const meta = [];
  if (lesson.unit) meta.push(lesson.unit);
  if (lesson.source) meta.push(lesson.source);
  if (lesson.readTimeMin) meta.push(`~${lesson.readTimeMin} min read`);
  document.getElementById("lesson-meta").textContent = meta.join(" · ");

  renderCallout("why-it-matters", lesson.whyItMatters);
  renderOverview(lesson.overview);
  renderObjectives(lesson.objectives);

  if (lesson.template === "recap") {
    renderRecapSection(id, lesson);
    document.getElementById("video-section").hidden = true;
  } else {
    renderVideo(lesson.youtube);
  }

  renderExample(lesson.example);
  renderFormulas(lesson.keyFormulas);
  renderTakeaways(lesson.takeaways);
  renderPractice(lesson.practice);
  renderExplore(lesson.exploreDeeper);
  renderExternal(lesson.external);
  renderGlossary(id, lesson.keyFormulas);
  renderNav(id);
  renderInteractive(id, lesson);
})();

function show(id) {
  document.getElementById(id).hidden = false;
}

function renderCallout(id, text) {
  if (!text) return;
  const el = document.getElementById(id);
  el.innerHTML = `<strong>Why it matters</strong><p>${text}</p>`;
  show(id);
}

function renderOverview(paragraphs) {
  if (!paragraphs?.length) return;
  const el = document.getElementById("overview");
  el.innerHTML = `<h2 class="section-heading">Overview</h2>${paragraphs.map(p => `<p>${p}</p>`).join("")}`;
  show("overview");
}

function renderObjectives(items) {
  if (!items?.length) return;
  const el = document.getElementById("objectives");
  el.innerHTML =
    `<h2 class="section-heading">Learning objectives</h2><ul class="objective-list">${items.map(o => `<li>${o}</li>`).join("")}</ul>`;
  show("objectives");
}

function renderVideo(yt) {
  if (!yt?.url) return;
  const vid = youtubeId(yt.url);
  const el = document.getElementById("video-section");
  const meta = [
    yt.channel,
    yt.durationMin ? `~${yt.durationMin} min` : null
  ].filter(Boolean).join(" · ");

  el.innerHTML = `
    <h2 class="section-heading">Video lesson</h2>
    <p class="video-caption"><a href="${yt.url}" rel="noopener noreferrer">${yt.title}</a>${meta ? ` <span class="muted">(${meta})</span>` : ""}</p>
    ${vid ? `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${vid}" title="${escapeAttr(yt.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe></div>` : ""}
    <p><a class="btn" href="${yt.url}" rel="noopener noreferrer">Watch on YouTube ↗</a></p>
  `;
  show("video-section");
}

function renderRecapSection(lessonId, lesson) {
  const el = document.getElementById("recap-section");
  const cards = (lesson.recapIds || []).map(rid => {
    const item = RECAP_ITEMS[rid] || { title: `Lesson ${rid}`, summary: "" };
    const yt = item.youtube || (LESSONS[rid]?.youtube);
    const vid = yt ? youtubeId(yt.url) : null;
    const vizUrl = item.vizUrl || (LESSONS[rid] ? `/l/${rid}` : null);
    const hasPage = Boolean(LESSONS[rid]);

    return `
      <article class="recap-card">
        <header>
          <span class="recap-id">Lesson ${rid}</span>
          <h3>${item.title}</h3>
          ${item.source ? `<p class="recap-source">${item.source}</p>` : ""}
        </header>
        ${item.summary ? `<p>${item.summary}</p>` : ""}
        ${vid ? `<div class="video-embed video-embed--compact"><iframe src="https://www.youtube-nocookie.com/embed/${vid}" title="${escapeAttr(yt.title)}" allowfullscreen loading="lazy"></iframe></div>` : ""}
        <div class="recap-actions">
          ${hasPage ? `<a class="btn" href="/l/${rid}">Full lesson page</a>` : ""}
          ${vizUrl && hasPage ? `<a href="${vizUrl}#interactive">Jump to interactive</a>` : ""}
          ${yt ? `<a href="${yt.url}" rel="noopener noreferrer">Watch video ↗</a>` : ""}
        </div>
      </article>
    `;
  }).join("");

  el.innerHTML = `<h2 class="section-heading">This week's lessons</h2><div class="recap-grid">${cards}</div>`;
  show("recap-section");

  const app = document.getElementById("app");
  app.innerHTML = "";
  BayesViz.destroyCharts();
  const p = BayesViz.panel("Quick review checklist", "After revisiting the lessons above, can you explain each objective in your own words?");
  const ul = document.createElement("ul");
  ul.className = "objective-list";
  for (const o of lesson.objectives || []) {
    const li = document.createElement("li");
    li.textContent = o;
    ul.appendChild(li);
  }
  p.appendChild(ul);
  app.appendChild(p);
}

function renderExample(ex) {
  if (!ex) return;
  const el = document.getElementById("example");
  el.innerHTML = `<h2 class="section-heading">Worked scenario</h2><h3 class="example-title">${ex.title}</h3><p>${ex.body}</p>`;
  show("example");
}

function renderFormulas(formulas) {
  if (!formulas?.length) return;
  const el = document.getElementById("formulas");
  const blocks = formulas.map(f => `<pre class="formula-block">${f.text}</pre>`).join("");
  el.innerHTML = `<h2 class="section-heading">Key formulas</h2>${blocks}`;
  show("formulas");
}

function renderTakeaways(items) {
  if (!items?.length) return;
  const el = document.getElementById("takeaways");
  el.innerHTML = `<h2 class="section-heading">Key takeaways</h2><ul class="takeaway-list">${items.map(t => `<li>${t}</li>`).join("")}</ul>`;
  show("takeaways");
}

function renderPractice(practice) {
  if (!practice) return;
  const el = document.getElementById("practice");
  el.innerHTML = `
    <h2 class="section-heading">Practice problem</h2>
    <p class="practice-prompt">${practice.prompt}</p>
    <details class="practice-hint"><summary>Show hint</summary><p>${practice.hint}</p></details>
  `;
  show("practice");
}

function renderExplore(items) {
  if (!items?.length) return;
  const el = document.getElementById("explore");
  el.innerHTML = `<h2 class="section-heading">Explore deeper</h2><ul class="explore-list">${items.map(q => `<li>${q}</li>`).join("")}</ul>`;
  show("explore");
}

function renderExternal(links) {
  if (!links?.length) return;
  const el = document.getElementById("external");
  el.innerHTML =
    `<h2 class="section-heading">Further reading</h2><ul class="external-list">${links.map(l => `<li><a href="${l.url}" rel="noopener noreferrer">${l.title} ↗</a></li>`).join("")}</ul>`;
  show("external");
}

function renderGlossary(id, formulas) {
  const entries = [];
  if (formulas) {
    for (const f of formulas) {
      if (f.gloss) entries.push(...f.gloss);
    }
  }
  const extra = BayesViz.GLOSSARIES[id];
  if (extra) entries.push(...extra);

  if (!entries.length) return;
  const el = document.getElementById("glossary");
  el.innerHTML = `<h3>Symbol glossary</h3><dl>${entries.map(([sym, def]) => `<dt>${sym}</dt><dd>${def}</dd>`).join("")}</dl>`;
  show("glossary");
}

function renderNav(id) {
  const idx = LESSON_IDS.indexOf(id);
  if (idx < 0) return;
  const prev = idx > 0 ? LESSON_IDS[idx - 1] : null;
  const next = idx < LESSON_IDS.length - 1 ? LESSON_IDS[idx + 1] : null;
  const el = document.getElementById("lesson-nav");
  el.innerHTML = `
    ${prev ? `<a class="nav-prev" href="/l/${prev}">← Lesson ${prev}</a>` : "<span></span>"}
    <a class="nav-home" href="/">All lessons</a>
    ${next ? `<a class="nav-next" href="/l/${next}">Lesson ${next} →</a>` : "<span></span>"}
  `;
  show("lesson-nav");
}

function renderInteractive(id, lesson) {
  if (lesson.template === "recap") return;

  const app = document.getElementById("app");
  BayesViz.destroyCharts();
  const fn = BayesViz.RENDERERS[lesson.template];
  if (fn) fn(app);
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}
