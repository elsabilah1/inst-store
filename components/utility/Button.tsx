import cn from 'classnames'
import { ReactNode } from 'react'

interface IButton {
  children: ReactNode
  variant: string
  onClick?(): any
  type?: 'button' | 'submit' | 'reset' | undefined
  size?: string
  disabled?: boolean
  loading?: boolean
}

const Button: React.FC<IButton> = ({
  children,
  variant,
  onClick,
  type = 'button',
  size = 'default',
  disabled,
  loading,
}) => {
  const classes = cn(
    'text-xs font-semibold rounded capitalize inline-flex justify-center items-center shadow-sm transition-all active:scale-95 disabled:active:scale-100',
    variant === 'primary' &&
      'bg-primary text-white border border-primary hover:border-white disabled:bg-primary/50',
    variant === 'secondary' &&
      'bg-secondary text-primary/70 border border-secondary hover:bg-primary hover:border-white hover:text-white disabled:hover:bg-secondary disabled:hover:text-primary/70',
    size === 'small' && 'py-2 w-20 md:w-28',
    size === 'default' && 'py-2 w-24 md:w-32 ',
    size === 'auto' && 'py-2 px-2'
  )

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <svg
            className="mr-3 -ml-1 h-5 w-5 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
