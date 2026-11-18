import { useMemo, useState } from 'react'

export default function Projects({ projects, status }) {
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('')
  const [lvl, setLvl] = useState('')
  const [reg, setReg] = useState('')
  const [cat, setCat] = useState('')

  const cats = useMemo(() => [...new Set(projects.map(p => p.category))].sort(), [projects])
  const langs = useMemo(() => [...new Set(projects.map(p => p.language))].sort(), [projects])

  const list = projects.filter(p =>
    (!cat || p.category === cat) &&
    (!lang || p.language === lang) &&
    (!lvl || p.level === lvl) &&
    (!reg || p.region === reg) &&
    (!q || `${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <section id="projects">
      <h2>Projects to contribute to</h2>
      <p className="lede">Filter by what you’re interested in, the language you know, and how experienced you are.</p>
      {status && <div id="status">{status}</div>}

      <div className="filters">
        <input type="search" placeholder="Search projects" aria-label="Search projects" value={q} onChange={e => setQ(e.target.value)} />
        <select aria-label="Language" value={lang} onChange={e => setLang(e.target.value)}>
          <option value="">Any language</option>
          {langs.map(l => <option key={l}>{l}</option>)}
        </select>
        <select aria-label="Level" value={lvl} onChange={e => setLvl(e.target.value)}>
          <option value="">Any level</option>
          <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <select aria-label="Region" value={reg} onChange={e => setReg(e.target.value)}>
          <option value="">Anywhere</option>
          <option>Kenya</option><option>Africa</option><option>Global</option>
        </select>
      </div>

      <div className="chips" role="group" aria-label="Categories">
        {['All', ...cats].map(c => {
          const value = c === 'All' ? '' : c
          return (
            <button key={c} className="chip" aria-pressed={cat === value} onClick={() => setCat(value)}>{c}</button>
          )
        })}
      </div>

      <div className="grid">
        {list.length ? list.map(p => (
          <article className="card" key={p.id ?? p.name}>
            <h3>{p.name}</h3>
            <div className="tags">
              <span className="tag category">{p.category}</span>
              <span className="tag lvl">{p.language}</span>
              <span className="tag lvl">{p.level}</span>
              {p.region === 'Kenya' && <span className="tag ke">Kenyan roots</span>}
              {p.region === 'Africa' && <span className="tag ke">African</span>}
            </div>
            <p>{p.description}</p>
            <div className="links">
              <a href={p.url} target="_blank" rel="noopener noreferrer">Project</a>
              {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer">Live site</a>}
              <a href={p.issues_url || p.url} target="_blank" rel="noopener noreferrer">Good first issues</a>
            </div>
          </article>
        )) : (
          <div className="empty">No projects match these filters. Clear a filter or suggest a project below.</div>
        )}
      </div>
    </section>
  )
}
