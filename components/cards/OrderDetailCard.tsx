import Image from 'next/image'

interface IOrderDetailCard {
  product: any
}

const OrderDetailCard: React.FC<IOrderDetailCard> = ({ product }) => {
  return (
    <div key={product._id} className="grid grid-cols-4 items-center">
      <div className="col-span-2 flex items-center gap-1">
        <Image
          alt={product.name}
          src={product.imageUrl[0]}
          width={50}
          height={50}
        />
        <div>
          <p className="text-sm font-semibold">{product.name}</p>
          <p className="text-xs">Rp. {product.sellingPrice.toLocaleString()}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="inline border px-2 text-sm font-bold">
          {product.quantity}
        </p>
      </div>
      <div className="text-right text-sm font-medium">
        Rp. {(product.sellingPrice * product.quantity).toLocaleString()}
      </div>
    </div>
  )
}

export default OrderDetailCard
