// Safe ForkIcon import with fallback
let ForkIconComponent
try {
  ForkIconComponent = require('./icons/ForkIcon').default
} catch {
  ForkIconComponent = null
}

function ForkIconWrapper({ className, ...props }) {
  if (ForkIconComponent) {
    return <ForkIconComponent className={className} {...props} />
  }
  // Fallback: simple fork symbol
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M2 3h12M2 8h12M2 13h12M6 1v2M10 1v2M6 15v2M10 15v2" />
    </svg>
  )
}

export default function ProjectCard({ project }) {
  const formatForks = (count) => {
    if (!count) return '—'
    if (count >= 1000) return (count / 1000).toFixed(1).replace('.0', '') + 'k'
    return count.toString()
  }

  return (
    <article className="project-card">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link">
        <div className="project-card__header">
          <div className="project-card__meta">
            <span className="project-card__category">{project.category}</span>
            {project.region === 'Kenya' && <span className="project-card__region">Kenya</span>}
            {project.region === 'Africa' && <span className="project-card__region">Africa</span>}
            {project.region === 'Global' && <span className="project-card__region">Global</span>}
          </div>
          {project.fork_count && (
            <div className="project-card__forks">
              <ForkIconWrapper />
              <span>{formatForks(project.fork_count)}</span>
            </div>
          )}
        </div>
        <h3 className="project-card__title">{project.name}</h3>
        <p className="project-card__excerpt">{project.description}</p>
        <div className="project-card__tags">
          <span className="project-card__tag">{project.language}</span>
          <span className="project-card__tag">{project.level}</span>
        </div>
      </a>
      <div className="project-card__footer">
        <a href={project.issues_url || project.url} target="_blank" rel="noopener noreferrer" className="project-card__cta">
          View issues →
        </a>
      </div>
    </article>
  )
}