import { Put } from '@/utils/axios'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

interface IOrderComplaintModal {
  modal: boolean
  setModal: any
}

const OrderComplaintModal: React.FC<IOrderComplaintModal> = ({
  modal,
  setModal,
}) => {
  const router = useRouter()
  const [content, setContent] = useState<any>()

  const changeOrderStatus = async (newStatus: string) => {
    await Put(`/admin/orders/${router.query.id}`, {
      title: newStatus,
      content,
    })
    router.reload()
  }

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="grid h-64 w-full max-w-md transform place-items-center overflow-hidden rounded-xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  What&apos;s your complaint?
                </Dialog.Title>
                <div className="w-full space-y-3">
                  <textarea
                    placeholder="write your complaint"
                    className="w-full rounded-sm border-primary/20 text-sm shadow-sm placeholder:text-sm focus:border-secondary focus:ring-secondary disabled:bg-primary/20"
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <button
                      className="rounded border border-danger p-2 font-bold text-danger shadow"
                      onClick={() => setModal(false)}
                    >
                      cancel
                    </button>
                    <button
                      className="rounded border border-danger bg-danger p-2 font-bold text-white shadow"
                      onClick={() => changeOrderStatus('complaint')}
                    >
                      send
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default OrderComplaintModal
