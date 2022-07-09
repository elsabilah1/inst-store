/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Post } from '@/utils/axios'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface IState {
  total: number
  totalqty: number
  cartItems: Array<any>
  addToCart: (payload: any) => void
  incCartItem: (payload: any) => void
  decCartItem: (payload: any) => void
  deleteCartAll: () => void
  addToCartAll: (payload: any) => void
  postUpdatedCart: () => Promise<void>
}

export const useCart = create(
  persist<IState>(
    (set, get) => ({
      total: 0,
      totalqty: 0,
      cartItems: [],
      addToCart: (payload) => {
        const cart = get().cartItems

        if (!cart.find((item: any) => item._id === payload._id)) {
          set((state) => ({
            totalqty: state.totalqty + 1,
            total: state.total + payload.sellingPrice,
            cartItems: [...cart, { ...payload, quantity: 1 }],
          }))
        }
      },
      incCartItem: (payload) => {
        const cart = get().cartItems
        const item = cart[cart.findIndex((item) => item._id === payload._id)]

        payload.stock > item.quantity && item.quantity++

        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + payload.sellingPrice,
          cartItems: cart,
        }))
      },
      decCartItem: (payload) => {
        const cart = get().cartItems
        const selected =
          cart[cart.findIndex((item: any) => item._id === payload._id)]

        if (selected.quantity === 1) {
          return set((state) => ({
            totalqty: state.totalqty - 1,
            total: state.total - payload.sellingPrice,
            cartItems: cart.filter((item) => item._id !== selected._id),
          }))
        }

        selected.quantity--

        set((state) => ({
          totalqty: state.totalqty - 1,
          total: state.total - payload.sellingPrice,
          cartItems: cart,
        }))
      },
      deleteCartAll: () => {
        set(() => ({
          total: 0,
          totalqty: 0,
          cartItems: [],
        }))
      },
      addToCartAll: (payload) => {
        set(() => ({
          total: payload.total,
          totalqty: payload.totalqty,
          cartItems: payload.cartItems,
        }))
      },
      postUpdatedCart: async () => {
        const cartItems = get().cartItems
        const total = get().total
        const totalqty = get().totalqty

        const res = await Post('/user/cart', { cartItems, total, totalqty })
        console.log(res)
      },
    }),
    { name: 'cart' }
  )
)
