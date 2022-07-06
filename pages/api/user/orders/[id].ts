import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const order = await Order.findById(req.query.id)

    res.status(200).send({ order })
  } catch (error) {
    res.status(500).send('Something went wrong.')
  }
})

export default connectDB(handler)
