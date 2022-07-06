import { Dialog, Transition } from '@headlessui/react'
import {
  ExclamationIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useProduct } from 'store/product'

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
          <h1 className="font-bold capitalize">{item.name}</h1>
          <div className="text-sm">
            <div className="grid grid-cols-2">
              <span className="space-y-1">
                <p>Category:</p>
                <p>Buying price:</p>
                <p>Selling price:</p>
                <p>Stock:</p>
                <p>Sold:</p>
              </span>
              <span className="space-y-1">
                <p>{item.category}</p>
                <p>Rp. {item.buyingPrice.toLocaleString()}</p>
                <p>Rp. {item.sellingPrice.toLocaleString()}</p>
                <p>{item.stock}</p>
                <p>{item.sold}</p>
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
      <DeleteModal item={item} modal={modal} setModal={setModal} />
    </>
  )
}

export default ProductCardAdmin

const DeleteModal = ({ modal, setModal, item }: any) => {
  const { delete: deleteProduct } = useProduct()

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <ExclamationIcon className="mx-auto mb-2 h-20 w-20 rounded-full bg-gray-200 p-4 text-danger" />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  You are about to delete a product
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This will delete {item.name} from catalog
                    <br />
                    Are you sure?
                  </p>
                </div>

                <div className="mt-4 space-x-3 text-right">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-200 hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      deleteProduct(item._id)
                      setModal(false)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
