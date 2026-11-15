const STEPS = [
  ['Make a GitHub account', 'Free. Use a username you’d put on a CV.'],
  ['Learn basic Git', 'Clone, branch, commit, push. The First Contributions project walks you through it.'],
  ['Pick a project', 'Use the filters below. Start with “Beginner”.'],
  ['Find a good first issue', 'Open the project’s Issues link and look for the “good first issue” label.'],
  ['Open a pull request', 'Fix a typo, a doc, or a small bug. Reply politely to feedback.'],
]

export default function Learn() {
  return (
    <section id="learn">
      <h2>Your first contribution in five steps</h2>
      <p className="lede">You don’t need permission or a degree. You need a GitHub account and one small fix.</p>
      <ol className="steps">
        {STEPS.map(([title, text]) => (
          <li key={title}><b>{title}</b><span>{text}</span></li>
        ))}
      </ol>
    </section>
  )
}
