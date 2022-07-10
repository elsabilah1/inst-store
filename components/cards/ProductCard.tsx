import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
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
        <div className="group relative">
          <div className="absolute inset-0 z-50 hidden place-items-end bg-primary/20 group-hover:grid">
            <button
              className="bg-primary p-2 text-xs text-white"
              onClick={() => setModal(true)}
            >
              view details
            </button>
          </div>
          <Carousel
            className="mb-2 border p-1"
            showArrows
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={true}
          >
            {item.imageUrl.map((img: any) => (
              <div className="relative h-52 w-full rounded-md" key={img}>
                <Image
                  src={img}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="hover:scale-105"
                  priority
                />
              </div>
            ))}
          </Carousel>
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
          <div className="text-right">
            <Button
              onClick={() => handleAddProduct()}
              variant="secondary"
              size="small"
            >
              add to cart
            </Button>
          </div>
        </div>
      </div>
      <ProductDetailModal modal={modal} setModal={setModal} item={item} />
    </>
  )
}

export default ProductCard
