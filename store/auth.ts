/* eslint-disable no-unused-vars */
import { Get, Post, Put } from '@/utils/axios'
import { signIn } from 'next-auth/react'
import create from 'zustand'

interface LogInPayload {
  emailOrUsername: string
  password: string
}

interface registerPayload {
  name: string
  username: string
  email: string
  phone: string
  address: string
  password: string
  confirmPassword: string
  role?: number
}

interface IState {
  loading: boolean
  success: string
  error: string
  user: any
  reset: () => void
  fetchUser: (payload: string) => Promise<void>
  logIn: (payload: LogInPayload) => Promise<void>
  register: (payload: registerPayload) => Promise<void>
  updateProfile: (payload: any) => Promise<void>
}

export const useAuth = create<IState>((set) => ({
  loading: false,
  success: '',
  error: '',
  user: {},
  reset: () => {
    set({ error: '' })
    set({ success: '' })
  },
  fetchUser: async (payload) => {
    const res: any = await Get(`user/profile?id=${payload}`)
    set({ user: res.user })
  },
  logIn: async (payload) => {
    set({ loading: true })
    const { error }: any = await signIn('credentials', {
      redirect: false,
      emailOrUsername: payload.emailOrUsername,
      password: payload.password,
      callbackUrl: '/login',
    })
    if (error) set({ error })
    set({ loading: false })
  },
  register: async (payload) => {
    set({ loading: true })
    try {
      if (payload.password === payload.confirmPassword) {
        const res: any = await Post(
          `/auth/register?role=${payload?.role ?? 0}`,
          payload
        )

        if (res.error) {
          throw new Error(res.error.message)
        }

        set({ loading: false })
        set({ success: res.message })
      } else {
        throw new Error('Password not match')
      }
    } catch (error: any) {
      set({ loading: false })
      set({ error: error.message })
    }
  },
  updateProfile: async (payload) => {
    set({ loading: true })
    try {
      const res: any = await Put('/user/profile', payload, 'form-data')

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
