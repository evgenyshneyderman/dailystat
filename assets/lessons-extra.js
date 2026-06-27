/* Overlay lesson content for pages added after the original 20-30 pilot. */

Object.assign(LESSONS, {
  17: {
    title: "Bernoulli and Binomial Distributions",
    subtitle: "Counting successes in independent yes/no trials",
    unit: "Distributions",
    source: "Stat 110 Lecture 8",
    readTimeMin: 22,
    template: "binomial",
    whyItMatters:
      "Many marketplace and experimentation metrics are success counts: completed trips, accepted dispatches, converted sessions, fraud flags. The binomial distribution is the first model to reach for when the setup is repeated yes/no trials.",
    overview: [
      "A Bernoulli random variable is one yes/no trial: success with probability p, failure with probability 1-p.",
      "A binomial random variable counts successes across n independent Bernoulli trials with the same success probability p.",
      "The interactive lets you move n and p to see how the probability mass shifts, including the expected number of successes."
    ],
    objectives: [
      "Recognize a Bernoulli trial",
      "Use Binomial(n, p) to count successes",
      "Interpret the PMF shape as n and p change",
      "Connect expected successes to n times p"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=J8jNoF-K8E8",
      title: "The Binomial Distribution and Test, Clearly Explained!!!",
      channel: "StatQuest with Josh Starmer",
      durationMin: 15
    },
    example: {
      title: "Worked scenario: checkout conversion",
      body:
        "Suppose 100 independent rider sessions each have a 4% chance of checkout completion. The number of completions is approximately Binomial(n=100, p=0.04), with expected completions n×p = 4."
    },
    keyFormulas: [
      {
        text: "P(X = k) = C(n,k) p^k (1-p)^(n-k)\nE[X] = np",
        gloss: [
          ["n", "number of independent trials"],
          ["p", "success probability per trial"],
          ["k", "number of successes"]
        ]
      }
    ],
    takeaways: [
      "Binomial counts successes in a fixed number of trials",
      "The model assumes independence and stable p",
      "Expected successes are n times p",
      "The distribution shape becomes more concentrated as n grows"
    ],
    practice: {
      prompt:
        "A dispatch has 30% acceptance probability. In 10 independent offers, what is the expected number accepted?",
      hint: "Use E[X] = np."
    },
    exploreDeeper: [
      "What breaks if offers are not independent?",
      "How would heterogeneous rider or driver segments change the model?"
    ]
  },

  18: {
    title: "Normal Approximation to the Binomial",
    subtitle: "When success counts start looking bell-shaped",
    unit: "Distributions",
    source: "OpenIntro Statistics ch.4",
    readTimeMin: 20,
    template: "normal-binomial",
    whyItMatters:
      "Large experiments often involve binomial-like counts, but exact binomial calculations become clunky. The normal approximation explains why z-tests for proportions work.",
    overview: [
      "When n is large and p is not too close to 0 or 1, a binomial distribution can be approximated by a normal curve.",
      "The approximation uses mean np and standard deviation √(np(1-p)).",
      "The interactive overlays a normal curve on top of binomial probabilities so you can see where the approximation is good or shaky."
    ],
    objectives: [
      "Compute the binomial mean and standard deviation",
      "Explain the large-n approximation intuition",
      "Notice failures when p is extreme or n is small",
      "Connect this approximation to proportion tests"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=J8jNoF-K8E8",
      title: "The Binomial Distribution and Test, Clearly Explained!!!",
      channel: "StatQuest with Josh Starmer",
      durationMin: 15
    },
    example: {
      title: "Worked scenario: large conversion count",
      body:
        "If 20,000 sessions convert with probability 4%, the binomial mean is 800 and SD is √(20000×0.04×0.96) ≈ 27.7. Counts near 800 can be reasoned about with a normal curve."
    },
    keyFormulas: [
      {
        text: "X ~ Binomial(n,p)\nX ≈ Normal(np, np(1-p))",
        gloss: [
          ["np", "mean number of successes"],
          ["np(1-p)", "variance of the success count"]
        ]
      }
    ],
    takeaways: [
      "The approximation improves with larger n",
      "It is weaker when p is very small or very large",
      "Normal approximations are the bridge to z-tests",
      "Always sanity-check expected successes and failures"
    ],
    practice: {
      prompt:
        "For n=1,000 and p=0.2, what are the approximate mean and SD of the success count?",
      hint: "Mean np; SD √(np(1-p))."
    },
    exploreDeeper: [
      "Why do many z-tests require enough expected successes and failures?",
      "What does continuity correction try to fix?"
    ]
  },

  19: {
    title: "Geometric, Poisson, Expectation and Variance",
    subtitle: "Waiting for first success and counting rare events",
    unit: "Distributions",
    source: "Stat 110 Lecture 9",
    readTimeMin: 24,
    template: "geometric-poisson",
    whyItMatters:
      "Operational systems often ask either “how long until something happens?” or “how many rare events appear in a window?” Geometric and Poisson models give quick first-pass answers.",
    overview: [
      "The geometric distribution models the number of trials until the first success.",
      "The Poisson distribution models event counts in a fixed interval when events are rare-ish and occur at a roughly stable rate.",
      "The interactive compares both: waiting-time probabilities for geometric and count probabilities for Poisson."
    ],
    objectives: [
      "Distinguish waiting-time and count questions",
      "Use p to reason about geometric waiting",
      "Use lambda to reason about Poisson counts",
      "Interpret expectation as a long-run average"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=oI3hZJqXJuc",
      title: "The Main Ideas behind Probability Distributions",
      channel: "StatQuest with Josh Starmer",
      durationMin: 11
    },
    example: {
      title: "Worked scenario: support incidents",
      body:
        "If a city averages 3 severe support incidents per hour, a Poisson(λ=3) model gives a quick distribution over 0, 1, 2, ... incidents in the next hour. If a driver accepts with probability 0.4 per offer, a geometric model describes the wait until first acceptance."
    },
    keyFormulas: [
      {
        text: "Geometric: P(X=k) = (1-p)^(k-1)p\nPoisson: P(X=k) = e^(-λ) λ^k / k!",
        gloss: [
          ["p", "success probability per trial"],
          ["λ", "expected event count per interval"],
          ["k", "wait length or event count, depending on model"]
        ]
      }
    ],
    takeaways: [
      "Geometric is for waiting until first success",
      "Poisson is for counts in a fixed interval",
      "Expectation summarizes the long-run center",
      "Model choice should match the question, not just the data type"
    ],
    practice: {
      prompt:
        "If an offer has acceptance probability 0.25, what is the expected wait until first acceptance?",
      hint: "For geometric waiting time, E[X] = 1/p."
    },
    exploreDeeper: [
      "When would event clustering break a Poisson model?",
      "How does geometric waiting relate to negative binomial waiting?"
    ]
  },

  31: {
    title: "Bayes' Rule Deep Dive",
    subtitle: "Base rates, false positives, and posterior probability",
    unit: "Probability Foundations",
    source: "Stat 110 Lecture 6",
    readTimeMin: 24,
    template: "bayes-rule",
    whyItMatters:
      "Many production signals are rare-event detectors: fraud flags, safety alerts, anomaly monitors. Bayes' Rule keeps you from confusing “the model flagged it” with “the event is probably real.”",
    overview: [
      "Bayes' Rule flips a conditional probability. You may know P(flag | fraud), but the operational question is usually P(fraud | flag). Those are not interchangeable.",
      "The gap is driven by the <strong>base rate</strong>. If fraud is rare, even a highly sensitive detector can produce a flagged queue dominated by false positives.",
      "The interactive lets you tune prevalence, sensitivity, and false-positive rate, then see how many true positives and false positives land in the review queue."
    ],
    objectives: [
      "Separate prior, likelihood, evidence, and posterior",
      "Explain why low base rates can swamp accurate tests",
      "Compute posterior probability from synthetic counts",
      "Translate Bayes' Rule into review-queue precision"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=HZGCoVF3YvM",
      title: "Bayes theorem, the geometry of changing beliefs",
      channel: "3Blue1Brown",
      durationMin: 15
    },
    example: {
      title: "Worked scenario: fraud review queue",
      body:
        "Imagine 100,000 transactions, fraud prevalence 0.5%, detector sensitivity 90%, and false-positive rate 4%. The detector catches 450 true fraud cases, but also flags 3,980 legitimate transactions. Among flagged transactions, only 450 / 4,430 ≈ <strong>10.2%</strong> are actually fraud."
    },
    keyFormulas: [
      {
        text: "P(A|B) = P(B|A)P(A) / P(B)",
        gloss: [
          ["P(A)", "prior probability of event A"],
          ["P(B|A)", "likelihood of evidence B if A is true"],
          ["P(A|B)", "posterior probability after seeing B"]
        ]
      }
    ],
    takeaways: [
      "Posterior probability depends on both detector quality and event prevalence",
      "False-positive rates compound when the negative class is huge",
      "A flagged queue's precision can be much lower than model sensitivity",
      "Counts often make Bayes' Rule easier to reason about than formulas"
    ],
    practice: {
      prompt:
        "A safety detector has prevalence 1%, sensitivity 80%, and false-positive rate 5%. Out of 10,000 cases, how many flagged cases are true positives?",
      hint: "Compute true positives and false positives first, then divide."
    },
    exploreDeeper: [
      "How would the posterior change if prevalence doubled but model metrics stayed fixed?",
      "Why is precision often the metric leaders care about for alert queues?"
    ]
  },

  32: {
    title: "Negative Binomial Distribution",
    subtitle: "Waiting for the r-th success",
    unit: "Distributions",
    source: "Stat 110 Lecture 9",
    readTimeMin: 22,
    template: "negative-binomial",
    whyItMatters:
      "Planning often asks “how long until enough successes?” rather than “how many successes in this fixed sample?” Negative binomial reasoning is the distribution behind that question.",
    overview: [
      "The binomial distribution fixes the number of trials and counts successes. The negative binomial fixes the number of successes and counts how many trials it takes to reach them.",
      "It is useful for launch readiness, funnel planning, recruiting pipelines, and any process where successes arrive with roughly stable independent probability.",
      "The interactive shows how the probability mass shifts as the target number of successes r and per-trial probability p change."
    ],
    objectives: [
      "Distinguish binomial from negative binomial framing",
      "Explain why the final trial must be a success",
      "Compute P(X = k) for the r-th success landing on trial k",
      "Use the distribution to reason about planning uncertainty"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=JFesFhraX2M",
      title: "Negative Binomial Distribution",
      channel: "jbstatistics",
      durationMin: 10
    },
    example: {
      title: "Worked scenario: activation target",
      body:
        "Suppose eligible users activate with probability p = 0.25. The probability that the 5th activation happens exactly on user 12 is C(11,4)×0.25⁵×0.75⁷ ≈ <strong>4.3%</strong>. Among the first 11 users you need exactly 4 activations, and user 12 must activate."
    },
    keyFormulas: [
      {
        text: "P(X = k) = C(k−1, r−1) pʳ (1−p)ᵏ⁻ʳ",
        gloss: [
          ["X", "trial number where the r-th success occurs"],
          ["r", "target number of successes"],
          ["k", "total trials needed"],
          ["p", "success probability per trial"]
        ]
      }
    ],
    takeaways: [
      "Negative binomial models the waiting time to r successes",
      "The combination term only arranges the first k−1 trials",
      "Expected trials grow when p is lower or r is higher",
      "The distribution is right-skewed for small p"
    ],
    practice: {
      prompt:
        "Driver acceptance probability is 0.4. What is the probability that the 3rd accepted dispatch happens exactly on the 6th offer?",
      hint: "Use C(5,2)×0.4³×0.6³."
    },
    exploreDeeper: [
      "How would over-dispersion or changing p break this model?",
      "When would a Poisson-process model be a better approximation?"
    ]
  },

  33: {
    title: "Week 5 Recap",
    subtitle: "Proportion tests, chi-square, Bayes applications, and waiting for successes",
    unit: "Weekly Recap",
    source: "Lessons 28-32",
    readTimeMin: 20,
    template: "recap",
    recapIds: [28, 29, 30, 31, 32],
    whyItMatters:
      "This week tied inference to decision systems: comparing rates, checking category distributions, interpreting rare-event alerts, and planning how many trials it takes to see enough successes.",
    overview: [
      "The common thread is uncertainty around decisions. A/B tests need proportion tests, operational mix shifts need chi-square checks, alert queues need Bayes, and launch planning often needs waiting-time distributions.",
      "Use this page as a revision hub before moving into t-tests and inference for means."
    ],
    objectives: [
      "Explain when to use one-proportion vs two-proportion tests",
      "Interpret a chi-square goodness-of-fit statistic",
      "Use Bayes' Rule to reason about false positives",
      "Frame negative binomial questions as waiting for r successes"
    ],
    takeaways: [
      "Statistical significance and practical significance are separate judgments",
      "Category-shift tests are about whole distributions, not single bins",
      "Base rates can dominate alert precision",
      "Waiting-time models help turn probabilistic funnels into planning ranges"
    ]
  }
});

