import cn from 'classnames'

interface IAlert {
  error?: string
  success?: string
}

const Alert: React.FC<IAlert> = ({ error, success }) => {
  const classes = cn(
    'py-3 px-8',
    error ? 'bg-danger/20  text-danger' : 'bg-success/20 text-success',
    error || success ? 'block' : 'hidden'
  )

  return (
    <div className="absolute left-1/2 top-24 z-50 -translate-x-1/2 rounded-md bg-white text-sm font-bold shadow-sm transition-all">
      <div className={classes}>{error ?? success}</div>
    </div>
  )
}

export default Alert
