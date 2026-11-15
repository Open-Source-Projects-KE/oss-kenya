import { useData } from './useData'
import Learn from './components/Learn.jsx'
import Projects from './components/Projects.jsx'
import ProgramsPage from './components/ProgramsPage.jsx'
import SponsorsPage from './components/SponsorsPage.jsx'
import SuggestProject from './components/SuggestProject.jsx'

export default function App() {
  const { projects, programs, sponsors, status, addProject } = useData()

  if (window.location.pathname === '/programs' || window.location.pathname === '/programs/') {
    return <ProgramsPage programs={programs} />
  }

  if (window.location.pathname === '/sponsors' || window.location.pathname === '/sponsors/') {
    return <SponsorsPage sponsors={sponsors} />
  }

  return (
    <div className="wrap">
      <nav aria-label="Main">
        <a className="brand" href="/">Open Source Kenya</a>
        <a href="#learn">Learn</a>
        <a href="#projects">Projects</a>
        <a href="/programs">Get paid</a>
        <a href="/sponsors">Sponsors</a>
        <a href="#contribute">Add yours</a>
      </nav>

      <header className="hero">
        <h1>Build open source from Kenya.</h1>
        <div className="stripe" aria-hidden="true" />
        <p>Learn how open source works, find a project that matches your skills built by kenyan devs and apply to programs that pay you to contribute.</p>
        <a className="btn" href="#projects">Find a project</a>
        <a className="btn alt" href="/programs">See paid programs</a>
      </header>

      <Learn />
      <Projects projects={projects} status={status} />
      <SuggestProject onProjectSubmitted={addProject} />

      <footer>Open Source Kenya is community built.</footer>
    </div>
  )
}
