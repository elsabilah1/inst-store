import connectDB from '@/lib/db'
import Cart from '@/lib/models/Cart'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  const session = await getSession({ req })
  try {
    if (session?.role === 0) {
      const cart = await Cart.findOne({ userId: session.id })
      res.status(200).send({ cart })
    }
    throw new Error('Unauthorized')
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

handler.post(async (req, res) => {
  const session = await getSession({ req })
  try {
    if (session?.role === 0) {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: session.id },
        { ...req.body }
      )
      res.status(200).send({ updatedCart })
    }
    throw new Error('Unauthorized')
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
