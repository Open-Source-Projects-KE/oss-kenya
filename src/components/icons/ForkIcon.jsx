export default function ForkIcon({ className, ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a3 3 0 0 0-3 3v1a1 1 0 0 0 2 0V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.83a5.5 5.5 0 0 1-1 2.35 5.5 5.5 0 0 1-1-2.35V5a3 3 0 0 0-3-3zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-9 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg>
  )
}