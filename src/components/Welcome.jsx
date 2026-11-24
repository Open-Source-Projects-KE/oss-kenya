export default function Welcome() {
  return (
    <section id="welcome" aria-labelledby="welcome-heading">
      <h2 id="welcome-heading">Ready to get involved in the open source community?</h2>
      <div className="welcome-content">
        <p className="welcome-lead">
          This is a curated collection of open source projects that actively welcome new contributors. Each project here has tagged issues specifically designed for all developer levels, good entry points to learn the codebase, make a meaningful change, and get your first pull request merged.
        </p>
        <div className="welcome-main">
          <div className="welcome-steps">
            <h3>Getting started:</h3>
            <ol>
              <li>
                <p>Pick a project — Use the filters below to match your interests, preferred language, and experience level.</p>
              </li>
              <li>
                <p>Read the contributor guidelines — Every project has a CONTRIBUTING.md or similar doc. Skim it first.</p>
              </li>
              <li>
                <p> Get it running locally — Clone the repo, follow the setup steps, and make sure tests pass.</p>
              </li>
              <li>
                <p>Claim an issue — Leave a comment on a good first issue letting maintainers know you're on it.</p>
              </li>
              <li>
                <p>Submit your PR — Push your fix, respond to review feedback, and celebrate when it's merged.</p>
              </li>
            </ol>
          </div>
          <div className="welcome-callout">
            <p>
              Completely new to open source? Start with <a href="https://github.com/firstcontributions/first-contributions" target="_blank" rel="noopener noreferrer">First Contributions</a> — a hands-on tutorial that walks you through Git basics and your first pull request in minutes.
            </p>
            <p>
              Want the full guide? Read our <a href="/learn">complete Learn page</a> with detailed walkthroughs for each step.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}