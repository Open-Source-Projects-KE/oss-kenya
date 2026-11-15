import { useState } from 'react'

const CATEGORIES = ['Learning', 'Civic tech', 'AI & Data', 'Maps', 'Web & Backend', 'Business', 'IoT', 'Other']
const LANGUAGES = ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Java', 'Go', 'Rust', 'Ruby', 'C/C++', 'HTML/CSS', 'SQL', 'Other']

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export default function SuggestProject({ onProjectSubmitted }) {
  const [form, setForm] = useState({
    name: '',
    github: '',
    liveLink: '',
    categories: [],
    languages: [],
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  function toggleCategory(category) {
    setForm(current => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter(item => item !== category)
        : [...current.categories, category],
    }))
  }

  function toggleLanguage(language) {
    setForm(current => ({
      ...current,
      languages: current.languages.includes(language)
        ? current.languages.filter(item => item !== language)
        : [...current.languages, language],
    }))
  }

  async function submit(event) {
    event.preventDefault()
    const name = form.name.trim()
    const github = form.github.trim()
    const liveLink = form.liveLink.trim()

    if (!name || !github || !form.categories.length || !form.languages.length) {
      setError('Add a project name, GitHub link, at least one category, and one language.')
      return
    }
    if (!isHttpsUrl(github) || !github.includes('github.com/')) {
      setError('Use a valid HTTPS GitHub repository link.')
      return
    }
    if (liveLink && !isHttpsUrl(liveLink)) {
      setError('Use a valid HTTPS link for the live project link.')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      await onProjectSubmitted({
        name,
        github,
        liveLink,
        categories: form.categories,
        languages: form.languages,
      })
      setForm({ name: '', github: '', liveLink: '', categories: [], languages: [] })
      setSuccess('Project submitted and added to the projects list.')
    } catch (submissionError) {
      console.error(submissionError)
      setError('Could not submit the project. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contribute">
      <h2>Suggest a project</h2>
      <p className="lede">Share an open source project that welcomes contributors. Submissions appear in the project list after they are saved.</p>
      <form className="suggest-form" onSubmit={submit}>
        <label>
          Project name
          <input name="name" value={form.name} onChange={updateField} required />
        </label>

        <label>
          GitHub repository
          <input name="github" type="url" placeholder="https://github.com/owner/project" value={form.github} onChange={updateField} required />
        </label>

        <label>
          Live link <span className="field-note">(optional)</span>
          <input name="liveLink" type="url" placeholder="https://example.com" value={form.liveLink} onChange={updateField} />
        </label>

        <fieldset>
          <legend>Categories it covers</legend>
          <div className="category-options">
            {CATEGORIES.map(category => (
              <label className="category-option" key={category}>
                <input
                  type="checkbox"
                  checked={form.categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Languages covered</legend>
          <div className="category-options">
            {LANGUAGES.map(language => (
              <label className="category-option" key={language}>
                <input
                  type="checkbox"
                  checked={form.languages.includes(language)}
                  onChange={() => toggleLanguage(language)}
                />
                {language}
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="form-error" role="alert">{error}</p>}
        {success && <p className="form-success" role="status">{success}</p>}
        <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit'}</button>
      </form>
    </section>
  )
}
