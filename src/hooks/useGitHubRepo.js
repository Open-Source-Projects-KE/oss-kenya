import { useEffect, useState, useCallback } from 'react'

// In-memory cache to avoid repeated API calls for the same repo
const repoCache = new Map()

/**
 * Extract owner and repo name from a GitHub URL
 * Supports: https://github.com/owner/repo, https://github.com/owner/repo/, https://github.com/owner/repo.git
 */
export function parseGitHubUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname !== 'github.com') return null
    const parts = u.pathname.split('/').filter(Boolean)
    if (parts.length < 2) return null
    const owner = parts[0]
    const repo = parts[1].replace(/\.git$/, '')
    return { owner, repo }
  } catch {
    return null
  }
}

/**
 * Fetch repository data from GitHub API
 * Returns the repo description (about section) and other useful metadata
 */
async function fetchGitHubRepo(owner, repo, token) {
  const cacheKey = `${owner}/${repo}`

  // Return cached data if available
  if (repoCache.has(cacheKey)) {
    return repoCache.get(cacheKey)
  }

  const headers = {
    Accept: 'application/vnd.github.v3+json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })

  if (!response.ok) {
    if (response.status === 403) {
      // Rate limited - return a special error
      throw new Error('RATE_LIMITED')
    }
    if (response.status === 404) {
      throw new Error('NOT_FOUND')
    }
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const data = await response.json()

  const result = {
    description: data.description,
    homepage: data.homepage,
    stargazers_count: data.stargazers_count,
    forks_count: data.forks_count,
    language: data.language,
    topics: data.topics || [],
    updated_at: data.updated_at,
  }

  // Cache the result
  repoCache.set(cacheKey, result)
  return result
}

/**
 * Custom hook to fetch GitHub repository description
 * @param {string} githubUrl - The GitHub repository URL
 * @param {string} fallbackDescription - Fallback description if fetch fails
 * @returns {object} { description, loading, error, refetch }
 */
export function useGitHubRepoDescription(githubUrl, fallbackDescription = '') {
  const [description, setDescription] = useState(fallbackDescription)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDescription = useCallback(async () => {
    if (!githubUrl) {
      setDescription(fallbackDescription)
      return
    }

    const parsed = parseGitHubUrl(githubUrl)
    if (!parsed) {
      setDescription(fallbackDescription)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Try to get GitHub token from environment (optional, for higher rate limits)
      const token = import.meta.env.VITE_GITHUB_TOKEN || null
      const data = await fetchGitHubRepo(parsed.owner, parsed.repo, token)

      // Use GitHub description if available, otherwise fallback
      setDescription(data.description || fallbackDescription)
    } catch (err) {
      console.warn('Failed to fetch GitHub repo description:', err.message)
      setError(err.message)
      // Fall back to the stored description
      setDescription(fallbackDescription)
    } finally {
      setLoading(false)
    }
  }, [githubUrl, fallbackDescription])

  useEffect(() => {
    fetchDescription()
  }, [fetchDescription])

  return { description, loading, error, refetch: fetchDescription }
}

/**
 * Hook to fetch full GitHub repo data (description, stars, forks, etc.)
 */
export function useGitHubRepo(githubUrl) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRepo = useCallback(async () => {
    if (!githubUrl) return

    const parsed = parseGitHubUrl(githubUrl)
    if (!parsed) return

    setLoading(true)
    setError(null)

    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN || null
      const repoData = await fetchGitHubRepo(parsed.owner, parsed.repo, token)
      setData(repoData)
    } catch (err) {
      console.warn('Failed to fetch GitHub repo:', err.message)
      setError(err.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [githubUrl])

  useEffect(() => {
    fetchRepo()
  }, [fetchRepo])

  return { data, loading, error, refetch: fetchRepo }
}

// Export cache for debugging/testing
export function clearGitHubRepoCache() {
  repoCache.clear()
}

export function getGitHubRepoCache() {
  return new Map(repoCache)
}