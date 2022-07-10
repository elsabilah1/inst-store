import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ProductDeleteModal from '../modals/ProductDeleteModal'

interface IProductCardAdmin {
  item: any
}

const ProductCardAdmin: React.FC<IProductCardAdmin> = ({ item }) => {
  const router = useRouter()
  const [modal, setModal] = useState(false)

  return (
    <>
      <div className="grid grid-cols-5 items-start gap-6 rounded bg-white py-4 px-6 shadow-sm">
        <Carousel
          className="border p-1"
          showArrows
          showIndicators={false}
          showThumbs={false}
        >
          {item.imageUrl.map((img: any) => (
            <Image
              key={img}
              src={img}
              width={150}
              height={150}
              objectFit="contain"
              alt={item.name}
              priority
            />
          ))}
        </Carousel>
        <div className="col-span-3 space-y-2 capitalize">
          <h1 className="text-sm font-bold">
            {item.name}
            <span className="ml-1 text-xs text-danger">({item.category})</span>
          </h1>
          <p className="text-xs line-clamp-2">{item.description}</p>
          <div className="grid grid-cols-2">
            <div className="text-xs">
              <p>Buy: Rp. {item.buyingPrice.toLocaleString()}</p>
              <p>Sell: Rp. {item.sellingPrice.toLocaleString()}</p>
            </div>
            <div className="text-xs">
              <p>Stock: {item.stock}</p>
              <p>Sold: {item.sold}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-white">
          <button
            className="w-full rounded bg-info p-1 active:scale-95"
            onClick={() => router.push(`/admin/products/edit/${item._id}`)}
          >
            <PencilAltIcon className="inline h-6 w-6" />
          </button>
          <button
            onClick={() => setModal(true)}
            className="w-full rounded bg-danger p-1 active:scale-95"
          >
            <TrashIcon className="inline h-6 w-6" />
          </button>
        </div>
      </div>

      <ProductDeleteModal item={item} modal={modal} setModal={setModal} />
    </>
  )
}

export default ProductCardAdmin
