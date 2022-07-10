/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Get, Post } from '@/utils/axios'
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
  addToCartAll: () => Promise<void>
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
          const updatedCart = cart.filter((item) => item._id !== selected._id)
          return set((state) => ({
            totalqty: state.totalqty - 1,
            total: state.total - payload.sellingPrice,
            cartItems: updatedCart,
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
      addToCartAll: async () => {
        const { cart }: any = await Get('/user/cart')

        set(() => ({
          total: cart.total,
          totalqty: cart.totalqty,
          cartItems: cart.cartItems,
        }))
      },
      postUpdatedCart: async () => {
        const cartItems = get().cartItems
        const total = get().total
        const totalqty = get().totalqty

        const res = await Post('/user/cart', { cartItems, total, totalqty })
      },
    }),
    { name: 'cart' }
  )
)
