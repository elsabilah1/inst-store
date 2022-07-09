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
      <div className="grid grid-cols-2 items-center gap-2 rounded bg-white p-3 shadow-sm">
        <Carousel
          className="border p-1"
          showArrows
          showIndicators={false}
          showThumbs={false}
        >
          {item.imageUrl.map((img: any) => (
            <div className="relative h-48 w-full" key={img}>
              <Image
                src={img}
                layout="fill"
                objectFit="contain"
                alt={item.name}
                priority
              />
            </div>
          ))}
        </Carousel>

        <div>
          <h1 className="font-bold capitalize line-clamp-1">{item.name}</h1>
          <div className="text-sm">
            <div className="grid grid-cols-2">
              <span className="space-y-1">
                <p>Category</p>
                <p>Buying price</p>
                <p>Selling price</p>
                <p>Stock</p>
                <p>Sold</p>
              </span>
              <span className="space-y-1">
                <p className="capitalize">: {item.category}</p>
                <p>: Rp. {item.buyingPrice.toLocaleString()}</p>
                <p>: Rp. {item.sellingPrice.toLocaleString()}</p>
                <p>: {item.stock}</p>
                <p>: {item.sold}</p>
              </span>
            </div>
          </div>
          <div className="mt-3 ml-auto flex w-1/2 gap-2 text-white">
            <button
              className="w-full rounded bg-info py-1 active:scale-95"
              onClick={() => router.push(`/admin/products/edit/${item._id}`)}
            >
              <PencilAltIcon className="inline h-6 w-6" />
            </button>
            <button
              onClick={() => setModal(true)}
              className="w-full rounded bg-danger py-1 active:scale-95"
            >
              <TrashIcon className="inline h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <ProductDeleteModal item={item} modal={modal} setModal={setModal} />
    </>
  )
}

export default ProductCardAdmin
