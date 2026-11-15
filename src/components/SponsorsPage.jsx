import Sponsors from './Sponsors.jsx'

export default function SponsorsPage({ sponsors }) {
  return (
    <div className="wrap">
      <nav aria-label="Main">
        <a className="brand" href="/">Open Source Kenya</a>
        <a href="/">Home</a>
        <a href="/#projects">Projects</a>
        <a href="/programs">Get paid</a>
        <a href="/#contribute">Add yours</a>
      </nav>

      <main>
        <Sponsors sponsors={sponsors} />
      </main>

      <footer>Open Source Kenya is community built.</footer>
    </div>
  )
}
