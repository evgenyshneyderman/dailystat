const LESSONS = {
  20: {
    title: "Law of Total Probability and Expectation",
    subtitle: "Partition the sample space — sum conditional pieces",
    template: "law-total-prob"
  },
  21: {
    title: "Week 3 Recap",
    subtitle: "Random variables, distributions, total expectation",
    template: "recap",
    recapIds: [15, 16, 17, 18, 19, 20]
  },
  22: {
    title: "Multivariate Distributions",
    subtitle: "Joint, marginal, and conditional PMFs",
    template: "joint-pmf"
  },
  23: {
    title: "Point Estimates & Inference Logic",
    subtitle: "Sampling distributions — foundation of inference",
    template: "sampling-means"
  },
  24: {
    title: "Covariance, Correlation & CLT",
    subtitle: "Why sample means become normal",
    template: "clt"
  },
  25: {
    title: "Exponential Distribution",
    subtitle: "Memoryless waiting times",
    template: "exponential"
  },
  26: {
    title: "Confidence Intervals",
    subtitle: "Margin of error and the 95% rule",
    template: "confidence-interval"
  },
  27: {
    title: "Week 4 Recap",
    subtitle: "Multivariate, CLT, inference foundations",
    template: "recap",
    recapIds: [22, 23, 24, 25, 26]
  },
  28: {
    title: "One-Sample Z-Test for Proportions",
    subtitle: "Hypothesis setup for rate metrics",
    template: "proportion-ztest"
  },
  29: {
    title: "Two-Sample Proportion Test",
    subtitle: "Treatment vs control rate comparison",
    template: "two-proportion"
  },
  30: {
    title: "Chi-Square Goodness of Fit",
    subtitle: "Observed vs expected counts",
    template: "chi-square-gof"
  }
};

const MEDIA = {
  lessons: {
    "15": { title: "Random Variables", viz: { url: "/l/15" } },
    "16": { title: "Z-scores & Empirical Rule", viz: { url: "/l/16" } },
    "17": { title: "Binomial Distribution", viz: { url: "/l/17" } },
    "18": { title: "Normal Approx to Binomial", viz: { url: "/l/18" } },
    "19": { title: "Geometric & Poisson", viz: { url: "/l/19" } },
    "20": { title: "Law of Total Probability", youtube: { url: "https://www.youtube.com/watch?v=dFaqy--4-Pk", title: "Stat 110 Lecture 5" }, viz: { url: "/l/20" } },
    "22": { title: "Multivariate Distributions", youtube: { url: "https://www.youtube.com/watch?v=kd3zKHr6Rys", title: "Stat 110 Lecture 20" }, viz: { url: "/l/22" } },
    "23": { title: "Sampling Distributions", youtube: { url: "https://www.youtube.com/watch?v=olK80ngCbXc", title: "Sampling Distribution intro" }, viz: { url: "/l/23" } },
    "24": { title: "CLT", youtube: { url: "https://www.youtube.com/watch?v=YAlJCEDH2uY", title: "StatQuest CLT" }, viz: { url: "/l/24" } },
    "25": { title: "Exponential", youtube: { url: "https://www.youtube.com/watch?v=p3T-_LMrvBc", title: "StatQuest Exponential MLE" }, viz: { url: "/l/25" } },
    "26": { title: "Confidence Intervals", youtube: { url: "https://www.youtube.com/watch?v=TqOeMYtOc1w", title: "StatQuest CI" }, viz: { url: "/l/26" } }
  }
};

(function init() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id") || window.location.pathname.split("/").pop(), 10);
  const lesson = LESSONS[id];

  if (!lesson) {
    document.getElementById("lesson-title").textContent = "Lesson not found";
    return;
  }

  document.title = `Lesson ${id} — ${lesson.title}`;
  document.getElementById("lesson-title").textContent = `Lesson ${id}: ${lesson.title}`;
  document.getElementById("lesson-subtitle").textContent = lesson.subtitle;

  const app = document.getElementById("app");
  BayesViz.destroyCharts();

  if (lesson.template === "recap") {
    BayesViz.renderRecap(app, lesson.recapIds, MEDIA);
  } else {
    const fn = BayesViz.RENDERERS[lesson.template];
    if (fn) fn(app);
  }

  const gloss = BayesViz.GLOSSARIES[id];
  const gEl = document.getElementById("glossary");
  if (gloss && gloss.length) {
    gEl.innerHTML = "<h3>Symbol glossary</h3><dl></dl>";
    const dl = gEl.querySelector("dl");
    for (const [sym, def] of gloss) {
      dl.innerHTML += `<dt>${sym}</dt><dd>${def}</dd>`;
    }
  } else {
    gEl.style.display = "none";
  }
})();