Object.assign(RECAP_ITEMS, {
  28: {
    title: "One-Sample Proportion Test",
    summary: "Compare an observed rate with a baseline or threshold.",
    source: "OpenIntro ch.6",
    youtube: {
      url: "https://www.youtube.com/watch?v=vemZtEM63GY",
      title: "StatQuest - p-values",
      durationMin: 11
    },
    vizUrl: "/l/28"
  },
  29: {
    title: "Two-Sample Proportion Test",
    summary: "Compare two rates using a pooled standard error under H0.",
    source: "OpenIntro ch.6",
    youtube: {
      url: "https://www.youtube.com/watch?v=2N-GoGy0ibI",
      title: "Testing Proportions Example",
      durationMin: 7
    },
    vizUrl: "/l/29"
  },
  30: {
    title: "Chi-Square Goodness-of-Fit",
    summary: "Compare observed categorical counts to expected counts.",
    source: "OpenIntro ch.6",
    youtube: {
      url: "https://www.youtube.com/watch?v=jABsbNBPXIk",
      title: "Khan Academy - Chi-square statistic",
      durationMin: 8
    },
    vizUrl: "/l/30"
  },
  31: {
    title: "Bayes' Rule Deep Dive",
    summary: "Base rates explain why accurate detectors can still produce many false positives.",
    source: "Stat 110 Lecture 6",
    youtube: {
      url: "https://www.youtube.com/watch?v=HZGCoVF3YvM",
      title: "3Blue1Brown - Bayes theorem",
      durationMin: 15
    },
    vizUrl: "/l/31"
  },
  32: {
    title: "Negative Binomial Distribution",
    summary: "Model how many trials are needed to reach r successes.",
    source: "Stat 110 Lecture 9",
    youtube: {
      url: "https://www.youtube.com/watch?v=JFesFhraX2M",
      title: "jbstatistics - Negative Binomial Distribution",
      durationMin: 10
    },
    vizUrl: "/l/32"
  }
});

