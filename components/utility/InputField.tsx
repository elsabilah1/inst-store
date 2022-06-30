import cn from 'classnames'
import { Field } from 'formik'

interface IInputField {
  secure?: boolean
  placeholder: string
  name: string
  component?: string
  error: any
  touched: any
}

const InputField: React.FC<IInputField> = ({
  secure,
  component,
  placeholder,
  name,
  error,
  touched,
}) => {
  const classes = cn(
    'shadow-sm w-80 rounded-sm border-primary/20 text-sm placeholder:text-sm focus:border-secondary focus:ring-secondary disabled:bg-primary/20'
  )

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium capitalize">
        {placeholder}
      </label>
      <div>
        <Field
          type={secure ? 'password' : 'text'}
          className={classes}
          name={name}
          id={name}
          placeholder={placeholder}
          component={component ? component : 'input'}
        />
        {error && touched ? (
          <div className="text-sm font-bold text-danger">{error}</div>
        ) : null}
      </div>
    </div>
  )
}
export default InputField
