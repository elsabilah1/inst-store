/* eslint-disable no-unused-vars */
import { Delete, Get, Post, Put } from '@/utils/axios'
import create from 'zustand'

interface IState {
  loading: boolean
  success: string
  error: string
  itemList: Array<any>
  reset: () => void
  setItem: (payload: any) => void
  filter: (payload: any) => Promise<void>
  add: (payload: any) => Promise<void>
  edit: (payload: {
    id: string | string[] | undefined
    data: any
  }) => Promise<void>
  delete: (payload: string) => Promise<void>
}

export const useProduct = create<IState>((set) => ({
  loading: false,
  success: '',
  error: '',
  itemList: [],
  reset: () => {
    set({ error: '' })
    set({ success: '' })
  },
  setItem: (payload) => {
    set({ itemList: payload })
  },
  filter: async (payload) => {
    set({ loading: true })
    try {
      const res: any = await Get(`/products?filter=${payload}`)

      if (res.error) {
        throw new Error(res.error.message)
      }

      set({ loading: false })
      set({ itemList: res })
    } catch (error: any) {
      set({ loading: false })
      set({ error: error.message })
    }
  },
  add: async (payload) => {
    set({ loading: true })
    try {
      const res: any = await Post('/admin/products', payload, 'form-data')

      if (res.error) {
        throw new Error(res.error.message)
      }

      set({ loading: false })
      set({ success: res.message })
    } catch (error: any) {
      set({ loading: false })
      set({ error: error.message })
    }
  },
  edit: async (payload) => {
    set({ loading: true })
    try {
      const res: any = await Put(
        `/admin/products/${payload.id}`,
        payload.data,
        'form-data'
      )

      if (res.error) {
        throw new Error(res.error.message)
      }

      set({ loading: false })
      set({ success: res.message })
    } catch (error: any) {
      set({ loading: false })
      set({ error: error.message })
    }
  },
  delete: async (payload) => {
    set({ loading: true })
    try {
      const res: any = await Delete(`/admin/products/${payload}`)

      if (res.error) {
        throw new Error(res.error.message)
      }

      set({ loading: false })
      set({ success: res.message })
    } catch (error: any) {
      set({ loading: false })
      set({ error: error.message })
    }
  },
}))
