import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    let { page, limit, start, end } = req.query
    let orders: any = await Order.find()
    orders = orders.filter(
      (item: any) =>
        item.createdAt.toLocaleDateString('en-CA').toString() >= start! &&
        item.createdAt.toLocaleDateString('en-CA').toString() <= end!
    )

    let p: any = orders.flatMap((item: any) => item.cart.cartItems)
    const pid: any = p.map((item: any) => item._id)
    const pids: any = [...new Set(pid)]

    let products: any = []
    for (let i = 0; i < pids.length; i++) {
      const item = await Product.findById(pids[i])
      products.push(item)
    }
    const length = products.length

    const soldProducts: any = orders.reduce(
      (total: number, item: any) => total + item.cart.totalqty,
      0
    )

    products = products.map((item: any) => ({
      item,
      profit: item.sellingPrice - item.buyingPrice,
    }))

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

    const totalProfits = p.reduce(
      (total: number, item: any) =>
        total + item.quantity * (item.sellingPrice - item.buyingPrice),
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

    const data: any = {
      products,
      orders,
      overview,
      result: products.length,
      length,
    }

    return res.status(200).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
