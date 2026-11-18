export default function ProjectCard({ project }) {
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
      </a>
      <div className="project-card__footer">
        <a href={project.issues_url || project.url} target="_blank" rel="noopener noreferrer" className="project-card__cta">
          View issues →
        </a>
      </div>
    </article>
  )
}