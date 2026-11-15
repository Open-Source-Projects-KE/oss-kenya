import Programs from './Programs.jsx'

export default function ProgramsPage({ programs }) {
  return (
    <div className="wrap">
      <nav aria-label="Main">
        <a className="brand" href="/">Open Source Kenya</a>
        <a href="/">Home</a>
        <a href="/#projects">Projects</a>
        <a href="/sponsors">Sponsors</a>
        <a href="/#contribute">Add yours</a>
      </nav>

      <main>
        <Programs programs={programs} />
      </main>

      <footer>Open Source Kenya is community built.</footer>
    </div>
  )
}
