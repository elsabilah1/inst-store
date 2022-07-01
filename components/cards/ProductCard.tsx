import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Button } from '../utility'

interface IProductCard {
  item: any
}

const ProductCard: React.FC<IProductCard> = ({ item }) => {
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
            />
          </div>
        ))}
      </Carousel>

      <div className="space-y-1">
        <h1 className="font-bold text-primary">{item.name}</h1>
        <p className="text-sm font-medium text-primary/60">
          Rp {item.sellingPrice.toLocaleString()},-
        </p>
        <p className="text-xs text-primary/50">
          sold <span className="font-bold text-secondary">{item.sold}</span>{' '}
          times
        </p>
        <div className="text-right">
          <Button variant="secondary" size="small">
            add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
