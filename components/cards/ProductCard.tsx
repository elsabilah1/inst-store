import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useCart } from 'store/cart'
import ProductDetailModal from '../modals/ProductDetailModal'
import { Button } from '../utility'

interface IProductCard {
  item: any
}

const ProductCard: React.FC<IProductCard> = ({ item }) => {
  const { data } = useSession()
  const router = useRouter()
  const { cartItems, addToCart, incCartItem, postUpdatedCart } = useCart()
  const [modal, setModal] = useState<boolean>(false)

  const isInCart = (product: any) => {
    return !!cartItems.find((item: any) => item._id === product._id)
  }

  const handleAddProduct = () => {
    if (data) {
      if (isInCart(item)) {
        incCartItem(item)
      } else {
        addToCart(item)
      }

      postUpdatedCart()
    } else {
      router.replace('/login')
    }
  }

  return (
    <>
      <div className="w-full cursor-pointer rounded-sm border bg-white p-2 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-xl">
        <div className="group relative p-1">
          <div className="absolute inset-0 z-50 hidden place-items-end bg-primary/20 group-hover:grid">
            <button
              className="bg-primary p-2 text-xs text-white"
              onClick={() => setModal(true)}
            >
              view details
            </button>
          </div>
          <div className="relative mb-2 h-52 w-full rounded-md">
            <Image
              src={item.imageUrl[0]}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="font-bold text-primary line-clamp-1">{item.name}</h1>
          <p className="text-sm font-medium text-primary/60">
            Rp {item.sellingPrice.toLocaleString()},-
          </p>
          <p className="text-xs text-primary/50">
            sold <span className="font-bold text-secondary">{item.sold}</span>{' '}
            times
          </p>
          <div className="flex items-center justify-between">
            {item.stock === 0 && (
              <p className="text-xs font-bold text-danger">Out of stock</p>
            )}
            <div className="flex-1 text-right">
              <Button
                onClick={() => handleAddProduct()}
                variant="secondary"
                size="small"
                disabled={item.stock === 0}
              >
                add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProductDetailModal modal={modal} setModal={setModal} item={item} />
    </>
  )
}

export default ProductCard
