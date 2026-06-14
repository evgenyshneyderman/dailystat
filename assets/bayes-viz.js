/* Bayes interactive lesson library — vanilla JS + Chart.js */

const BayesViz = (() => {
  const charts = [];

  function destroyCharts() {
    while (charts.length) charts.pop().destroy();
  }

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function slider(label, min, max, step, value, onInput) {
    const wrap = el("div", "control");
    const id = "sl-" + Math.random().toString(36).slice(2, 8);
    const out = el("output", null, String(value));
    const lab = el("label");
    lab.htmlFor = id;
    lab.innerHTML = `${label} <output>${value}</output>`;
    const inp = document.createElement("input");
    inp.type = "range";
    inp.id = id;
    inp.min = min;
    inp.max = max;
    inp.step = step;
    inp.value = value;
    inp.addEventListener("input", () => {
      const v = inp.step.includes(".") ? parseFloat(inp.value) : parseInt(inp.value, 10);
      lab.querySelector("output").textContent = fmt(v);
      onInput(v);
    });
    wrap.appendChild(lab);
    wrap.appendChild(inp);
    return wrap;
  }

  function fmt(x, d = 3) {
    if (Math.abs(x) >= 1000) return x.toFixed(0);
    if (Math.abs(x) >= 10) return x.toFixed(2);
    return x.toFixed(d);
  }

  function makeChart(canvas, cfg) {
    const c = new Chart(canvas, cfg);
    charts.push(c);
    return c;
  }

  function panel(title, hint) {
    const p = el("div", "panel");
    p.appendChild(el("h2", null, title));
    if (hint) p.appendChild(el("p", "hint", hint));
    return p;
  }

  function formula(text) {
    const f = el("div", "formula", text);
    return f;
  }

  // --- math ---
  function factorial(n) {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  function binomPMF(k, n, p) {
    if (k < 0 || k > n) return 0;
    const c = factorial(n) / (factorial(k) * factorial(n - k));
    return c * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  function normalPDF(x, mu, sigma) {
    const z = (x - mu) / sigma;
    return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
  }

  function exponentialPDF(x, lambda) {
    return x < 0 ? 0 : lambda * Math.exp(-lambda * x);
  }

  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function samplePopulation(type, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      if (type === "uniform") out.push(Math.random() * 10);
      else if (type === "exponential") out.push(-Math.log(1 - Math.random()) * 2);
      else if (type === "bimodal") out.push(Math.random() < 0.5 ? 2 + Math.random() * 2 : 8 + Math.random() * 2);
      else out.push(3 + randn() * 1.2);
    }
    return out;
  }

  function histogram(data, bins) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const w = (max - min) / bins || 1;
    const counts = Array(bins).fill(0);
    const labels = [];
    for (let i = 0; i < bins; i++) {
      labels.push(fmt(min + (i + 0.5) * w, 2));
    }
    for (const x of data) {
      let b = Math.floor((x - min) / w);
      if (b >= bins) b = bins - 1;
      if (b < 0) b = 0;
      counts[b]++;
    }
    return { labels, counts };
  }

  function zCritical(conf) {
    if (conf >= 0.99) return 2.576;
    if (conf >= 0.95) return 1.96;
    if (conf >= 0.9) return 1.645;
    return 1.282;
  }

  function normCDF(z) {
    return 0.5 * (1 + erf(z / Math.SQRT2));
  }

  function erf(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  // --- renderers ---

  function renderLawTotalProb(root) {
    let pA1 = 0.4, pA2 = 0.35, pA3 = 0.25;
    let pBgivenA1 = 0.1, pBgivenA2 = 0.5, pBgivenA3 = 0.8;

    const p = panel(
      "Law of total probability",
      "Partition the sample space into A₁, A₂, A₃. Drag sliders — watch P(B) update as the weighted sum of P(B|Aᵢ)·P(Aᵢ)."
    );
    const controls = el("div", "controls");
    const fEl = formula("");
    const stats = el("div", "stats-row");
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    let chart;

    function update() {
      const sumP = pA1 + pA2 + pA3;
      const w1 = pA1 / sumP, w2 = pA2 / sumP, w3 = pA3 / sumP;
      const pB = w1 * pBgivenA1 + w2 * pBgivenA2 + w3 * pBgivenA3;
      fEl.textContent =
        `P(B) = P(B|A₁)P(A₁) + P(B|A₂)P(A₂) + P(B|A₃)P(A₃)\n` +
        `     = ${fmt(pBgivenA1)}×${fmt(w1)} + ${fmt(pBgivenA2)}×${fmt(w2)} + ${fmt(pBgivenA3)}×${fmt(w3)}\n` +
        `     = ${fmt(pB)}`;
      stats.innerHTML =
        `<div class="stat"><span>P(B) = </span>${fmt(pB)}</div>` +
        `<div class="stat"><span>Contribution A₁: </span>${fmt(w1 * pBgivenA1)}</div>` +
        `<div class="stat"><span>Contribution A₂: </span>${fmt(w2 * pBgivenA2)}</div>` +
        `<div class="stat"><span>Contribution A₃: </span>${fmt(w3 * pBgivenA3)}</div>`;
      if (chart) chart.destroy();
      chart = makeChart(canvas, {
        type: "bar",
        data: {
          labels: ["P(B|A₁)·P(A₁)", "P(B|A₂)·P(A₂)", "P(B|A₃)·P(A₃)", "P(B) total"],
          datasets: [{
            data: [w1 * pBgivenA1, w2 * pBgivenA2, w3 * pBgivenA3, pB],
            backgroundColor: ["#5b9fd4", "#6bc9a8", "#e8b86d", "#c47ad4"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 0, max: 1, title: { display: true, text: "Probability" } }
          }
        }
      });
    }

    controls.appendChild(slider("P(A₁)", 0.05, 0.9, 0.05, pA1, v => { pA1 = v; update(); }));
    controls.appendChild(slider("P(B|A₁)", 0, 1, 0.05, pBgivenA1, v => { pBgivenA1 = v; update(); }));
    controls.appendChild(slider("P(B|A₂)", 0, 1, 0.05, pBgivenA2, v => { pBgivenA2 = v; update(); }));
    controls.appendChild(slider("P(B|A₃)", 0, 1, 0.05, pBgivenA3, v => { pBgivenA3 = v; update(); }));
    p.appendChild(controls);
    p.appendChild(fEl);
    p.appendChild(wrap);
    p.appendChild(stats);
    root.appendChild(p);
    update();
  }

  function renderJointPMF(root) {
    let px = 0.6, py = 0.7;
    const joint = [
      [0.12, 0.18, 0.10],
      [0.15, 0.20, 0.10],
      [0.05, 0.07, 0.03]
    ];
    const p = panel(
      "Joint PMF heatmap (discrete X, Y)",
      "Each cell is P(X=i, Y=j). Marginals sum rows/columns. Think: rider type × trip outcome."
    );
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    p.appendChild(wrap);
    root.appendChild(p);

    const flat = joint.flat();
    const max = Math.max(...flat);
    makeChart(canvas, {
      type: "bar",
      data: {
        labels: ["(0,0)", "(0,1)", "(0,2)", "(1,0)", "(1,1)", "(1,2)", "(2,0)", "(2,1)", "(2,2)"],
        datasets: [{
          label: "P(X,Y)",
          data: flat,
          backgroundColor: flat.map(v => `rgba(91, 159, 212, ${0.3 + 0.7 * v / max})`)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 0.25, title: { display: true, text: "Probability" } } }
      }
    });
    root.appendChild(formula(
      "Marginal P(X=1) = 0.15 + 0.20 + 0.10 = 0.45\n" +
      "Conditional P(Y=1 | X=1) = 0.20 / 0.45 ≈ 0.44"
    ));
  }

  function renderSamplingMeans(root) {
    let n = 30, draws = 200;
    const popType = "exponential";
    const p = panel(
      "Sampling distribution of the mean",
      "Draw many samples of size n from a skewed population. Histogram of x̄ approaches normal (CLT preview)."
    );
    const controls = el("div", "controls");
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    const btn = el("button", "btn", "Resample");
    let chart;

    function resample() {
      const means = [];
      for (let i = 0; i < draws; i++) {
        const s = samplePopulation(popType, n);
        means.push(s.reduce((a, b) => a + b, 0) / n);
      }
      const h = histogram(means, 20);
      if (chart) chart.destroy();
      chart = makeChart(canvas, {
        type: "bar",
        data: {
          labels: h.labels,
          datasets: [{ label: "Count", data: h.counts, backgroundColor: "#5b9fd4" }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { title: { display: true, text: "Sample mean x̄" } },
            y: { title: { display: true, text: "Frequency" } }
          }
        }
      });
    }

    controls.appendChild(slider("Sample size n", 2, 80, 1, n, v => { n = v; resample(); }));
    btn.addEventListener("click", resample);
    p.appendChild(controls);
    p.appendChild(btn);
    p.appendChild(wrap);
    root.appendChild(p);
    resample();
  }

  function renderCLT(root) {
    let n = 10, samples = 500;
    let pop = "uniform";
    const p = panel(
      "Central Limit Theorem in action",
      "Population shape (left concept) → distribution of sample means (right). Increase n — watch bell shape emerge."
    );
    const controls = el("div", "controls");
    const sel = el("div", "control");
    sel.innerHTML = `<label>Population shape</label>
      <select id="pop-sel" style="width:100%;padding:0.4rem;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:6px;">
        <option value="uniform">Uniform</option>
        <option value="exponential">Exponential (skewed)</option>
        <option value="bimodal">Bimodal</option>
      </select>`;
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    let chart;

    function redraw() {
      const means = [];
      for (let i = 0; i < samples; i++) {
        const s = samplePopulation(pop, n);
        means.push(s.reduce((a, b) => a + b, 0) / n);
      }
      const h = histogram(means, 24);
      if (chart) chart.destroy();
      chart = makeChart(canvas, {
        type: "line",
        data: {
          labels: h.labels,
          datasets: [{
            label: `Distribution of x̄ (n=${n})`,
            data: h.counts,
            borderColor: "#6bc9a8",
            backgroundColor: "rgba(107, 201, 168, 0.2)",
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: "Sample mean" } },
            y: { title: { display: true, text: "Count" } }
          }
        }
      });
    }

    controls.appendChild(sel);
    controls.appendChild(slider("Sample size n", 1, 50, 1, n, v => { n = v; redraw(); }));
    p.appendChild(controls);
    p.appendChild(wrap);
    root.appendChild(p);
    root.appendChild(formula("SE(x̄) ≈ σ / √n   — spread shrinks as n grows"));
    setTimeout(() => {
      document.getElementById("pop-sel").addEventListener("change", e => {
        pop = e.target.value;
        redraw();
      });
    }, 0);
    redraw();
  }

  function renderExponential(root) {
    let lambda = 0.5;
    const p = panel("Exponential distribution", "λ controls the rate. PDF and survival P(X > t) — memoryless: past wait doesn't change future wait.");
    const controls = el("div", "controls");
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    const fEl = formula("");
    let chart;

    function redraw() {
      const xs = [], pdf = [], surv = [];
      for (let t = 0; t <= 10; t += 0.2) {
        xs.push(fmt(t, 1));
        pdf.push(exponentialPDF(t, lambda));
        surv.push(Math.exp(-lambda * t));
      }
      fEl.textContent =
        `f(t) = λ e^(−λt)   for t ≥ 0\n` +
        `P(X > s+t | X > s) = P(X > t)   (memoryless)\n` +
        `E[X] = 1/λ = ${fmt(1 / lambda, 2)}`;
      if (chart) chart.destroy();
      chart = makeChart(canvas, {
        type: "line",
        data: {
          labels: xs,
          datasets: [
            { label: "PDF f(t)", data: pdf, borderColor: "#5b9fd4", tension: 0.2 },
            { label: "P(X > t)", data: surv, borderColor: "#e8b86d", tension: 0.2 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: "t (time)" } },
            y: { min: 0, max: 1.05, title: { display: true, text: "Density / survival" } }
          }
        }
      });
    }

    controls.appendChild(slider("Rate λ", 0.1, 2, 0.1, lambda, v => { lambda = v; redraw(); }));
    p.appendChild(controls);
    p.appendChild(fEl);
    p.appendChild(wrap);
    root.appendChild(p);
    redraw();
  }

  function renderConfidenceInterval(root) {
    let n = 100, sigma = 2.5, conf = 0.95, xbar = 5.2;
    const p = panel(
      "Confidence interval width",
      "Suppose x̄ = 5.2 from an experiment metric. How does n and confidence level affect margin of error?"
    );
    const controls = el("div", "controls");
    const fEl = formula("");
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    let chart;

    function redraw() {
      const z = zCritical(conf);
      const se = sigma / Math.sqrt(n);
      const me = z * se;
      const lo = xbar - me, hi = xbar + me;
      fEl.textContent =
        `ME = z* · σ/√n = ${fmt(z)} × ${fmt(sigma)} / √${n} = ${fmt(me)}\n` +
        `95% CI ≈ [${fmt(lo)}, ${fmt(hi)}]`;
      const ns = [20, 50, 100, 200, 500, 1000];
      const mes = ns.map(nn => zCritical(conf) * sigma / Math.sqrt(nn));
      if (chart) chart.destroy();
      chart = makeChart(canvas, {
        type: "bar",
        data: {
          labels: ns.map(String),
          datasets: [{ label: "Margin of error", data: mes, backgroundColor: "#5b9fd4" }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { title: { display: true, text: "Sample size n" } },
            y: { title: { display: true, text: "Margin of error" } }
          }
        }
      });
    }

    controls.appendChild(slider("n", 20, 500, 10, n, v => { n = v; redraw(); }));
    controls.appendChild(slider("σ", 0.5, 5, 0.1, sigma, v => { sigma = v; redraw(); }));
    controls.appendChild(slider("Confidence", 0.8, 0.99, 0.01, conf, v => { conf = v; redraw(); }));
    p.appendChild(controls);
    p.appendChild(fEl);
    p.appendChild(wrap);
    root.appendChild(p);
    redraw();
  }

  function renderProportionZTest(root) {
    let p0 = 0.12, phat = 0.146, n = 120000;
    const p = panel(
      "One-sample proportion z-test",
      "Uber-style: completion rate baseline p₀ vs observed p̂. Drag sliders — see z and whether we reject H₀."
    );
    const controls = el("div", "controls");
    const fEl = formula("");
    const stats = el("div", "stats-row");
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    let chart;

    function redraw() {
      const se = Math.sqrt(p0 * (1 - p0) / n);
      const z = (phat - p0) / se;
      const pval = 2 * (1 - normCDF(Math.abs(z)));
      fEl.textContent =
        `z = (p̂ − p₀) / √(p₀(1−p₀)/n)\n` +
        `  = (${fmt(phat, 4)} − ${fmt(p0, 4)}) / ${fmt(se, 6)}\n` +
        `  = ${fmt(z, 3)}`;
      stats.innerHTML =
        `<div class="stat"><span>z = </span>${fmt(z, 3)}</div>` +
        `<div class="stat"><span>two-sided p ≈ </span>${fmt(pval, 4)}</div>` +
        `<div class="stat"><span>Reject H₀ (α=0.05)? </span>${pval < 0.05 ? "Yes" : "No"}</div>`;
      const xs = [], density = [];
      for (let x = -4; x <= 4; x += 0.1) {
        xs.push(fmt(x, 1));
        density.push(normalPDF(x, 0, 1));
      }
      if (chart) chart.destroy();
      chart = makeChart(canvas, {
        type: "line",
        data: {
          labels: xs,
          datasets: [
            { label: "Standard normal", data: density, borderColor: "#5b9fd4", pointRadius: 0 },
            { label: "z obs", data: xs.map((_, i) => Math.abs(parseFloat(xs[i]) - z) < 0.15 ? normalPDF(z, 0, 1) : null), borderColor: "#e8b86d", pointRadius: 6, showLine: false }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { x: { title: { display: true, text: "z" } }, y: { title: { display: true, text: "Density" } } }
        }
      });
    }

    controls.appendChild(slider("p₀ (null)", 0.05, 0.3, 0.01, p0, v => { p0 = v; redraw(); }));
    controls.appendChild(slider("p̂ (observed)", 0.05, 0.3, 0.001, phat, v => { phat = v; redraw(); }));
    controls.appendChild(slider("n", 1000, 200000, 1000, n, v => { n = v; redraw(); }));
    p.appendChild(controls);
    p.appendChild(fEl);
    p.appendChild(stats);
    p.appendChild(wrap);
    root.appendChild(p);
    redraw();
  }

  function renderTwoProportion(root) {
    let p1 = 0.142, p2 = 0.136, n1 = 60000, n2 = 60000;
    const p = panel("Two-sample proportion test", "Compare treatment vs control completion rates. Pooled vs unpooled SE — watch z shift.");
    const controls = el("div", "controls");
    const fEl = formula("");
    const stats = el("div", "stats-row");

    function redraw() {
      const pooled = (p1 * n1 + p2 * n2) / (n1 + n2);
      const se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
      const z = (p1 - p2) / se;
      fEl.textContent =
        `p̂_pool = ${fmt(pooled, 4)}\n` +
        `z = (p̂₁ − p̂₂) / SE_pool = ${fmt(z, 3)}`;
      stats.innerHTML =
        `<div class="stat"><span>Δ = </span>${fmt((p1 - p2) * 100, 2)} pp</div>` +
        `<div class="stat"><span>z = </span>${fmt(z, 3)}</div>`;
    }

    controls.appendChild(slider("p̂₁ treatment", 0.1, 0.2, 0.001, p1, v => { p1 = v; redraw(); }));
    controls.appendChild(slider("p̂₂ control", 0.1, 0.2, 0.001, p2, v => { p2 = v; redraw(); }));
    p.appendChild(controls);
    p.appendChild(fEl);
    p.appendChild(stats);
    root.appendChild(p);
    redraw();
  }

  function renderChiSquare(root) {
    const observed = [42, 38, 55, 30];
    const expected = [40, 40, 40, 40];
    let chart;
    const p = panel(
      "Chi-square goodness of fit",
      "Observed vs expected counts across categories (e.g. trip outcomes by hour). χ² = Σ (O−E)²/E"
    );
    const canvas = document.createElement("canvas");
    const wrap = el("div", "chart-wrap");
    wrap.appendChild(canvas);
    const fEl = formula("");

    function redraw() {
      let chi2 = 0;
      for (let i = 0; i < 4; i++) chi2 += (observed[i] - expected[i]) ** 2 / expected[i];
      fEl.textContent = `χ² = ${fmt(chi2, 2)}   (df = 3)`;
      if (chart) chart.destroy();
      chart = makeChart(canvas, {
        type: "bar",
        data: {
          labels: ["Cat A", "Cat B", "Cat C", "Cat D"],
          datasets: [
            { label: "Observed", data: observed, backgroundColor: "#5b9fd4" },
            { label: "Expected", data: expected, backgroundColor: "#3d6f94" }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { title: { display: true, text: "Count" } } }
        }
      });
    }

    p.appendChild(fEl);
    p.appendChild(wrap);
    root.appendChild(p);
    redraw();
  }

  function renderRecap(root, lessonIds, media) {
    const p = panel("Week recap — revisit this week's media", "Open any lesson's interactive page or watch the curated video again.");
    const ul = el("ul", "recap-list");
    for (const id of lessonIds) {
      const m = media.lessons[String(id)];
      const title = m?.title || `Lesson ${id}`;
      const li = document.createElement("li");
      const parts = [`<strong>Lesson ${id}</strong>`];
      if (m?.viz?.url) parts.push(`<br>🎛 <a href="${m.viz.url}">Interactive</a>`);
      if (m?.youtube?.url) parts.push(` · 📺 <a href="${m.youtube.url}">${m.youtube.title}</a>`);
      li.innerHTML = `<a href="/l/${id}">${parts.join("")}</a>`;
      ul.appendChild(li);
    }
    p.appendChild(ul);
    root.appendChild(p);
  }

  const RENDERERS = {
    "law-total-prob": renderLawTotalProb,
    "joint-pmf": renderJointPMF,
    "sampling-means": renderSamplingMeans,
    "clt": renderCLT,
    "exponential": renderExponential,
    "confidence-interval": renderConfidenceInterval,
    "proportion-ztest": renderProportionZTest,
    "two-proportion": renderTwoProportion,
    "chi-square-gof": renderChiSquare
  };

  const GLOSSARIES = {
    20: [["P(B)", "total probability of event B over partition"], ["P(B|Aᵢ)", "conditional probability of B given partition piece"]],
    24: [["CLT", "sample means tend to normal as n grows"], ["SE", "standard error σ/√n"]],
    26: [["ME", "margin of error z*·SE"], ["CI", "interval that captures true parameter ~95% of repeated samples"]],
    28: [["p₀", "null hypothesized proportion"], ["p̂", "observed sample proportion"]]
  };

  return {
    destroyCharts,
    RENDERERS,
    GLOSSARIES,
    renderRecap,
    panel,
    formula
  };
})();
