interface IOrderDetailStatusBadgeAdmin {
  status: string
}

const OrderDetailStatusBadgeAdmin: React.FC<IOrderDetailStatusBadgeAdmin> = ({
  status,
}) => {
  if (status === 'payment')
    return (
      <button
        className="rounded border border-warning bg-warning py-2 px-4 text-sm font-bold text-primary/70 shadow active:scale-95"
        type="submit"
      >
        Process Payment
      </button>
    )

  if (status === 'process')
    return (
      <button
        className="rounded border border-info bg-info py-2 px-4 text-sm font-bold text-white shadow active:scale-95"
        type="submit"
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

  if (status === 'completed')
    return (
      <button className="rounded border border-success py-2 px-4 text-sm font-bold text-success shadow">
        Order Completed
      </button>
    )

  if (status === 'complaint')
    return (
      <button
        className="rounded border border-danger bg-danger py-2 px-4 text-sm font-bold text-white shadow active:scale-95"
        type="submit"
      >
        Process Complaint
      </button>
    )

  if (status === 'complaint_processed')
    return (
      <button className="rounded border border-danger py-2 px-4 text-sm font-bold text-danger shadow">
        Complaint Processed
      </button>
    )

  return <div>{status}</div>
}

export default OrderDetailStatusBadgeAdmin
