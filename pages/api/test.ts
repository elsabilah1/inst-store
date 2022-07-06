import connectDB from '@/lib/db'
import Cart from '@/lib/models/Cart'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    await Cart.create({ userId: '62c2d61835911de1c1838d75' })
    res.status(201).send({ message: 'Account created successfuely.' })
  } catch (error: any) {
    res.status(404).send({ ...error, message: 'Account already registered.' })
  }
})

export default connectDB(handler)
