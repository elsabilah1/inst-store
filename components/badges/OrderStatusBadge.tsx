interface IOrderStatusBadge {
  status: string
}

const OrderStatusBadge: React.FC<IOrderStatusBadge> = ({ status }) => {
  if (status === 'process')
    return (
      <button className="w-24 rounded-lg bg-warning py-2 text-xs font-semibold text-primary/75 shadow">
        On Process
      </button>
    )

  if (status === 'delivery')
    return (
      <button className="w-24 rounded-lg bg-info py-2 text-xs font-semibold text-primary/75 shadow">
        In Delivery
      </button>
    )

  if (status === 'completed')
    return (
      <button className="w-24 rounded-lg bg-success py-2 text-xs font-semibold text-primary/75 shadow">
        Completed
      </button>
    )

  if (status === 'complaint')
    return (
      <button className="w-24 rounded-lg bg-danger py-2 text-xs font-semibold text-primary/75 shadow">
        Complaint
      </button>
    )

  if (status === 'complaint_processed')
    return (
      <button className="w-24 rounded-lg bg-danger/70 py-2 text-xs font-semibold text-primary/75 shadow">
        In Delivery
      </button>
    )

  return <div>{status}</div>
}

export default OrderStatusBadge