function extraChoose(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let out = 1;
  for (let i = 1; i <= k; i++) out = (out * (n - k + i)) / i;
  return out;
}

function extraFactorial(n) {
  let out = 1;
  for (let i = 2; i <= n; i++) out *= i;
  return out;
}

function extraNormalPDF(x, mu, sigma) {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

function extraSlider(label, min, max, step, value, onInput) {
  const wrap = document.createElement("div");
  wrap.className = "control";
  const lab = document.createElement("label");
  lab.innerHTML = `${label} <output>${value}</output>`;
  const inp = document.createElement("input");
  inp.type = "range";
  inp.min = min;
  inp.max = max;
  inp.step = step;
  inp.value = value;
  inp.addEventListener("input", () => {
    const v = Number.isInteger(step) ? parseInt(inp.value, 10) : parseFloat(inp.value);
    lab.querySelector("output").textContent = v;
    onInput(v);
  });
  wrap.appendChild(lab);
  wrap.appendChild(inp);
  return wrap;
}

BayesViz.RENDERERS["binomial"] = function renderBinomial(root) {
  let n = 20;
  let prob = 0.3;
  const p = BayesViz.panel(
    "Binomial success counts",
    "Move n and p. Each bar is the probability of exactly k successes."
  );
  const controls = document.createElement("div");
  controls.className = "controls";
  const fEl = BayesViz.formula("");
  const canvas = document.createElement("canvas");
  const wrap = document.createElement("div");
  wrap.className = "chart-wrap";
  wrap.appendChild(canvas);
  let chart;

  function redraw() {
    const labels = [];
    const data = [];
    for (let k = 0; k <= n; k++) {
      labels.push(String(k));
      data.push(extraChoose(n, k) * Math.pow(prob, k) * Math.pow(1 - prob, n - k));
    }
    fEl.textContent = `E[X] = np = ${(n * prob).toFixed(2)} successes`;
    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: "bar",
      data: { labels, datasets: [{ data, backgroundColor: "#5b9fd4" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: "Successes k" } },
          y: { title: { display: true, text: "P(X = k)" } }
        }
      }
    });
  }

  controls.appendChild(extraSlider("Trials n", 1, 60, 1, n, v => { n = v; redraw(); }));
  controls.appendChild(extraSlider("Success probability p", 0.01, 0.99, 0.01, prob, v => { prob = v; redraw(); }));
  p.appendChild(controls);
  p.appendChild(fEl);
  p.appendChild(wrap);
  root.appendChild(p);
  redraw();
};

