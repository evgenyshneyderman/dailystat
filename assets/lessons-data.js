/* Standalone lesson content — lessons 20–30 */

const LESSONS = {
  20: {
    title: "Law of Total Probability and Expectation",
    subtitle: "Partition the sample space — sum conditional pieces",
    unit: "Probability Foundations",
    source: "Stat 110 Lecture 10",
    readTimeMin: 25,
    template: "law-total-prob",
    whyItMatters:
      "Many real-world quantities depend on which subgroup or condition you're in. The law of total probability lets you combine subgroup-level rates into one overall rate by weighting each by how common it is — without double-counting.",
    overview: [
      "Suppose a factory makes light bulbs on three machines, and the chance a bulb is defective depends on which machine made it. You cannot simply average the three defect rates — you must weight each by the share of bulbs that machine produces.",
      "The <strong>law of total probability</strong> says: if A₁, A₂, … partition the sample space (mutually exclusive, exhaustive), then P(B) = Σ P(B|Aᵢ)·P(Aᵢ). Each term is “how likely is this slice?” × “how likely is B within that slice?”",
      "The companion <strong>law of total expectation</strong> does the same for averages: E[X] = Σ E[X|Aᵢ]·P(Aᵢ). This is how you find an overall average when the average differs across subgroups."
    ],
    objectives: [
      "Define a valid partition of the sample space",
      "Compute P(B) by summing weighted conditionals",
      "Interpret each term as a contribution to the total",
      "Apply total expectation to subgroup-weighted averages"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=dFaqy--4-Pk",
      title: "Lecture 5: Law of Total Probability (Stat 110)",
      channel: "Harvard University / Joe Blitzstein",
      durationMin: 50
    },
    example: {
      title: "Worked scenario: factory defect rate",
      body:
        "Three machines produce 40%, 35%, and 25% of a factory's bulbs, with defect rates of 2%, 5%, and 8% respectively. The overall defect probability is 0.02×0.40 + 0.05×0.35 + 0.08×0.25 = <strong>0.0455</strong> (4.55%) — a weighted blend, not the simple average of 2%, 5%, and 8%."
    },
    keyFormulas: [
      {
        text: "P(B) = P(B|A₁)P(A₁) + P(B|A₂)P(A₂) + … + P(B|Aₖ)P(Aₖ)",
        gloss: [
          ["P(B)", "unconditional probability of event B"],
          ["P(B|Aᵢ)", "probability of B given partition piece Aᵢ"],
          ["P(Aᵢ)", "probability (or weight) of partition piece Aᵢ"]
        ]
      }
    ],
    takeaways: [
      "Partitions must be mutually exclusive and cover all outcomes",
      "P(B) is a weighted average of conditional probabilities",
      "The biggest contributors are large slices with high conditional rates",
      "Total expectation extends the same logic to averages"
    ],
    practice: {
      prompt:
        "A survey reaches two regions: Region A (60% of respondents) reports 30% support; Region B (40%) reports 50% support. What is the overall expected support rate?",
      hint: "Treat each region as a partition piece: E = 0.30×0.6 + 0.50×0.4."
    },
    exploreDeeper: [
      "When would you use total expectation instead of a simple weighted average of observed lifts?",
      "How does Simpson's paradox relate to careless aggregation across partitions?"
    ]
  },

  21: {
    title: "Week 3 Recap",
    subtitle: "Random variables, distributions, and total expectation",
    unit: "Weekly Recap",
    source: "Lessons 15–20",
    readTimeMin: 20,
    template: "recap",
    recapIds: [15, 16, 17, 18, 19, 20],
    whyItMatters:
      "Week 3 moved from “events and probabilities” to “numbers we measure” — random variables — and the distributions that describe them. This recap ties those threads before inference in later weeks.",
    overview: [
      "You learned to map outcomes to numbers (<strong>random variables</strong>), standardize and summarize with <strong>z-scores</strong>, count successes with <strong>binomial</strong> models, approximate with the <strong>normal</strong>, model waits and counts with <strong>geometric/Poisson</strong>, and aggregate across segments with <strong>total probability</strong>.",
      "Use this page as a revision hub. Watch the curated videos, revisit interactives where available, and note which topics need another pass before Week 4."
    ],
    objectives: [
      "Recall what a random variable represents in an experiment",
      "Distinguish binomial, geometric, and Poisson use cases",
      "Explain when normal approximation is appropriate",
      "Apply total probability to subgroup-weighted rates"
    ],
    takeaways: [
      "Random variables turn outcomes into measurable KPIs",
      "Distribution choice depends on the data-generating process",
      "Normal models are ubiquitous but not universal",
      "Partitioning before aggregating prevents misleading overall numbers"
    ]
  },

  22: {
    title: "Multivariate Distributions",
    subtitle: "Joint, marginal, and conditional PMFs",
    unit: "Probability Foundations",
    source: "Stat 110 Lecture 11",
    readTimeMin: 30,
    template: "joint-pmf",
    whyItMatters:
      "Real data often involves two variables measured together — height and weight, study time and exam score, ad spend and clicks. Working with joint, marginal, and conditional distributions lets you go beyond one-variable-at-a-time summaries.",
    overview: [
      "So far variables were studied one at a time. In practice <strong>X</strong> and <strong>Y</strong> are often measured together: a customer's age and whether they purchased, hours studied and exam outcome, temperature and ice-cream sales.",
      "The <strong>joint PMF</strong> P(X=x, Y=y) assigns probability to each pair. <strong>Marginals</strong> sum out the other variable; <strong>conditionals</strong> restrict to one slice and renormalize.",
      "Independence means the joint factors: P(X,Y) = P(X)·P(Y). Dependence — the usual case with real data — requires explicit conditioning."
    ],
    objectives: [
      "Read a joint PMF table or heatmap",
      "Compute marginals by summing rows or columns",
      "Compute conditionals P(Y|X) by dividing joint by marginal",
      "Judge whether two metrics appear independent"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=kd3zKHr6Rys",
      title: "Lecture 20: Multivariate Distributions (Stat 110)",
      channel: "Harvard University / Joe Blitzstein",
      durationMin: 52
    },
    external: [
      {
        title: "Seeing Theory — Joint Distributions (interactive)",
        url: "https://seeing-theory.brown.edu/basic-probability/chapter-4/"
      }
    ],
    example: {
      title: "Worked scenario: customer segment × purchase",
      body:
        "Joint probabilities might show that loyal customers buy more often <em>and</em> make up a larger share of visits. The marginal purchase rate blends both effects. The key question is: is the purchase rate higher <em>because of</em> customer type, or because loyal customers dominate the mix? Conditionals separate those stories."
    },
    keyFormulas: [
      {
        text: "P(X=x) = Σ_y P(X=x, Y=y)\nP(Y=y|X=x) = P(X=x, Y=y) / P(X=x)",
        gloss: [
          ["P(X=x, Y=y)", "joint probability of the pair"],
          ["P(X=x)", "marginal probability for X"],
          ["P(Y=y|X=x)", "conditional probability of Y given X"]
        ]
      }
    ],
    takeaways: [
      "Joint distributions encode how two metrics co-occur",
      "Marginals answer “how common is X?” ignoring Y",
      "Conditionals answer “given X, what happens to Y?”",
      "Confusing joint and conditional rates is a common review-meeting mistake"
    ],
    practice: {
      prompt:
        "In a 2×2 joint table, P(loyal customer, purchase) = 0.28 and P(loyal customer) = 0.40. What is P(purchase | loyal customer)?",
      hint: "Divide the joint cell by the marginal for the row/column you condition on."
    },
    exploreDeeper: [
      "How would you test independence from a contingency table?",
      "When do you need a joint model vs. separate models per segment?"
    ]
  },

  23: {
    title: "Point Estimates & Inference Logic",
    subtitle: "Sampling distributions — foundation of inference",
    unit: "Foundations for Inference",
    source: "OpenIntro Statistics ch.5",
    readTimeMin: 22,
    template: "sampling-means",
    whyItMatters:
      "Every experiment report shows a point estimate — observed lift, sample mean, conversion rate. The hard question is: if we reran the experiment, how much would that number bounce? The sampling distribution answers that.",
    overview: [
      "A <strong>point estimate</strong> is your best single-number guess for a population parameter (μ, p, treatment effect) from one sample.",
      "Repeat the sampling procedure many times — hypothetically or by simulation — and you get a distribution of estimates. That is the <strong>sampling distribution</strong>. Its spread is the uncertainty behind your one observed number.",
      "This lesson builds intuition before formal confidence intervals and tests. Watch how the histogram of sample means changes shape as n grows — a preview of the Central Limit Theorem."
    ],
    objectives: [
      "Distinguish population, sample, and sampling distribution",
      "Explain why a single sample gives one estimate but inference needs a distribution",
      "Simulate repeated samples and histogram their means",
      "Connect spread of sample means to future standard error formulas"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=olK80ngCbXc",
      title: "What is a Sampling Distribution?",
      channel: "Mike Marin",
      durationMin: 12
    },
    example: {
      title: "Worked scenario: repeated polls",
      body:
        "Suppose you could rerun the same opinion poll many times (same size, fresh random sample). Each poll yields a slightly different estimated support percentage. The collection of those estimates is the sampling distribution — a wide spread means your single poll result is noisy."
    },
    takeaways: [
      "One sample → one estimate; inference needs the distribution of estimates",
      "Sampling distributions formalize “what if we tried again?”",
      "Larger samples typically tighten the sampling distribution",
      "Skewed populations can still produce nearly normal sample means when n is large"
    ],
    practice: {
      prompt:
        "You observe x̄ = 4.2 minutes average wait from a sample of n = 50 customers. Why is reporting only 4.2 insufficient on its own?",
      hint: "What distribution would x̄ have if you resampled 50 customers many times?"
    },
    exploreDeeper: [
      "How does bootstrap resampling approximate a sampling distribution without formulas?",
      "When is the sample median's sampling distribution harder to work with than the mean's?"
    ]
  },

  24: {
    title: "Covariance, Correlation & CLT",
    subtitle: "Why sample means become normal",
    unit: "Probability Foundations",
    source: "Stat 110 Lecture 12",
    readTimeMin: 28,
    template: "clt",
    whyItMatters:
      "The CLT justifies the normal-based confidence intervals and z-tests used throughout statistics, even when the underlying data isn't normal. Correlation and covariance describe how two variables move together.",
    overview: [
      "<strong>Covariance</strong> measures how two variables co-move (positive: tend to rise together). <strong>Correlation</strong> rescales covariance to [−1, 1] for interpretability.",
      "The <strong>Central Limit Theorem</strong> states: for large n, the distribution of the sample mean x̄ is approximately normal, even when the population is skewed or bimodal — provided variances are finite and observations are suitably independent.",
      "That is why z-scores and normal tables appear everywhere in inference: not because the raw data is normal, but because <em>averages of many observations</em> are nearly normal."
    ],
    objectives: [
      "Interpret covariance and correlation signs and magnitude",
      "State the CLT in plain language for sample means",
      "Demonstrate with simulation that population shape ≠ sampling distribution shape",
      "Explain when CLT-based approximations may fail (small n, heavy tails, dependence)"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=YAlJCEDH2uY",
      title: "The Central Limit Theorem, Clearly Explained!!!",
      channel: "StatQuest with Josh Starmer",
      durationMin: 8
    },
    external: [
      {
        title: "StatQuest — Covariance (leads into correlation)",
        url: "https://www.youtube.com/watch?v=qtaqvPAeEJY"
      }
    ],
    example: {
      title: "Worked scenario: skewed data, normal averages",
      body:
        "Individual household incomes are heavily right-skewed (a long tail of high earners). Yet the average income across a random sample of 200 households is much closer to bell-shaped. Normal-based formulas target that average, not the skewed individual values."
    },
    keyFormulas: [
      {
        text: "SE(x̄) = σ / √n\nCorr(X,Y) = Cov(X,Y) / (σ_X · σ_Y)",
        gloss: [
          ["SE(x̄)", "standard error of the sample mean"],
          ["σ", "population standard deviation"],
          ["n", "sample size"],
          ["Cov(X,Y)", "average co-movement of X and Y"]
        ]
      }
    ],
    takeaways: [
      "Correlation measures linear association on a standardized scale",
      "CLT applies to sample means (and sums), not necessarily the raw data",
      "Larger n → tighter, more normal sampling distribution of x̄",
      "Dependence between observations can break the independence assumption"
    ],
    practice: {
      prompt:
        "A measurement has σ = 3. For a sample of n = 100, what is SE(x̄)? If n increases to 400, by what factor does SE shrink?",
      hint: "SE is proportional to 1/√n."
    },
    exploreDeeper: [
      "When would you prefer a t-distribution over normal for means?",
      "Why does correlation not imply causation?"
    ]
  },

  25: {
    title: "Exponential Distribution",
    subtitle: "Memoryless waiting times",
    unit: "Distributions",
    source: "Stat 110 Lecture 9 (bonus)",
    readTimeMin: 20,
    template: "exponential",
    whyItMatters:
      "Wait times — until the next bus arrives, until a call center answers, until a machine fails — often follow exponential or related models. The memoryless property changes how you forecast the remaining wait given the time already elapsed.",
    overview: [
      "The <strong>exponential distribution</strong> models continuous waiting time until an event (rate λ). PDF: f(t) = λe^(−λt) for t ≥ 0.",
      "It is <strong>memoryless</strong>: P(T > s+t | T > s) = P(T > t). The remaining wait does not depend on how long you've already waited — a strong assumption that is sometimes useful, sometimes wrong.",
      "Expectation E[T] = 1/λ. Here λ is the rate at which events arrive per unit time."
    ],
    objectives: [
      "Recognize exponential waiting-time scenarios",
      "Use λ to compute mean wait and tail probabilities",
      "Explain the memoryless property and its limitations",
      "Connect exponential models to MLE intuition for rate parameters"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=p3T-_LMrvBc",
      title: "Maximum Likelihood for the Exponential Distribution",
      channel: "StatQuest with Josh Starmer",
      durationMin: 10
    },
    external: [
      {
        title: "Probability Course — Exponential & memoryless property",
        url: "https://probabilitycourse.com/chapter4/4_2_2_exponential.php"
      }
    ],
    example: {
      title: "Worked scenario: waiting for a bus",
      body:
        "If buses arrive at rate λ = 0.4 per minute (mean wait 2.5 min), then P(wait > 5 min) = e^(−λ·5) ≈ 0.14. Memorylessness would claim that even after already waiting 3 minutes, the chance of waiting another 5 is still e^(−2) — in reality, scheduled arrivals often violate this."
    },
    takeaways: [
      "Exponential models single-event waits with constant hazard rate",
      "Mean wait is the reciprocal of the rate",
      "Memorylessness is mathematically convenient but often violated in practice",
      "MLE for λ with complete data is 1/sample mean"
    ],
    practice: {
      prompt:
        "The average time between customer arrivals is 90 seconds. Assuming exponential, what is λ (per minute)? What is P(wait > 3 minutes)?",
      hint: "λ = 1/mean; use P(T>t) = e^(−λt)."
    },
    exploreDeeper: [
      "When would a Weibull or log-normal be more appropriate than exponential?",
      "How does censoring affect MLE for wait-time data?"
    ]
  },

  26: {
    title: "Confidence Intervals",
    subtitle: "Margin of error and the 95% rule",
    unit: "Foundations for Inference",
    source: "OpenIntro Statistics ch.5",
    readTimeMin: 24,
    template: "confidence-interval",
    whyItMatters:
      "Estimates should always come with a measure of uncertainty. A 95% confidence interval is the standard way to express the range of parameter values compatible with your data — and a frequently misunderstood one.",
    overview: [
      "A <strong>confidence interval</strong> is a random interval computed from sample data. A 95% CI procedure captures the true parameter in ~95% of repeated experiments (not “95% probability the truth is inside this specific interval”).",
      "For proportions: p̂ ± z*·SE, where SE = √(p̂(1−p̂)/n). For means with known σ: x̄ ± z*·σ/√n.",
      "The <strong>margin of error</strong> is half the width: z*·SE. It shrinks with larger n and with lower confidence levels."
    ],
    objectives: [
      "Construct a CI for a proportion or mean using normal critical values",
      "Interpret confidence level as long-run coverage, not single-interval probability",
      "Relate margin of error to sample size and confidence level",
      "Read an interactive CI and explain what changes when n or confidence changes"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=TqOeMYtOc1w",
      title: "Confidence Intervals, Clearly Explained!!!",
      channel: "StatQuest with Josh Starmer",
      durationMin: 7
    },
    example: {
      title: "Worked scenario: a poll result",
      body:
        "A poll finds p̂ = 0.42 support with n = 1,000. SE ≈ √(0.42×0.58/1000) ≈ 0.0156. A 95% CI uses z* ≈ 1.96: 0.42 ± 0.031 → [0.389, 0.451]. We can say the true support rate is plausibly in that band under the model assumptions."
    },
    keyFormulas: [
      {
        text: "CI for p:  p̂ ± z* · √(p̂(1−p̂)/n)\nME = z* · SE",
        gloss: [
          ["p̂", "observed sample proportion"],
          ["z*", "critical value for chosen confidence level"],
          ["ME", "margin of error (half-width)"],
          ["n", "sample size"]
        ]
      }
    ],
    takeaways: [
      "Wider CI = more uncertainty or higher confidence demanded",
      "n quadruples → ME halves (for proportions, roughly)",
      "CI answers compatibility; hypothesis tests answer a specific yes/no",
      "Misinterpreting “95% CI” as Bayesian probability is a common stakeholder error"
    ],
    practice: {
      prompt:
        "p̂ = 0.10, n = 10,000. Compute approximate 95% CI. If n drops to 2,500, how does ME change?",
      hint: "SE scales with 1/√n."
    },
    exploreDeeper: [
      "When do you switch from z to t for mean CIs?",
      "How do clustered or dependent data inflate SE beyond the formula?"
    ]
  },

  27: {
    title: "Week 4 Recap",
    subtitle: "Multivariate, CLT, and inference foundations",
    unit: "Weekly Recap",
    source: "Lessons 22–26",
    readTimeMin: 25,
    template: "recap",
    recapIds: [22, 23, 24, 25, 26],
    whyItMatters:
      "Week 4 bridged probability modeling to statistical inference: joint distributions, sampling uncertainty, the CLT, waiting-time models, and confidence intervals. These tools underpin nearly every statistical analysis you'll do.",
    overview: [
      "You can now read <strong>joint distributions</strong>, simulate <strong>sampling distributions</strong>, explain why <strong>CLT</strong> enables normal approximations, model <strong>exponential waits</strong>, and build <strong>confidence intervals</strong> for rates and means.",
      "Each lesson below includes an embedded video and a link to the interactive page. Work through any topic that still feels shaky before moving to hypothesis tests."
    ],
    objectives: [
      "Summarize the inference pipeline: estimate → sampling distribution → CI",
      "Connect CLT to standard errors used in intervals",
      "Differentiate marginal, joint, and conditional stories",
      "Articulate assumptions behind normal-based CIs"
    ],
    takeaways: [
      "Inference is about distributions of estimators, not single samples",
      "CLT and large n justify many standard methods",
      "Exponential/memoryless is a modeling choice — validate it",
      "Confidence intervals communicate uncertainty to stakeholders"
    ]
  },

  28: {
    title: "One-Sample Z-Test for Proportions",
    subtitle: "Hypothesis setup for rate metrics",
    unit: "Inference for Proportions",
    source: "OpenIntro Statistics ch.6",
    readTimeMin: 26,
    template: "proportion-ztest",
    whyItMatters:
      "Many decisions hinge on “is this rate different from a known baseline?” The one-sample z-test formalizes that question with null/alternative hypotheses, a test statistic, and a p-value.",
    overview: [
      "Setup: H₀: p = p₀ (status quo rate) vs Hₐ: p ≠ p₀ (or one-sided). Use the sample proportion p̂ and SE under H₀: √(p₀(1−p₀)/n).",
      "Test statistic: z = (p̂ − p₀) / SE. Large |z| means the observed rate is far from what H₀ predicts.",
      "The <strong>p-value</strong> is the probability, if H₀ were true, of seeing data at least as extreme as what you observed. Small p → evidence against H₀ (not “probability H₀ is false”)."
    ],
    objectives: [
      "State null and alternative hypotheses for a proportion",
      "Compute z and two-sided p-value for large samples",
      "Connect p-value to the standard normal tail",
      "Distinguish statistical significance from practical importance"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=vemZtEM63GY",
      title: "p-values: What they are and how to interpret them",
      channel: "StatQuest with Josh Starmer",
      durationMin: 11
    },
    example: {
      title: "Worked scenario: vs a known baseline",
      body:
        "A manufacturer's historical defect rate is p₀ = 5%. A new process yields p̂ = 4.2% on a sample of n = 1,000 units. Is the improvement real? The z-test quantifies how surprising 4.2% would be if the true rate were still 5%."
    },
    keyFormulas: [
      {
        text: "z = (p̂ − p₀) / √(p₀(1−p₀)/n)",
        gloss: [
          ["p₀", "null hypothesized proportion"],
          ["p̂", "observed sample proportion"],
          ["n", "sample size"]
        ]
      }
    ],
    takeaways: [
      "Use p₀ in the SE when testing against a specified baseline",
      "Large n makes small practical differences statistically significant",
      "Always pair p-values with effect size (pp lift) and CI",
      "p-values do not measure P(H₀ true | data)"
    ],
    practice: {
      prompt:
        "p₀ = 0.05, p̂ = 0.042, n = 1,000. Compute z (approx). Is |z| > 1.96?",
      hint: "SE = √(p₀(1−p₀)/n)."
    },
    exploreDeeper: [
      "When would you use a binomial exact test instead of z?",
      "How do multiple testing and peeking invalidate naive p-values?"
    ]
  },

  29: {
    title: "Two-Sample Proportion Test",
    subtitle: "Treatment vs control rate comparison",
    unit: "Inference for Proportions",
    source: "OpenIntro Statistics ch.6",
    readTimeMin: 24,
    template: "two-proportion",
    whyItMatters:
      "A/B tests compare two proportions — conversion of version A vs B, or success rates of two treatments. The two-sample z-test (pooled or unpooled) is the canonical analysis.",
    overview: [
      "Compare p̂₁ (treatment) and p̂₂ (control). Null: p₁ = p₂. Alternative: p₁ ≠ p₂ or one-sided.",
      "Under H₀, pool estimates: p̂_pool = (x₁+x₂)/(n₁+n₂). Pooled SE: √(p̂_pool(1−p̂_pool)(1/n₁ + 1/n₂)).",
      "z = (p̂₁ − p̂₂) / SE_pool. Unpooled SE is used for confidence intervals on the difference, not always for the pooled test."
    ],
    objectives: [
      "Set up hypotheses for two-arm rate experiments",
      "Compute pooled z for large samples",
      "Interpret difference in percentage points vs relative lift",
      "Know when pooling is controversial (very different p̂)"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=2N-GoGy0ibI",
      title: "Make Testing Proportions Easy With This Example!",
      channel: "zedstatistics",
      durationMin: 7
    },
    example: {
      title: "Worked scenario: website A/B test",
      body:
        "Version A: p̂₁ = 16% on n₁ = 2,000 visitors; Version B: p̂₂ = 12% on n₂ = 2,000. Difference = 4 pp. The test asks whether that gap is larger than random assignment noise would typically produce."
    },
    keyFormulas: [
      {
        text: "p̂_pool = (n₁p̂₁ + n₂p̂₂) / (n₁ + n₂)\nz = (p̂₁ − p̂₂) / SE_pool",
        gloss: [
          ["p̂_pool", "pooled proportion under H₀: p₁ = p₂"],
          ["SE_pool", "standard error using pooled proportion"]
        ]
      }
    ],
    takeaways: [
      "Report absolute pp difference alongside relative % lift",
      "Pooling assumes equal true rates under H₀",
      "Balance (n₁ ≈ n₂) maximizes power for a fixed total sample size",
      "CI for p₁−p₂ may use unpooled SE — test and interval need not match formulas"
    ],
    practice: {
      prompt:
        "p̂₁ = 0.15, p̂₂ = 0.12, n₁ = n₂ = 5,000. Compute p̂_pool and approximate SE_pool.",
      hint: "p̂_pool is the overall success rate across both arms."
    },
    exploreDeeper: [
      "How does blocking or variance reduction lower the effective SE?",
      "When do you need randomization inference instead of a z-test?"
    ]
  },

  30: {
    title: "Chi-Square Goodness of Fit",
    subtitle: "Observed vs expected counts",
    unit: "Inference for Proportions",
    source: "OpenIntro Statistics ch.6",
    readTimeMin: 22,
    template: "chi-square-gof",
    whyItMatters:
      "Not every question is about a single proportion. Goodness-of-fit tests ask whether an entire distribution of counts across categories matches a claimed model. Chi-square is the standard tool.",
    overview: [
      "Given observed counts Oᵢ and expected Eᵢ under a model, χ² = Σ (Oᵢ − Eᵢ)² / Eᵢ.",
      "Large χ² means observed counts deviate from expected more than noise alone would suggest.",
      "Degrees of freedom depend on categories minus estimated parameters. Compare χ² to a chi-square distribution (or use p-value from software)."
    ],
    objectives: [
      "Compute χ² statistic for a multi-category table",
      "Interpret expected counts under a null model",
      "Recognize goodness-of-fit vs independence test contexts",
      "Check that expected counts are large enough for asymptotic validity"
    ],
    youtube: {
      url: "https://www.youtube.com/watch?v=jABsbNBPXIk",
      title: "Chi-square statistic for hypothesis testing",
      channel: "Khan Academy",
      durationMin: 8
    },
    example: {
      title: "Worked scenario: visits by weekday",
      body:
        "If store visits were spread evenly across four weekday categories, each would expect 25% of visits. Observed counts might spike on certain days. χ² measures how far the four observed counts are from the uniform expected counts."
    },
    keyFormulas: [
      {
        text: "χ² = Σᵢ (Oᵢ − Eᵢ)² / Eᵢ",
        gloss: [
          ["Oᵢ", "observed count in category i"],
          ["Eᵢ", "expected count under null model"],
          ["χ²", "goodness-of-fit test statistic"]
        ]
      }
    ],
    takeaways: [
      "χ² compares entire distributions, not just one rate",
      "Expected counts must be reasonably large (rule of thumb: Eᵢ ≥ 5)",
      "Rejecting GOF means the simple model doesn't fit — not which category differs",
      "Follow-up tests or decomposition localize deviations"
    ],
    practice: {
      prompt:
        "Four categories with expected 100 each. Observed: 120, 95, 88, 97. Compute χ².",
      hint: "Sum (O−E)²/E across categories."
    },
    exploreDeeper: [
      "How does the chi-square test of independence differ from GOF?",
      "When would you use a multinomial or Poisson regression instead?"
    ]
  }
};

