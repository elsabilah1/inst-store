import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import User from '@/lib/models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const { id } = req.query
    const order = await Order.findById(id)
    const user = await User.findById(order.userId)

    const orders = { order, user }

    res.status(200).send({ orders })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

handler.put(async (req, res) => {
  try {
    const { id } = req.query
    const { title, content, trackingNumber, shippingService } = req.body

    await Order.findByIdAndUpdate(id, {
      status: { title, content: content || '' },
    })

    if (trackingNumber && shippingService) {
      await Order.findByIdAndUpdate(id, {
        trackingNumber,
        shippingService,
      })
    }

    res.status(200).send({ message: 'Status updated successfully.' })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
