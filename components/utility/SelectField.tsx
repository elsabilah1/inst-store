import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Dispatch, Fragment, SetStateAction } from 'react'

interface ISelectField {
  selected: any
  setSelected: Dispatch<SetStateAction<any>>
  data: any[]
  placeholder: string
}

const SelectField: React.FC<ISelectField> = ({
  selected,
  setSelected,
  data,
  placeholder,
}) => {
  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="w-full rounded-sm border border-primary/20 bg-white px-3 py-2 text-left text-sm shadow-sm placeholder:text-sm focus:border-secondary focus:ring-secondary disabled:bg-primary/20">
            <span className="block truncate">
              {selected ?? <p className="text-gray-500">{placeholder}</p>}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((item: any, i: any) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-secondary-100 text-secondary-900'
                        : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="text-secondary-600 absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default SelectField
