interface IOrderStatusBadge {
  status: string
}

const OrderStatusBadge: React.FC<IOrderStatusBadge> = ({ status }) => {
  if (status === 'process')
    return (
      <button className="rounded-lg bg-warning py-2 px-4 text-xs font-semibold text-primary/75 shadow">
        On Process
      </button>
    )

  if (status === 'delivery')
    return (
      <button className="rounded-lg bg-info py-2 px-4 text-xs font-semibold text-primary/75 shadow">
        In Delivery
      </button>
    )

  return <div>{status}</div>
}

export default OrderStatusBadge
