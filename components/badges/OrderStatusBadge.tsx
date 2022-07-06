interface IOrderStatusBadge {
  status: string
}

const OrderStatusBadge: React.FC<IOrderStatusBadge> = ({ status }) => {
  if (status === 'process')
    return (
      <button className="rounded-lg bg-warning py-2 px-4 text-xs font-semibold text-primary/75 shadow">
        on process
      </button>
    )

  return <div>{status}</div>
}

export default OrderStatusBadge
