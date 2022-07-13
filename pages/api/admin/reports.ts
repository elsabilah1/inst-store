import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const orders: any = await Order.find()
    let products: any = await Product.find()

    // item.profit = item.sellingPrice - item.buyingPrice

    products = products.map((item: any) => ({
      item,
      profit: item.sellingPrice - item.buyingPrice,
    }))

    const soldProducts = orders.reduce(
      (total: number, item: any) => total + item.cart.totalqty,
      0
    )

    const totalProfits = products.reduce(
      (total: number, item: any) => total + item.profit,
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

    const data = { products, orders, overview }

    return res.status(200).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
