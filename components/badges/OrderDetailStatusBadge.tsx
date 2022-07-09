import { useState } from 'react'
import OrderStatusModal from '../modals/OrderStatusModal'

interface IOrderDetailStatusBadge {
  status: string
}

const OrderDetailStatusBadge: React.FC<IOrderDetailStatusBadge> = ({
  status,
}) => {
  const [modal, setModal] = useState(false)

  if (status === 'process')
    return (
      <div className="mb-3 flex justify-between rounded bg-warning p-2 shadow">
        <div className="text-xs font-bold text-primary/75">Status: </div>
        <div className="text-right">
          <h3 className="font-bold text-primary">Payment Accepted.</h3>
          <p className="text-sm">Wait for the courier to deliver your order!</p>
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
