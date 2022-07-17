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
    'text-xs font-semibold rounded capitalize shadow-sm transition-all active:scale-95  disabled:active:scale-100',
    variant === 'primary' &&
      'bg-primary text-white border border-primary hover:border-white disabled:bg-primary/50',
    variant === 'secondary' &&
      'bg-secondary text-primary/70 border border-secondary hover:bg-primary hover:border-white hover:text-white',
    size === 'small' && 'py-2 w-20 md:w-28',
    size === 'default' && 'py-2 w-24 md:w-32 ',
    size === 'auto' && 'py-3 px-2 flex'
  )

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="animate-bounce text-[5px]">⚫⚫⚫</div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
