import connectDB from '@/lib/db'
import Cart from '@/lib/models/Cart'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import User from '@/lib/models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    let { page, limit, id } = req.query

    let data = await Order.find({
      userId: id,
    })

    // Paginating
    page = page ? page.toString() : '1'
    limit = limit ? limit.toString() : data.length.toString()

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    console.log({ pageNum, limitNum, skip, data })

    const handleLimit = (c: any) => {
      return data.filter((x: any, i: any) => {
        if (i <= c - 1) {
          return true
        }
      })
    }

    const handleSkip = (c: any) => {
      return data.filter((x: any, i: any) => {
        if (i > c - 1) {
          return true
        }
      })
    }

    data = handleSkip(skip)
    data = handleLimit(limitNum)

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send('Something went wrong.')
  }
})

handler.post(async (req, res) => {
  try {
    const { _id: userId, cartId, orders, address, payment } = req.body
    const cartData: any = await Cart.findById(cartId)

    const order = await Order.create({
      trackingNumber: +new Date(),
      userId: cartData.userId,
      cart: cartData,
      total: cartData.total,
      address: address,
      paymentMethod: payment.payment_type ?? payment,
      paymentInfo: payment ?? {},
      status: { title: 'process', content: '' },
    })

    await User.findByIdAndUpdate(userId, {
      orders: orders.push(order._id),
    })

    cartData.cartItems.map(
      async (item: any) =>
        await Product.findByIdAndUpdate(item._id, {
          $inc: {
            stock: -item.quantity,
            sold: item.quantity,
          },
        })
    )

    await Cart.findByIdAndUpdate(cartId, {
      cartItems: [],
      totalqty: 0,
      total: 0,
    })

    res.status(201).send('Place order successfully.')
  } catch (error) {
    console.log(error)
    res.status(500).send('Something went wrong.')
  }
})

export default connectDB(handler)
