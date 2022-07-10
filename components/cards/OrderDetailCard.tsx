import Image from 'next/image'

interface IOrderDetailCard {
  product: any
}

const OrderDetailCard: React.FC<IOrderDetailCard> = ({ product }) => {
  return (
    <div key={product._id} className="grid grid-cols-4 items-center">
      <div className="col-span-2 grid grid-cols-4 items-center gap-1">
        <Image
          alt={product.name}
          src={product.imageUrl[0]}
          width={50}
          height={50}
          objectFit="contain"
          priority
        />
        <div className="col-span-3">
          <p className="text-sm font-semibold line-clamp-1">{product.name}</p>
          <p className="text-xs">Rp. {product.sellingPrice.toLocaleString()}</p>
        </div>
      </div>
      <div className="hidden text-center md:block">
        <p className="inline border px-2 text-sm font-bold">
          {product.quantity}
        </p>
      </div>
      <div className="col-span-2 space-y-2 text-right text-xs font-medium md:col-span-1 md:space-y-0 md:text-sm">
        <p className="inline border px-2 text-sm font-bold md:hidden">
          {product.quantity}
        </p>
        <p>Rp. {(product.sellingPrice * product.quantity).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default OrderDetailCard
