import { Put } from '@/utils/axios'
import { useRouter } from 'next/router'

interface IOrderDetailStatusBadgeAdmin {
  status: string
}

const OrderDetailStatusBadgeAdmin: React.FC<IOrderDetailStatusBadgeAdmin> = ({
  status,
}) => {
  const router = useRouter()

  const changeOrderStatus = async (newStatus: string) => {
    await Put(`/admin/orders/${router.query.id}`, {
      title: newStatus,
    })
    router.reload()
  }

  if (status === 'process')
    return (
      <button
        className="rounded border border-info bg-info py-2 px-4 text-sm font-bold text-white shadow active:scale-95"
        onClick={() => changeOrderStatus('delivery')}
      >
        Process Order
      </button>
    )

  if (status === 'delivery')
    return (
      <button className="rounded border border-info py-2 px-4 text-sm font-bold text-info shadow">
        Order Shipped
      </button>
    )

  return <div>{status}</div>
}

export default OrderDetailStatusBadgeAdmin
