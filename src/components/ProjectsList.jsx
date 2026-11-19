import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard.jsx'

export default function ProjectsList({ projects, status, showFilters = true, paginated = false, itemsPerPage = 10, onPageChange }) {
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('')
  const [lvl, setLvl] = useState('')
  const [reg, setReg] = useState('')
  const [cat, setCat] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const cats = useMemo(() => [...new Set(projects.map(p => p.category))].sort(), [projects])
  const langs = useMemo(() => [...new Set(projects.map(p => p.language))].sort(), [projects])

  const filtered = projects.filter(p =>
    (!cat || p.category === cat) &&
    (!lang || p.language === lang) &&
    (!lvl || p.level === lvl) &&
    (!reg || p.region === reg) &&
    (!q || `${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase()))
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedProjects = paginated
    ? filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filtered

  function handlePageChange(page) {
    const clampedPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(clampedPage)
    onPageChange?.(clampedPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="projects" className={paginated ? 'projects-section--paginated' : ''}>
      <header className="projects-header">
        <h2>Projects</h2>
        <p className="lede">Filter by what you're interested in, the language you know, and how experienced you are.</p>
        {status && <div id="status" className="status-message">{status}</div>}
      </header>

      {showFilters && (
        <div className="projects-filters">
          <div className="filters-row">
            <input
              type="search"
              placeholder="Search projects…"
              aria-label="Search projects"
              value={q}
              onChange={e => { setQ(e.target.value); setCurrentPage(1) }}
              className="filter-search"
            />
            <select
              aria-label="Language"
              value={lang}
              onChange={e => { setLang(e.target.value); setCurrentPage(1) }}
              className="filter-select"
            >
              <option value="">All languages</option>
              {langs.map(l => <option key={l}>{l}</option>)}
            </select>
            <select
              aria-label="Level"
              value={lvl}
              onChange={e => { setLvl(e.target.value); setCurrentPage(1) }}
              className="filter-select"
            >
              <option value="">All levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select
              aria-label="Region"
              value={reg}
              onChange={e => { setReg(e.target.value); setCurrentPage(1) }}
              className="filter-select"
            >
              <option value="">All regions</option>
              <option>Kenya</option>
              <option>Africa</option>
              <option>Global</option>
            </select>
          </div>
          <div className="chips" role="group" aria-label="Categories">
            {['All', ...cats].map(c => {
              const value = c === 'All' ? '' : c
              return (
                <button
                  key={c}
                  className="chip"
                  aria-pressed={cat === value}
                  onClick={() => { setCat(value); setCurrentPage(1) }}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="projects-grid" role="list">
        {paginatedProjects.length ? (
          paginatedProjects.map(p => (
            <ProjectCard key={p.id ?? p.name} project={p} />
          ))
        ) : (
          <div className="empty-state">
            <p>No projects match these filters.</p>
            {showFilters && <p>Clear a filter or <a href="#contribute">suggest a project</a>.</p>}
          </div>
        )}
      </div>

      {paginated && totalPages > 1 && (
        <nav className="pagination" aria-label="Projects pagination">
          <button
            className="pagination__btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <div className="pagination__pages" role="group" aria-label="Page numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              if (!showPage) return null
              return (
                <button
                  key={page}
                  className={`pagination__page ${page === currentPage ? 'pagination__page--current' : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            })}
          </div>
          <button
            className="pagination__btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </section>
  )
}