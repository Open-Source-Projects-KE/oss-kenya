export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__main">
        <div className="project-card__meta">
          <span className="project-card__category">{project.category}</span>
          {project.region === 'Kenya' && <span className="project-card__region ke">Kenya</span>}
          {project.region === 'Africa' && <span className="project-card__region africa">Africa</span>}
          {project.region === 'Global' && <span className="project-card__region global">Global</span>}
        </div>
        <h3 className="project-card__title">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link">
            {project.name}
          </a>
        </h3>
        <p className="project-card__excerpt">{project.description}</p>
        <div className="project-card__tags">
          <span className="project-card__tag language">{project.language}</span>
          <span className="project-card__tag level">{project.level}</span>
        </div>
      </div>
      <div className="project-card__actions">
        <a href={project.issues_url || project.url} target="_blank" rel="noopener noreferrer" className="project-card__cta">
          Good first issues →
        </a>
      </div>
    </article>
  )
}