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
      <div className="flex gap-3">
        <button onClick={() => handlePost('minus')}>
          <MinusCircleIcon className="h-5 w-5 text-secondary" />
        </button>
        <p className="border px-2 text-sm font-bold">{product.quantity}</p>
        <button onClick={() => handlePost('add')}>
          <PlusCircleIcon className="h-5 w-5 text-secondary" />
        </button>
      </div>
      <div className="text-right text-sm font-medium">
        Rp. {(product.sellingPrice * product.quantity).toLocaleString()}
      </div>
    </div>
  )
}

export default ProductCardCart
