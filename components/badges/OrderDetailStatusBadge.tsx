interface IOrderDetailStatusBadge {
  status: string
}

const OrderDetailStatusBadge: React.FC<IOrderDetailStatusBadge> = ({
  status,
}) => {
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

  return <div>{status}</div>
}

export default OrderDetailStatusBadge
