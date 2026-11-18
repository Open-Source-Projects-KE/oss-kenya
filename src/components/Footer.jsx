import { useState } from 'react'

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul>
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) return
    // In a real app, this would call an API endpoint
    setStatus('Thanks for subscribing! Check your inbox for confirmation.')
    setEmail('')
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <div className="footer-newsletter">
      <h4>Stay updated</h4>
      <p className="newsletter-text">Sign up for our newsletter to receive updates on new projects, paid programs, and open source opportunities in Kenya.</p>
      <form onSubmit={handleSubmit} className="newsletter-form" aria-label="Newsletter signup">
        <label htmlFor="footer-email" className="visually-hidden">Email address</label>
        <input
          id="footer-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn">Subscribe</button>
      </form>
      {status && <p className="newsletter-status" role="status">{status}</p>}
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerColumns = [
    {
      title: 'Learn',
      links: [
        { label: 'First steps', href: '#learn' },
        { label: 'Git basics', href: '#learn' },
        { label: 'Finding issues', href: '#learn' },
        { label: 'Making a PR', href: '#learn' },
      ],
    },
    {
      title: 'Projects',
      links: [
        { label: 'All projects', href: '#projects' },
        { label: 'Beginner friendly', href: '#projects' },
        { label: 'Kenyan projects', href: '#projects' },
        { label: 'Suggest a project', href: '#contribute' },
      ],
    },
    {
      title: 'Get paid',
      links: [
        { label: 'GSoC', href: '/programs' },
        { label: 'Outreachy', href: '/programs' },
        { label: 'MLH Fellowship', href: '/programs' },
        { label: 'All programs', href: '/programs' },
      ],
    },
    {
      title: 'Sponsors',
      links: [
        { label: 'Our sponsors', href: '/sponsors' },
        { label: 'Become a sponsor', href: '/sponsors' },
        { label: 'Sponsor benefits', href: '/sponsors' },
        { label: 'Contact us', href: 'mailto:liveedit026@gmail.com' },
      ],
    },
    {
      title: 'CTFs',
      links: [
        { label: 'Upcoming CTFs', href: '#ctfs' },
        { label: 'Past events', href: '#ctfs' },
        { label: 'Resources', href: '#ctfs' },
        { label: 'Join community', href: '#ctfs' },
      ],
    },
  ]

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-main">
        <div className="footer-grid">
          {footerColumns.map((col, i) => (
            <FooterColumn key={i} title={col.title} links={col.links} />
          ))}
          <NewsletterForm />
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} Open Source Kenya. All rights reserved.
        </p>
        <div className="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="mailto:liveedit026@gmail.com">Contact</a>
        </div>
        <p className="community-note">Community built with &#9829; in Kenya</p>
      </div>
    </footer>
  )
}