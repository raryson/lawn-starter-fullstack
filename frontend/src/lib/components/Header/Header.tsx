import './Header.css'
import { Link } from '@tanstack/react-router'

interface HeaderProps {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="app-header">
      <Link to="/" className="header-link">
        {children}
      </Link>
    </header>
  )
}

