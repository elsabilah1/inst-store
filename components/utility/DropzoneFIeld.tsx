/* eslint-disable no-unused-vars */
import { CloudUploadIcon, PlusIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useDropzone } from 'react-dropzone'

interface IDropzoneField {
  label?: string
  onDrop: (acceptedFiles: any) => any
  disabled?: boolean
  avatar?: boolean
}

const DropzoneField: React.FC<IDropzoneField> = ({
  label,
  onDrop,
  disabled,
  avatar,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
      'image/webp': [],
    },
    minSize: 0,
    maxSize: 5242880,
    multiple: true,
  })

  const classes = cn(
    'border-2 border-dashed',
    isDragActive ? 'border-secondary text-secondary' : 'text-gray-300',
    avatar ? 'rounded-full p-5' : ' w-20'
  )

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-baseline gap-2">
          <label htmlFor={label} className="font-medium capitalize">
            {label}
          </label>
          {!avatar && (
            <div className="text-xs font-light text-gray-500">max 4 file</div>
          )}
        </div>
      )}
      <div {...getRootProps()} className={classes}>
        <input {...getInputProps()} disabled={disabled} />
        {avatar ? (
          <CloudUploadIcon className="h-10 w-10 text-info" />
        ) : (
          <PlusIcon />
        )}
      </div>
    </div>
  )
}

export default DropzoneField
