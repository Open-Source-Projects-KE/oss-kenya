import { useState } from 'react'

export default function Programs({ programs }) {
  const [paidOnly, setPaidOnly] = useState(true)
  const list = programs.filter(g => !paidOnly || g.paid)

  return (
    <section id="paid">
      <h2>Open source programs that pay</h2>
      <p className="lede">These programs give stipends or fellowships for contributing. Dates and rules change every year, so always confirm on the official site.</p>
      <label className="toggle">
        <input type="checkbox" checked={paidOnly} onChange={e => setPaidOnly(e.target.checked)} /> Show paid programs only
      </label>

      <div className="grid">
        {list.length ? list.map(g => (
          <article className="card" key={g.id ?? g.name}>
            <h3>{g.name}</h3>
            <div className="tags">
              <span className={`tag ${g.paid ? 'paid' : 'lvl'}`}>{g.paid ? 'Paid' : 'Not paid'}</span>
              <span className="tag lvl">{g.org}</span>
            </div>
            <p>{g.description}</p>
            <p><b>When:</b> {g.timing}<br /><b>Who:</b> {g.eligibility}</p>
            <div className="links">
              <a href={g.url} target="_blank" rel="noopener noreferrer">Official site</a>
            </div>
          </article>
        )) : <div className="empty">No programs to show.</div>}
      </div>
      <p className="note">Typical timing is a guide, not a promise. Stipend amounts often depend on your country.</p>
    </section>
  )
}
