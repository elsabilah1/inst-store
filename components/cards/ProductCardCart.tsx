import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useCart } from 'store/cart'

interface IProductCardCart {
  product: any
}

const ProductCardCart: React.FC<IProductCardCart> = ({ product }) => {
  const { incCartItem, decCartItem, postUpdatedCart } = useCart()

  const handlePost = (type: any) => {
    switch (type) {
      case 'add':
        incCartItem(product)
        break
      case 'minus':
        decCartItem(product)
        break
    }

    postUpdatedCart()
  }

  return (
    <div
      key={product._id}
      className="grid grid-cols-3 items-center md:grid-cols-4"
    >
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
      <div className="ml-auto flex gap-3 md:ml-0">
        <button onClick={() => handlePost('minus')}>
          <MinusCircleIcon className="h-5 w-5 text-secondary" />
        </button>
        <p className="border px-2 text-sm font-bold">{product.quantity}</p>
        <button onClick={() => handlePost('add')}>
          <PlusCircleIcon className="h-5 w-5 text-secondary" />
        </button>
      </div>
      <div className="col-span-3 text-right text-sm font-medium md:col-span-1">
        Rp. {(product.sellingPrice * product.quantity).toLocaleString()}
      </div>
    </div>
  )
}

export default ProductCardCart
