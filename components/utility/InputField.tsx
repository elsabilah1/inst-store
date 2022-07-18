import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { Field } from 'formik'
import { useState } from 'react'

interface IInputField {
  secure?: boolean
  placeholder: string
  name: string
  component?: string
  error: any
  touched: any
  inputVariant?: string
  disabled?: boolean
}

const InputField: React.FC<IInputField> = ({
  secure,
  component,
  placeholder,
  name,
  error,
  touched,
  inputVariant,
  disabled,
}) => {
  const classes = cn(
    'shadow-sm w-full text-sm placeholder:text-sm focus:border-secondary focus:ring-secondary disabled:bg-primary/20',
    inputVariant === 'underline'
      ? 'border-white border-b-primary/20'
      : 'rounded-sm border-primary/20'
  )
  const [hide, setHide] = useState(true)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium capitalize">
        {placeholder}
      </label>
      <div>
        <div className="relative">
          <Field
            type={secure ? (hide ? 'password' : 'text') : 'text'}
            className={classes}
            name={name}
            id={name}
            placeholder={placeholder}
            component={component ? component : 'input'}
            disabled={disabled}
          />
          {secure && (
            <button
              className="absolute inset-y-0 right-0 mr-3 text-primary transition-all"
              onClick={() => setHide(!hide)}
              type="button"
            >
              {hide ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeOffIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && touched ? (
          <div className="text-sm font-bold text-danger">{error}</div>
        ) : null}
      </div>
    </div>
  )
}
export default InputField
