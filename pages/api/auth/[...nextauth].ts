import User from '@/lib/models/User'
import { compare } from 'bcryptjs'
import mongoose from 'mongoose'
import nextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default nextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        emailOrUsername: {},
        password: {},
      },
      authorize: async ({ emailOrUsername, password }: any) => {
        const db = await mongoose.connect(process.env.DB_URI!)

        if (emailOrUsername) {
          let user = await User.findOne({
            email: emailOrUsername,
          })

          if (!user) {
            user = await User.findOne({
              username: emailOrUsername,
            })
          }

          if (!user) {
            db.disconnect()
            throw new Error('Incorrect Email or Username')
          }

          if (password) {
            const isValid = await compare(password, user.password)

            if (!isValid) {
              db.disconnect()
              throw new Error('Incorrect Password')
            }

            db.disconnect()
            return {
              user: user,
              role: user.role,
              name: user.name,
              image: user.imageUrl,
            }
          }
        }

        db.disconnect()
        throw new Error('Incorrect Email or Username')
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user
        token.role = user.role
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.role = token.role
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
