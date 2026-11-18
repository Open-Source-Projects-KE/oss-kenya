const ForkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3v6h-2M6 21v-6h-2M18 3v6h2M18 21v-6h2M3 6h18M3 18h18"/>
  </svg>
)

export default function ProjectCard({ project }) {
  const formatForks = (count) => {
    if (!count) return '—'
    if (count >= 1000) return (count / 1000).toFixed(1).replace('.0', '') + 'k'
    return count.toString()
  }

  return (
    <article className="project-card">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link">
        <div className="project-card__meta">
          <span className="project-card__category">{project.category}</span>
          {project.region === 'Kenya' && <span className="project-card__region">Kenya</span>}
          {project.region === 'Africa' && <span className="project-card__region">Africa</span>}
          {project.region === 'Global' && <span className="project-card__region">Global</span>}
        </div>
        <h3 className="project-card__title">{project.name}</h3>
        <p className="project-card__excerpt">{project.description}</p>
        <div className="project-card__tags">
          <span className="project-card__tag">{project.language}</span>
          <span className="project-card__tag">{project.level}</span>
        </div>
        {project.fork_count && (
          <div className="project-card__forks">
            <ForkIcon />
            <span>{formatForks(project.fork_count)}</span>
          </div>
        )}
      </a>
      <div className="project-card__footer">
        <a href={project.issues_url || project.url} target="_blank" rel="noopener noreferrer" className="project-card__cta">
          View issues →
        </a>
      </div>
    </article>
  )
}