BayesViz.RENDERERS["normal-binomial"] = function renderNormalBinomial(root) {
  let n = 80;
  let prob = 0.25;
  const p = BayesViz.panel(
    "Normal approximation to binomial",
    "Bars show exact binomial probabilities; the line is a normal curve with the same mean and SD."
  );
  const controls = document.createElement("div");
  controls.className = "controls";
  const fEl = BayesViz.formula("");
  const canvas = document.createElement("canvas");
  const wrap = document.createElement("div");
  wrap.className = "chart-wrap";
  wrap.appendChild(canvas);
  let chart;

  function redraw() {
    const mu = n * prob;
    const sigma = Math.sqrt(n * prob * (1 - prob));
    const lo = Math.max(0, Math.floor(mu - 4 * sigma));
    const hi = Math.min(n, Math.ceil(mu + 4 * sigma));
    const labels = [];
    const exact = [];
    const approx = [];
    for (let k = lo; k <= hi; k++) {
      labels.push(String(k));
      exact.push(extraChoose(n, k) * Math.pow(prob, k) * Math.pow(1 - prob, n - k));
      approx.push(extraNormalPDF(k, mu, sigma));
    }
    fEl.textContent = `Mean np = ${mu.toFixed(2)}\nSD sqrt(np(1-p)) = ${sigma.toFixed(2)}`;
    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { type: "bar", label: "Exact binomial", data: exact, backgroundColor: "rgba(91,159,212,0.65)" },
          { type: "line", label: "Normal approximation", data: approx, borderColor: "#e8b86d", backgroundColor: "transparent" }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: "Successes k" } },
          y: { title: { display: true, text: "Probability / density" } }
        }
      }
    });
  }

  controls.appendChild(extraSlider("Trials n", 10, 250, 5, n, v => { n = v; redraw(); }));
  controls.appendChild(extraSlider("Success probability p", 0.02, 0.98, 0.01, prob, v => { prob = v; redraw(); }));
  p.appendChild(controls);
  p.appendChild(fEl);
  p.appendChild(wrap);
  root.appendChild(p);
  redraw();
};

