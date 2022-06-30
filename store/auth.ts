/* eslint-disable no-unused-vars */
import { Post } from '@/utils/axios'
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
}

interface IState {
  loading: boolean
  success: string
  error: string
  reset: () => void
  logIn: (payload: LogInPayload) => Promise<void>
  register: (payload: registerPayload) => Promise<void>
}

export const useAuth = create<IState>((set) => ({
  loading: false,
  success: '',
  error: '',
  reset: () => {
    set({ error: '' })
    set({ success: '' })
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
        const res: any = await Post('/auth/register', payload)

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
}))
