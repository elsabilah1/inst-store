import { useState } from 'react'
import OrderStatusModal from '../modals/OrderStatusModal'

interface IOrderDetailStatusBadge {
  status: string
  disabled?: boolean
}

const OrderDetailStatusBadge: React.FC<IOrderDetailStatusBadge> = ({
  status,
  disabled,
}) => {
  const [modal, setModal] = useState(false)

  if (status === 'payment')
    return (
      <div className="mb-3 flex justify-between rounded bg-warning p-2 shadow">
        <div className="text-xs font-bold text-primary/75">Status: </div>
        <div className="text-right">
          <h3 className="md:text-normal text-sm font-bold text-primary">
            Waiting for Payment.
          </h3>
          <p className="text-xs md:text-sm">
            Fill in the proof of payment in the field below.
          </p>
        </div>
      </div>
    )

  if (status === 'process')
    return (
      <div className="mb-3 flex justify-between rounded bg-warning p-2 shadow">
        <div className="text-xs font-bold text-primary/75">Status: </div>
        <div className="text-right">
          <h3 className="md:text-normal text-sm font-bold text-primary">
            Payment Accepted.
          </h3>
          <p className="text-xs md:text-sm">
            Wait for the courier to deliver your order!
          </p>
        </div>
      </div>
    )

  if (status === 'delivery')
    return (
      <>
        <div className="mb-3 flex justify-between rounded bg-info p-2 shadow">
          <div className="text-xs font-bold text-primary/75">Status: </div>
          <div className="flex items-center gap-3 text-right">
            <h3 className="text-sm font-bold text-white">
              Your order is being delivered
            </h3>
            <button
              onClick={() => setModal(true)}
              className="rounded-md bg-success py-1 px-2 text-xs font-semibold shadow active:scale-95"
              disabled={disabled}
            >
              order
              <br />
              received
            </button>
          </div>
        </div>
        <OrderStatusModal modal={modal} setModal={setModal} />
      </>
    )

  if (status === 'completed')
    return (
      <>
        <div className="mb-3 flex justify-between rounded bg-success p-2 shadow">
          <div className="text-xs font-bold text-primary/75">Status: </div>
          <div className="flex items-center gap-3 text-right">
            <h3 className="py-2 text-sm font-bold text-primary/75">
              Order completed.
            </h3>
          </div>
        </div>
        <OrderStatusModal modal={modal} setModal={setModal} />
      </>
    )

  if (status === 'complaint' || status === 'complaint_processed')
    return (
      <>
        <div className="mb-3 flex justify-between rounded bg-danger p-2 shadow">
          <div className="text-xs font-bold text-primary/75">Status: </div>
          <div className="flex items-center gap-3 text-right">
            <h3 className="text-sm font-bold text-white">
              We will contact you for complaint follow-up
            </h3>
            <button
              onClick={() => setModal(true)}
              className="rounded-md bg-success py-1 px-2 text-xs font-semibold shadow active:scale-95 disabled:bg-success/70 disabled:active:scale-100 "
              disabled={status === 'complaint'}
            >
              order
              <br />
              received
            </button>
          </div>
        </div>
        <OrderStatusModal modal={modal} setModal={setModal} />
      </>
    )

  return <div>{status}</div>
}

export default OrderDetailStatusBadge
