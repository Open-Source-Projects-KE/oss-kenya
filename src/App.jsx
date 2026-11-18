import { useData } from './useData'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Welcome from './components/Welcome.jsx'
import LearnPage from './components/LearnPage.jsx'
import ProjectsList from './components/ProjectsList.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import ProgramsPage from './components/ProgramsPage.jsx'
import SponsorsPage from './components/SponsorsPage.jsx'
import SuggestProject from './components/SuggestProject.jsx'

export default function App() {
  const { projects, programs, sponsors, status, addProject } = useData()

  if (window.location.pathname === '/learn' || window.location.pathname === '/learn/') {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="wrap">
          <LearnPage />
        </main>
        <Footer />
      </div>
    )
  }

  if (window.location.pathname === '/projects' || window.location.pathname === '/projects/') {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="wrap">
          <ProjectsPage projects={projects} />
        </main>
        <Footer />
      </div>
    )
  }

  if (window.location.pathname === '/programs' || window.location.pathname === '/programs/') {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="wrap">
          <ProgramsPage programs={programs} />
        </main>
        <Footer />
      </div>
    )
  }

  if (window.location.pathname === '/sponsors' || window.location.pathname === '/sponsors/') {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="wrap">
          <SponsorsPage sponsors={sponsors} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main className="wrap">
        <header className="hero">
          <h1>Build open source from Kenya.</h1>
          <div className="stripe" aria-hidden="true" />
          <p>Learn how open source works, find a project that matches your skills built by kenyan devs and apply to programs that pay you to contribute.</p>
          <a className="btn" href="/projects">Find a project</a>
          <a className="btn alt" href="/programs">See paid programs</a>
        </header>

        <Welcome />
        <ProjectsList projects={projects} status={status} showFilters={true} paginated={false} />
        <SuggestProject onProjectSubmitted={addProject} />
      </main>
      <Footer />
    </div>
  )
}
