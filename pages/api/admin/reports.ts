import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    let { page, limit } = req.query
    const orders: any = await Order.find()
    let products: any = await Product.find()
    const length = products.length

    products = products.map((item: any) => ({
      item,
      profit: item.sellingPrice - item.buyingPrice,
    }))

    const soldProducts = orders.reduce(
      (total: number, item: any) => total + item.cart.totalqty,
      0
    )

    const totalProfits = products.reduce(
      (total: number, item: any) => total + item.profit * item.item.sold,
      0
    )

    const overview = [
      {
        title: 'Sold Products',
        value: soldProducts,
      },
      {
        title: 'Total Orders',
        value: orders.length,
      },
      {
        title: 'Total Profits',
        value: `Rp. ${totalProfits.toLocaleString()}`,
      },
    ]

    // Paginating
    page = page ? page.toString() : '1'
    limit = limit ? limit.toString() : '10'

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const handleLimit = (c: any) => {
      return products.filter((x: any, i: any) => {
        if (i <= c - 1) {
          return true
        }
      })
    }

    const handleSkip = (c: any) => {
      return products.filter((x: any, i: any) => {
        if (i > c - 1) {
          return true
        }
      })
    }

    products = handleSkip(skip)
    products = handleLimit(limitNum)

    const data = { products, orders, overview, result: products.length, length }

    return res.status(200).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
