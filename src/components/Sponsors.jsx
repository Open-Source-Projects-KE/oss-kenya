const TIERS = [
  ['gold', 'Gold sponsors'],
  ['silver', 'Silver sponsors'],
  ['community', 'Community sponsors'],
]

const sponsorEmail = import.meta.env.VITE_SPONSOR_EMAIL || ''

function SponsorCard({ sponsor }) {
  return (
    <article className={`card sponsor-card sponsor-${sponsor.tier}`}>
      <div className="sponsor-logo-frame">
        {sponsor.logo_url ? (
          <img src={sponsor.logo_url} alt={sponsor.name} />
        ) : (
          <span className="sponsor-name-fallback">{sponsor.name}</span>
        )}
      </div>
      <div className="tags">
        <span className="tag sponsor-tag">Sponsor</span>
        <span className="tag lvl">{sponsor.partner_type}</span>
      </div>
      <h3>{sponsor.name}</h3>
      <p>{sponsor.description}</p>
      <div className="links">
        <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer sponsored">Visit website</a>
      </div>
    </article>
  )
}

export default function Sponsors({ sponsors }) {
  return (
    <section id="sponsors">
      <h2>Our sponsors</h2>
      <p className="lede">Partner with us to support the next generation of open source developers in Kenya.</p>

      {sponsors.length ? (
        TIERS.map(([tier, title]) => {
          const tierSponsors = sponsors.filter(sponsor => sponsor.tier === tier)
          if (!tierSponsors.length) return null
          return (
            <div className="sponsor-tier" key={tier}>
              <h3 className="sponsor-tier-heading">{title}</h3>
              <div className="sponsor-grid">
                {tierSponsors.map(sponsor => <SponsorCard key={sponsor.id ?? sponsor.name} sponsor={sponsor} />)}
              </div>
            </div>
          )
        })
      ) : null}

      <div className="sponsor-cta">
        <h3>Become a sponsor</h3>
        <p>Get logo placement on the site, a link to your website, and a thank-you mention from Open Source Kenya.</p>
        <a className="btn" href={`mailto:${sponsorEmail}`}>Become a sponsor</a>
      </div>
    </section>
  )
}
