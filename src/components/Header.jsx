import ThemeToggle from './ThemeToggle.jsx'

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <nav className="header-nav" aria-label="Main navigation">
        <a className="brand" href="/">Open Source Kenya</a>
        <div className="nav-links">
          <a href="/learn">Learn</a>
          <a href="/projects">Projects</a>
          <a href="/programs">Get paid</a>
          <a href="/sponsors">Sponsors</a>
          <a href="#ctfs">CTFs</a>
          <a href="#contribute">Add yours</a>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}