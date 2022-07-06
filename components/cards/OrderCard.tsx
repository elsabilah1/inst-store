import Image from 'next/image'
import Link from 'next/link'
import OrderStatusBadge from '../badges/OrderStatusBadge'

interface IOrderCard {
  item: any
}

const OrderCard: React.FC<IOrderCard> = ({ item }) => {
  return (
    <Link href={`/me/orders/${item._id}`}>
      <a>
        <div className="flex items-center justify-between rounded border p-2 shadow-sm">
          <div className="flex gap-3">
            <div className="relative h-14 w-14 border p-1 shadow-lg">
              <Image
                src={item.cart.cartItems[0].imageUrl[0]}
                width="50"
                height="50"
                alt={item.cart.cartItems[0].name}
              />
              <div className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-sm text-white">
                {item.cart.totalqty}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold">
                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </p>
              <p className="text-sm font-light">
                Rp. {item.total.toLocaleString()}
              </p>
            </div>
          </div>
          <OrderStatusBadge status={item.status.title} />
        </div>
      </a>
    </Link>
  )
}

export default OrderCard
