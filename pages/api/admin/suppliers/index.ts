import connectDB from '@/lib/db'
import User from '@/lib/models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    let { page, limit } = req.query
    let suppliers = await User.find({ role: 2 })
    const length = suppliers.length

    // Paginating
    page = page ? page.toString() : '1'
    limit = limit ? limit.toString() : '10'

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const handleLimit = (c: any) => {
      return suppliers.filter((x: any, i: any) => {
        if (i <= c - 1) {
          return true
        }
      })
    }

    const handleSkip = (c: any) => {
      return suppliers.filter((x: any, i: any) => {
        if (i > c - 1) {
          return true
        }
      })
    }

    suppliers = handleSkip(skip)
    suppliers = handleLimit(limitNum)

    if (suppliers.length > 0) {
      return res.status(200).send({
        suppliers,
        result: suppliers.length,
        length,
      })
    }

    return res.status(200).json({
      status: 200,
      message: 'Supplier is not available',
    })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