BayesViz.RENDERERS["geometric-poisson"] = function renderGeometricPoisson(root) {
  let prob = 0.25;
  let lambda = 3;
  const p = BayesViz.panel(
    "Waiting vs counting",
    "Geometric models wait until first success; Poisson models event counts in a fixed interval."
  );
  const controls = document.createElement("div");
  controls.className = "controls";
  const fEl = BayesViz.formula("");
  const canvas = document.createElement("canvas");
  const wrap = document.createElement("div");
  wrap.className = "chart-wrap";
  wrap.appendChild(canvas);
  let chart;

  function redraw() {
    const labels = Array.from({ length: 15 }, (_, i) => String(i + 1));
    const geo = labels.map(v => {
      const k = parseInt(v, 10);
      return Math.pow(1 - prob, k - 1) * prob;
    });
    const pois = labels.map(v => {
      const k = parseInt(v, 10) - 1;
      return Math.exp(-lambda) * Math.pow(lambda, k) / extraFactorial(k);
    });
    fEl.textContent = `Geometric E[X] = 1/p = ${(1 / prob).toFixed(2)} trials\nPoisson E[X] = λ = ${lambda.toFixed(2)} events`;
    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Geometric P(wait = k)", data: geo, backgroundColor: "rgba(91,159,212,0.65)" },
          { label: "Poisson P(count = k-1)", data: pois, backgroundColor: "rgba(107,201,168,0.65)" }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: "k" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });
  }

  controls.appendChild(extraSlider("Success probability p", 0.05, 0.8, 0.01, prob, v => { prob = v; redraw(); }));
  controls.appendChild(extraSlider("Poisson rate lambda", 0.2, 10, 0.1, lambda, v => { lambda = v; redraw(); }));
  p.appendChild(controls);
  p.appendChild(fEl);
  p.appendChild(wrap);
  root.appendChild(p);
  redraw();
};

