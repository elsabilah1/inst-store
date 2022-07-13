import { Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useCart } from 'store/cart'
import { Button } from '../utility'

interface IProductDetailModal {
  modal: boolean
  setModal: any
  item: any
}

const ProductDetailModal: React.FC<IProductDetailModal> = ({
  modal,
  setModal,
  item,
}) => {
  const { data } = useSession()
  const router = useRouter()
  const { cartItems, addToCart, incCartItem, postUpdatedCart } = useCart()
  const [more, setMore] = useState(false)

  const isInCart = (product: any) => {
    return !!cartItems.find((item: any) => item._id === product._id)
  }

  const handleAddProduct = () => {
    if (data?.role === 1) return

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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mt-14 w-full max-w-screen-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all md:mt-0">
                <div className="text-end">
                  <button
                    className="transition-all hover:text-danger"
                    onClick={() => setModal(false)}
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Carousel
                    className="p-2 shadow-md"
                    showArrows
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    infiniteLoop={true}
                  >
                    {item.imageUrl.map((img: any) => (
                      <div
                        className="relative h-[50vh] w-full rounded-md"
                        key={img}
                      >
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

                  <div className="grid justify-between">
                    <div className="space-y-2">
                      <p className="inline rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white/70">
                        {item.category}
                      </p>
                      <h1 className="pb-2 text-xl font-bold">{item.name}</h1>
                      <p
                        className={`text-xs transition-all ${
                          more ? '' : 'line-clamp-4'
                        }`}
                      >
                        {item.description}
                      </p>
                      {more === false ? (
                        <button
                          onClick={() => setMore(true)}
                          className="flex items-center text-xs font-bold"
                        >
                          more details
                          <ChevronDownIcon className="h-5 w-5 text-primary" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setMore(false)}
                          className="flex items-center text-xs font-bold"
                        >
                          hide details
                          <ChevronUpIcon className="h-5 w-5 text-primary" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="my-2 text-sm">
                          stock:{' '}
                          <span
                            className={`${
                              item.stock < 10 ? 'text-danger' : 'text-primary'
                            } font-bold`}
                          >
                            {item.stock}
                          </span>
                        </p>
                        <p className="text-lg font-semibold">
                          Rp {item.sellingPrice.toLocaleString()},-
                        </p>
                      </div>

                      <Button
                        onClick={() => handleAddProduct()}
                        variant="secondary"
                      >
                        add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ProductDetailModal
