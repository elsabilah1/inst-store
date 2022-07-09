import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useCart } from 'store/cart'
import { Button } from '../utility'

interface IProductCard {
  item: any
}

const ProductCard: React.FC<IProductCard> = ({ item }) => {
  const { data } = useSession()
  const router = useRouter()
  const { cartItems, addToCart, incCartItem, postUpdatedCart } = useCart()

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
    <div className="w-full rounded-sm border bg-white p-2 shadow-sm">
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
  )
}

export default ProductCard
