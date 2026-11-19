import { useEffect, useState } from 'react'
import ForkIcon from './icons/ForkIcon'

// Fallback fork icon (used if import fails)
function FallbackForkIcon({ className, ...props }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M2 3h12M2 8h12M2 13h12M6 1v2M10 1v2M6 15v2M10 15v2" />
    </svg>
  )
}

// Safe wrapper that catches render-time errors
function ForkIconWrapper({ className, ...props }) {
  try {
    return <ForkIcon className={className} {...props} />
  } catch {
    return <FallbackForkIcon className={className} {...props} />
  }
}

export default function ProjectCard({ project }) {
  const storedForkCount = project.fork_count ?? project.forks_count ?? project.forks ?? null
  const [forkCount, setForkCount] = useState(
    storedForkCount == null ? null : Number(storedForkCount)
  )

  useEffect(() => {
    if (storedForkCount != null) return
    if (!project.url) return

    let cancelled = false
    const match = project.url.match(/^https?:\/\/github\.com\/([^/]+\/[^/#?]+)/i)
    if (!match) return

    fetch(`https://api.github.com/repos/${match[1].replace(/\/$/, '')}`)
      .then(response => {
        if (!response.ok) throw new Error('GitHub repository data unavailable')
        return response.json()
      })
      .then(repo => {
        if (!cancelled && Number.isFinite(repo.forks_count)) {
          setForkCount(repo.forks_count)
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [project.url, storedForkCount])

  const formatForks = (count) => {
    if (count == null || count === '') return null
    const numericCount = Number(count)
    if (!Number.isFinite(numericCount) || numericCount < 0) return null
    if (numericCount === 0) return '0'
    if (numericCount >= 1000) return (numericCount / 1000).toFixed(1).replace('.0', '') + 'k'
    return numericCount.toString()
  }

  const formattedForkCount = formatForks(forkCount)

  return (
    <article className="project-card">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link">
        <div className="project-card__header">
          <div className="project-card__meta">
            <span className="project-card__category">{project.category}</span>
          </div>
          {formattedForkCount !== null && (
            <div className="project-card__forks">
              <ForkIconWrapper className="project-card__fork-icon" />
              <span>{formattedForkCount}</span>
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