/* Recap sub-lesson blurbs (may lack on-site interactives) */
const RECAP_ITEMS = {
  15: {
    title: "Random Variables",
    summary: "Map stochastic outcomes to numeric KPIs you can average, compare, and model.",
    source: "Stat 110 Lecture 7"
  },
  16: {
    title: "Z-scores & Empirical Rule",
    summary: "Standardize normal data; 68–95–99.7% rule for quick sanity checks.",
    source: "OpenIntro ch.4"
  },
  17: {
    title: "Binomial Distribution",
    summary: "Count successes in n independent trials with fixed success probability.",
    source: "Stat 110 Lecture 8"
  },
  18: {
    title: "Normal Approximation to Binomial",
    summary: "When n is large, binomial counts are approximately normal.",
    source: "OpenIntro ch.4"
  },
  19: {
    title: "Geometric & Poisson",
    summary: "Model waits until first success and event counts in fixed intervals.",
    source: "Stat 110 Lecture 9"
  },
  20: {
    title: "Law of Total Probability",
    summary: "Aggregate conditional rates across a partition of the sample space.",
    source: "Stat 110 Lecture 10",
    youtube: {
      url: "https://www.youtube.com/watch?v=dFaqy--4-Pk",
      title: "Stat 110 — Law of Total Probability",
      durationMin: 50
    },
    vizUrl: "/l/20"
  },
  22: {
    title: "Multivariate Distributions",
    summary: "Joint, marginal, and conditional PMFs for paired metrics.",
    source: "Stat 110 Lecture 11",
    youtube: {
      url: "https://www.youtube.com/watch?v=kd3zKHr6Rys",
      title: "Stat 110 — Multivariate Distributions",
      durationMin: 52
    },
    vizUrl: "/l/22"
  },
  23: {
    title: "Sampling Distributions",
    summary: "Distribution of an estimator if you repeated the study many times.",
    source: "OpenIntro ch.5",
    youtube: {
      url: "https://www.youtube.com/watch?v=olK80ngCbXc",
      title: "What is a Sampling Distribution?",
      durationMin: 12
    },
    vizUrl: "/l/23"
  },
  24: {
    title: "CLT & Correlation",
    summary: "Sample means tend normal; correlation measures linear co-movement.",
    source: "Stat 110 Lecture 12",
    youtube: {
      url: "https://www.youtube.com/watch?v=YAlJCEDH2uY",
      title: "StatQuest — CLT",
      durationMin: 8
    },
    vizUrl: "/l/24"
  },
  25: {
    title: "Exponential Distribution",
    summary: "Memoryless waiting times with constant hazard rate λ.",
    source: "Stat 110 Lecture 9",
    youtube: {
      url: "https://www.youtube.com/watch?v=p3T-_LMrvBc",
      title: "StatQuest — Exponential MLE",
      durationMin: 10
    },
    vizUrl: "/l/25"
  },
  26: {
    title: "Confidence Intervals",
    summary: "Range of parameter values compatible with your sample.",
    source: "OpenIntro ch.5",
    youtube: {
      url: "https://www.youtube.com/watch?v=TqOeMYtOc1w",
      title: "StatQuest — Confidence Intervals",
      durationMin: 7
    },
    vizUrl: "/l/26"
  }
};

function youtubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

const LESSON_IDS = Object.keys(LESSONS).map(Number).sort((a, b) => a - b);
