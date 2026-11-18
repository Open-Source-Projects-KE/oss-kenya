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

// Social media icons as inline SVGs
const SocialIcons = {
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.128-1.28-.072-1.687.072-4.947zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 1 .042-.056 13.107 13.107 0 0 0 1.74-.781.077.077 0 0 1 .087.028c.533.272 1.093.497 1.685.497.564 0 1.103-.2 1.63-.527a.078.078 0 0 1 .086-.028c.64.278 1.323.533 1.95.533.592 0 1.152-.225 1.685-.497a.077.077 0 0 1 .086.028 13.28 13.28 0 0 0 1.74.781.076.076 0 0 1 .042.056c.36.636.757 1.252 1.226 1.993a.077.077 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.446-4.692-.336-9.339-1.314-13.696a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
}

const socialLinks = [
  { name: 'YouTube', href: 'https://youtube.com/@OpenSourceKenya', icon: SocialIcons.youtube, color: '#FF0000' },
  { name: 'Instagram', href: 'https://instagram.com/opensourcekenya', icon: SocialIcons.instagram, color: '#E1306C' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/opensourcekenya', icon: SocialIcons.linkedin, color: '#0077B5' },
  { name: 'Discord', href: 'https://discord.gg/opensourcekenya', icon: SocialIcons.discord, color: '#5865F2' },
  { name: 'Facebook', href: 'https://facebook.com/OpenSourceKenya', icon: SocialIcons.facebook, color: '#1877F2' },
  { name: 'X', href: 'https://x.com/OpenSourceKenya', icon: SocialIcons.x, color: '#000000' },
]

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
        <div className="footer-bottom-left">
          <p className="copyright">
            &copy; {currentYear} Open Source Kenya. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="mailto:liveedit026@gmail.com">Contact</a>
          </div>
        </div>
        <div className="footer-social" aria-label="Social media links">
          {socialLinks.map(({ name, href, icon, color }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="social-link"
              style={{ '--social-color': color }}
            >
              {icon}
            </a>
          ))}
        </div>
        <p className="community-note">Community built with &#9829; in Kenya</p>
      </div>
    </footer>
  )
}