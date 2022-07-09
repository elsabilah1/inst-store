import { Put } from '@/utils/axios'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import OrderComplaintModal from './OrderComplaintModal'

interface IOrderStatusModal {
  modal: boolean
  setModal: any
}

const OrderStatusModal: React.FC<IOrderStatusModal> = ({ modal, setModal }) => {
  const router = useRouter()
  const [complaintModal, setComplaintModal] = useState(false)

  const changeOrderStatus = async (newStatus: string) => {
    await Put(`/admin/orders/${router.query.id}`, {
      title: newStatus,
    })
    router.reload()
  }

  return (
    <>
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
                <Dialog.Panel className="grid h-48 w-full max-w-md transform place-items-center overflow-hidden rounded-xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Is there a problem with your order?
                  </Dialog.Title>

                  <div className="grid grid-cols-2 gap-6">
                    <button
                      className="rounded border border-danger p-2 font-bold text-danger shadow"
                      onClick={() => {
                        setModal(false)
                        setComplaintModal(true)
                      }}
                    >
                      Make a complaint
                    </button>
                    <button
                      className="rounded border border-success bg-success p-2 font-bold text-white shadow"
                      onClick={() => changeOrderStatus('completed')}
                    >
                      No, it&apos;s good
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <OrderComplaintModal
        modal={complaintModal}
        setModal={setComplaintModal}
      />
    </>
  )
}

export default OrderStatusModal
