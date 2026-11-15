import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { SEED_PROJECTS, SEED_PROGRAMS } from './seed'

const TIER_ORDER = { gold: 0, silver: 1, community: 2 }

function sortSponsors(sponsors) {
  return [...sponsors].sort((a, b) =>
    (TIER_ORDER[a.tier] ?? 99) - (TIER_ORDER[b.tier] ?? 99) ||
    (a.sort_order ?? 0) - (b.sort_order ?? 0) ||
    a.name.localeCompare(b.name)
  )
}

export function useData() {
  const [data, setData] = useState({
    projects: SEED_PROJECTS,
    programs: SEED_PROGRAMS,
    sponsors: [],
    status: supabase ? '' : 'Showing sample data. Add your Supabase keys to go live.',
  })

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    ;(async () => {
      try {
        const [p, g, sponsors] = await Promise.all([
          supabase.from('projects').select('*').eq('approved', true).order('name'),
          supabase.from('programs').select('*').eq('approved', true).order('name'),
          supabase.from('sponsors').select('*').eq('approved', true).order('sort_order').order('name'),
        ])
        if (p.error) throw p.error
        if (g.error) throw g.error
        if (sponsors.error) throw sponsors.error
        if (!cancelled) setData({ projects: p.data, programs: g.data, sponsors: sortSponsors(sponsors.data), status: '' })
      } catch (e) {
        console.error(e)
        if (!cancelled) setData(d => ({ ...d, status: "Couldn't reach the database, showing sample data." }))
      }
    })()
    return () => { cancelled = true }
  }, [])

  async function addProject({ name, github, liveLink, categories, languages }) {
    if (!supabase) throw new Error('The database is not configured.')

    const project = {
      name,
      description: 'Open source project submitted by the community.',
      category: categories.join(', '),
      language: languages.join(', '),
      level: 'Beginner',
      region: 'Global',
      url: github,
      live_url: liveLink || null,
      issues_url: `${github.replace(/\/$/, '')}/issues`,
      approved: true,
    }
    const { data: inserted, error } = await supabase.from('projects').insert(project).select().single()
    if (error) throw error

    setData(current => ({
      ...current,
      projects: [...current.projects, inserted].sort((a, b) => a.name.localeCompare(b.name)),
    }))
  }

  return { ...data, addProject }
}
