import { useMemo, useState } from 'react'
import { useGitHubRepoDescription } from '../hooks/useGitHubRepo'

function ProjectCardInline({ project }) {
  const { description: githubDescription, loading } = useGitHubRepoDescription(
    project.url,
    project.description
  )
  const displayDescription = githubDescription || project.description

  return (
    <article className="card">
      <h3>{project.name}</h3>
      <div className="tags">
        <span className="tag category">{project.category}</span>
        <span className="tag lvl">{project.language}</span>
        <span className="tag lvl">{project.level}</span>
        {project.region === 'Kenya' && <span className="tag ke">Kenyan roots</span>}
        {project.region === 'Africa' && <span className="tag ke">African</span>}
      </div>
      <p>{displayDescription}</p>
      <div className="links">
        <a href={project.url} target="_blank" rel="noopener noreferrer">Project</a>
        {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer">Live site</a>}
        <a href={project.issues_url || project.url} target="_blank" rel="noopener noreferrer">Good first issues</a>
      </div>
    </article>
  )
}

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
      <h2>Projects</h2>
      <p className="lede">Filter by what you're interested in, the language you know, and how experienced you are.</p>
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
          <ProjectCardInline key={p.id ?? p.name} project={p} />
        )) : (
          <div className="empty">No projects match these filters. Clear a filter or suggest a project below.</div>
        )}
      </div>
    </section>
  )
}