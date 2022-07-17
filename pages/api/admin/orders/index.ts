import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    let { page, limit } = req.query
    let orders = await Order.find()
    const length = orders.length

    // Paginating
    page = page ? page.toString() : '1'
    limit = limit ? limit.toString() : '10'

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const handleLimit = (c: any) => {
      return orders.filter((x: any, i: any) => {
        if (i <= c - 1) {
          return true
        }
      })
    }

    const handleSkip = (c: any) => {
      return orders.filter((x: any, i: any) => {
        if (i > c - 1) {
          return true
        }
      })
    }

    orders = handleSkip(skip)
    orders = handleLimit(limitNum)

    if (orders.length > 0) {
      return res.status(200).send({
        orders,
        result: orders.length,
        length,
      })
    }

    return res.status(200).json({
      status: 200,
      message: 'Orders is not available',
    })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
