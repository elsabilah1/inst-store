import cn from 'classnames'
import { ReactNode } from 'react'

interface IButton {
  children: ReactNode
  variant: string
  onClick?(): any
  type?: 'button' | 'submit' | 'reset' | undefined
  size?: string
}

const Button: React.FC<IButton> = ({
  children,
  variant,
  onClick,
  type = 'button',
  size = 'default',
}) => {
  const classes = cn(
    'text-sm rounded-sm capitalize shadow-sm transition-all active:scale-95',
    variant === 'primary' &&
      'bg-primary text-white border border-primary hover:border-white disabled:animate-pulse disabled:bg-primary',
    variant === 'secondary' &&
      'bg-secondary text-primary border border-secondary hover:bg-primary hover:border-white hover:text-white disabled:animate-pulse disabled:bg-secondary',
    size === 'small' && 'py-2 w-20 md:w-28',
    size === 'default' && 'py-3 w-24 md:w-32 ',
    size === 'auto' && 'py-3 px-2 flex'
  )

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
