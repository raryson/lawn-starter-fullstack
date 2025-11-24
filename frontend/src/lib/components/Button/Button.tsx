import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ children, disabled, className = '', ...props }: ButtonProps) {
  const hasAutoWidth = className.includes('!w-auto') || className.includes('w-auto')
  const classes = [
    'btn',
    disabled ? 'btn-disabled' : '',
    hasAutoWidth ? 'btn-auto-width' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      {...props}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}

