import ProjectsList from './ProjectsList.jsx'

export default function ProjectsPage({ projects }) {
  return (
    <main className="projects-page">
      <header className="page-header">
        <h1>All Projects</h1>
        <p className="page-subtitle">
          Browse our curated collection of open source projects welcoming new contributors.
          Use the filters to find the right fit for your skills and interests.
        </p>
      </header>
      <ProjectsList projects={projects} paginated itemsPerPage={12} showFilters={true} />
    </main>
  )
}