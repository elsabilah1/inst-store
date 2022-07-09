import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const orders = await Order.find()

    res.status(200).send({ orders })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
