export default function Welcome() {
  return (
    <section id="welcome" aria-labelledby="welcome-heading">
      <h2 id="welcome-heading" className="visually-hidden">Welcome</h2>
      <div className="welcome-content">
        <p className="welcome-lead">
          This is a curated collection of open source projects that actively welcome new contributors. Each project here has tagged issues specifically designed for first-timers — good entry points to learn the codebase, make a meaningful change, and get your first pull request merged.
        </p>
        <div className="welcome-steps">
          <h3>How to get started</h3>
          <ol>
            <li>
              <strong>Pick a project</strong> — Use the filters below to match your interests, preferred language, and experience level.
            </li>
            <li>
              <strong>Read the contributor guidelines</strong> — Every project has a <code>CONTRIBUTING.md</code> or similar doc. Skim it first.
            </li>
            <li>
              <strong>Get it running locally</strong> — Clone the repo, follow the setup steps, and make sure tests pass.
            </li>
            <li>
              <strong>Claim an issue</strong> — Leave a comment on a <q>good first issue</q> letting maintainers know you're on it.
            </li>
            <li>
              <strong>Submit your PR</strong> — Push your fix, respond to review feedback, and celebrate when it's merged.
            </li>
          </ol>
        </div>
        <p className="welcome-note">
          New to open source? Start with <a href="https://github.com/firstcontributions/first-contributions" target="_blank" rel="noopener noreferrer">First Contributions</a> — a hands-on tutorial that walks you through Git basics and your first pull request in minutes.
        </p>
        <p className="welcome-note">
          Want the full guide? Read our <a href="/learn">complete Learn page</a> with screenshots and detailed walkthroughs for each step.
        </p>
      </div>
    </section>
  )
}