BayesViz.RENDERERS["bayes-rule"] = function renderBayesRule(root) {
  let prevalence = 0.005;
  let sensitivity = 0.9;
  let falsePositive = 0.04;
  const population = 100000;
  const p = BayesViz.panel(
    "Bayes' Rule for rare-event alerts",
    "Tune prevalence and detector quality. Watch the flagged queue's precision move."
  );
  const controls = document.createElement("div");
  controls.className = "controls";
  const stats = document.createElement("div");
  stats.className = "stats-row";
  const fEl = BayesViz.formula("");
  const canvas = document.createElement("canvas");
  const wrap = document.createElement("div");
  wrap.className = "chart-wrap";
  wrap.appendChild(canvas);
  let chart;

  function slider(label, min, max, step, value, onInput) {
    const wrap = document.createElement("div");
    wrap.className = "control";
    const lab = document.createElement("label");
    lab.innerHTML = `${label} <output>${value}</output>`;
    const inp = document.createElement("input");
    inp.type = "range";
    inp.min = min;
    inp.max = max;
    inp.step = step;
    inp.value = value;
    inp.addEventListener("input", () => {
      const v = parseFloat(inp.value);
      lab.querySelector("output").textContent = v;
      onInput(v);
    });
    wrap.appendChild(lab);
    wrap.appendChild(inp);
    return wrap;
  }

  function redraw() {
    const fraud = population * prevalence;
    const legit = population - fraud;
    const tp = fraud * sensitivity;
    const fn = fraud - tp;
    const fp = legit * falsePositive;
    const tn = legit - fp;
    const posterior = tp / (tp + fp);
    fEl.textContent =
      `P(fraud | flag) = true positives / all flagged\n` +
      `                = ${tp.toFixed(0)} / ${(tp + fp).toFixed(0)}\n` +
      `                = ${(posterior * 100).toFixed(1)}%`;
    stats.innerHTML =
      `<div class="stat"><span>True positives</span>${tp.toFixed(0)}</div>` +
      `<div class="stat"><span>False positives</span>${fp.toFixed(0)}</div>` +
      `<div class="stat"><span>Flag precision</span>${(posterior * 100).toFixed(1)}%</div>`;
    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["True positive", "False positive", "False negative", "True negative"],
        datasets: [{
          data: [tp, fp, fn, tn],
          backgroundColor: ["#6bc9a8", "#e8b86d", "#c47ad4", "#3d6f94"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { title: { display: true, text: "Cases per 100,000" } } }
      }
    });
  }

  controls.appendChild(slider("Prevalence", 0.001, 0.05, 0.001, prevalence, v => { prevalence = v; redraw(); }));
  controls.appendChild(slider("Sensitivity", 0.5, 0.99, 0.01, sensitivity, v => { sensitivity = v; redraw(); }));
  controls.appendChild(slider("False-positive rate", 0.001, 0.15, 0.001, falsePositive, v => { falsePositive = v; redraw(); }));
  p.appendChild(controls);
  p.appendChild(fEl);
  p.appendChild(wrap);
  p.appendChild(stats);
  root.appendChild(p);
  redraw();
};

