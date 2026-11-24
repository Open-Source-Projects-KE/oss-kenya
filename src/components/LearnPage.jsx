import prImage from '../assets/images/image.png'

const STEPS = [
  {
    number: 1,
    title: 'Create your GitHub account',
    description: 'Your GitHub profile is your open source resume. Pick a professional username, add a clear photo, write a concise bio mentioning your interests and stack, and enable 2FA for security. This identity travels with you across every project you touch.',
    imageAlt: 'GitHub sign-up page showing username, email, and password fields',
    placeholder: 'GitHub Sign Up',
    side: 'left',
  },
  {
    number: 2,
    title: 'Learn the Git essentials',
    description: 'You only need a handful of commands to start: <code>clone</code> to get the code locally, <code>branch</code> to isolate your work, <code>add</code> and <code>commit</code> to save changes with clear messages, <code>push</code> to share your branch, and <code>pull request</code> to propose merging. Practice on a throwaway repo first.',
    imageAlt: 'Terminal showing git clone, branch, commit, and push commands',
    placeholder: 'Git Commands',
    side: 'right',
  },
  {
    number: 3,
    title: 'Find a project that fits',
    description: 'Use the filters on our <a href="/#projects">Projects page</a> to match your skills and interests. Filter by language (Python, JavaScript, Go, etc.), difficulty (Beginner / Intermediate / Advanced), and category (AI, Civic Tech, Web, etc.). Start with projects tagged <strong>Beginner</strong> — they invest in onboarding new contributors.',
    imageAlt: 'Project filtering interface showing category, language, and level dropdowns',
    placeholder: 'Project Filters',
    side: 'left',
  },
  {
    number: 4,
    title: 'Read the contributor guide',
    description: 'Every serious project has a <code>CONTRIBUTING.md</code> (or <code>CONTRIBUTING.rst</code>, <code>DEVELOP.md</code>, etc.). It covers: how to set up the dev environment, code style / linting rules, the PR template and checklist, how tests are run, and where to ask questions. Skim it before you write code — it saves rounds of review.',
    imageAlt: 'CONTRIBUTING.md file open in GitHub showing setup instructions and PR guidelines',
    placeholder: 'CONTRIBUTING.md',
    side: 'right',
  },
  {
    number: 5,
    title: 'Claim a "good first issue"',
    description: 'Go to the project\'s Issues tab and filter by the <code>good first issue</code> or <code>help wanted</code> labels. Pick something small — a typo fix, a docs update, a failing test, or a minor bug. Comment on the issue: <q>I\'d like to work on this, any pointers welcome.</q> Maintainers appreciate the heads-up and will often guide you.',
    imageAlt: 'GitHub Issues page filtered by "good first issue" label showing several beginner-friendly issues',
    placeholder: 'Good First Issues',
    side: 'left',
  },
  {
    number: 6,
    title: 'Open your first pull request',
    description: 'Push your branch and open a PR against <code>main</code> (or the project\'s default branch). Fill out the PR template: what changed, why, and how you tested it. Keep the diff focused — one logical change per PR. Respond to review feedback promptly and politely. When it\'s merged, celebrate! You\'re now an open source contributor.',
    imageAlt: 'GitHub Pull Request page showing file changes, description, and review conversation',
    placeholder: 'Pull Request',
    side: 'right',
    image: prImage,
  },
]

function StepCard({ step }) {
  const isLeft = step.side === 'left'

  return (
    <article className={`step-card step-card--${isLeft ? 'left' : 'right'}`}>
      <div className="step-card__content">
        <div className="step-card__number">{step.number}</div>
        <h3 className="step-card__title">{step.title}</h3>
        <div className="step-card__description" dangerouslySetInnerHTML={{ __html: step.description }} />
        <a href="#" className="step-card__cta" aria-label={`Learn more about ${step.title}`}>
          Read more →
        </a>
      </div>
      <div className="step-card__image" aria-hidden="true">
        {step.image ? (
          <img src={step.image} alt={step.imageAlt} className="step-card__image-img" />
        ) : (
          <div className="image-placeholder">
            <svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" aria-hidden="true">
              <rect width="400" height="300" fill="var(--line)"/>
              <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="var(--muted)">{step.placeholder}</text>
              <rect x="20" y="20" width="60" height="40" rx="4" fill="var(--muted)" opacity="0.3"/>
              <rect x="100" y="20" width="80" height="40" rx="4" fill="var(--muted)" opacity="0.3"/>
              <rect x="20" y="80" width="360" height="12" rx="2" fill="var(--muted)" opacity="0.2"/>
              <rect x="20" y="110" width="360" height="12" rx="2" fill="var(--muted)" opacity="0.15"/>
              <rect x="20" y="140" width="280" height="12" rx="2" fill="var(--muted)" opacity="0.15"/>
              <rect x="20" y="180" width="120" height="40" rx="4" fill="var(--green)" opacity="0.3"/>
            </svg>
          </div>
        )}
      </div>
    </article>
  )
}

export default function LearnPage() {
  return (
    <div className="learn-page">
      <header className="learn-header">
        <h1>Your First Open Source Contribution</h1>
        <p className="learn-subtitle">
          A practical, step-by-step guide to going from zero to merged pull request.
          No prior experience required — just curiosity and a willingness to learn.
        </p>
      </header>

      <main className="learn-steps">
        {STEPS.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </main>

      <section className="learn-next-steps">
        <h2>What comes next?</h2>
        <div className="next-steps-grid">
          <article className="next-step-card">
            <h3>Stick with one project</h3>
            <p>Deepen your involvement. Join their Discord/Slack, help triage issues, review other PRs. Consistency builds reputation faster than drive-by contributions.</p>
          </article>
          <article className="next-step-card">
            <h3>Apply to paid programs</h3>
            <p>Programs like <a href="/programs">GSoC, Outreachy, LFX Mentorship</a> offer stipends for 3-month focused contributions with a mentor.</p>
          </article>
          <article className="next-step-card">
            <h3>Build your portfolio</h3>
            <p>Every merged PR is a public artifact. Pin your best ones on your GitHub profile. Employers value demonstrated collaboration over tutorial projects.</p>
          </article>
        </div>
      </section>

      <section className="learn-resources">
        <h2>Helpful resources</h2>
        <ul className="resources-list">
          <li><a href="https://github.com/firstcontributions/first-contributions" target="_blank" rel="noopener noreferrer">First Contributions</a> — Hands-on tutorial that walks you through a real PR in 10 minutes</li>
          <li><a href="https://opensource.guide/" target="_blank" rel="noopener noreferrer">Open Source Guides</a> — GitHub's official guides on starting, contributing, and leading</li>
          <li><a href="https://github.com/freeCodeCamp/freeCodeCamp/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">freeCodeCamp CONTRIBUTING.md</a> — Gold-standard example of a contributor guide</li>
          <li><a href="https://git-scm.com/book/en/v2" target="_blank" rel="noopener noreferrer">Pro Git Book</a> — Free, comprehensive Git reference (Chapters 1–3 cover 90% of daily use)</li>
          <li><a href="https://choosealicense.com/" target="_blank" rel="noopener noreferrer">Choose a License</a> — Understand what MIT, Apache-2.0, GPL mean for your contributions</li>
        </ul>
      </section>
    </div>
  )
}