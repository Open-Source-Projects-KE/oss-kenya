import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const NAV_LINKS = [
  { href: '/learn', label: 'Learn' },
  { href: '/projects', label: 'Projects' },
  { href: '/programs', label: 'Get paid' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '#ctfs', label: 'CTFs' },
  { href: '#contribute', label: 'Add yours' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header" role="banner">
      <nav className="header-nav" aria-label="Main navigation">
        <a className="brand" href="/">Open Source Kenya</a>

        <button
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMenu}
        >
          <span className="nav-toggle__icon" aria-hidden="true">
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </span>
        </button>

        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`} id="nav-links" role="navigation" aria-label="Main menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}