BayesViz.RENDERERS["negative-binomial"] = function renderNegativeBinomial(root) {
  let r = 5;
  let prob = 0.25;
  const p = BayesViz.panel(
    "Waiting for the r-th success",
    "Change r and p. The bars show the chance that the target success lands exactly on trial k."
  );
  const controls = document.createElement("div");
  controls.className = "controls";
  const fEl = BayesViz.formula("");
  const canvas = document.createElement("canvas");
  const wrap = document.createElement("div");
  wrap.className = "chart-wrap";
  wrap.appendChild(canvas);
  let chart;

  function choose(n, k) {
    if (k < 0 || k > n) return 0;
    let num = 1;
    let den = 1;
    for (let i = 1; i <= k; i++) {
      num *= n - (k - i);
      den *= i;
    }
    return num / den;
  }

  function nbPmf(k) {
    return choose(k - 1, r - 1) * Math.pow(prob, r) * Math.pow(1 - prob, k - r);
  }

  function slider(label, min, max, step, value, onInput) {
    const wrap = document.createElement("div");
    wrap.className = "control";
    const lab = document.createElement("label");
    lab.innerHTML = `${label} <output>${value}</output>`;
    const inp = document.createElement("input");
    inp.type = "range";
    inp.min = min;
    inp.max = max;
    inp.step = step;
    inp.value = value;
    inp.addEventListener("input", () => {
      const v = step === 1 ? parseInt(inp.value, 10) : parseFloat(inp.value);
      lab.querySelector("output").textContent = v;
      onInput(v);
    });
    wrap.appendChild(lab);
    wrap.appendChild(inp);
    return wrap;
  }

  function redraw() {
    const labels = [];
    const data = [];
    const maxK = Math.min(40, r + 24);
    for (let k = r; k <= maxK; k++) {
      labels.push(String(k));
      data.push(nbPmf(k));
    }
    fEl.textContent =
      `P(X = k) = C(k-1, r-1) p^r (1-p)^(k-r)\n` +
      `E[X] = r / p = ${(r / prob).toFixed(1)} trials`;
    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "P(X = k)",
          data,
          backgroundColor: "#5b9fd4"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: "Trial k where r-th success occurs" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });
  }

  controls.appendChild(slider("Target successes r", 1, 12, 1, r, v => { r = v; redraw(); }));
  controls.appendChild(slider("Success probability p", 0.05, 0.8, 0.01, prob, v => { prob = v; redraw(); }));
  p.appendChild(controls);
  p.appendChild(fEl);
  p.appendChild(wrap);
  root.appendChild(p);
  redraw();
};
