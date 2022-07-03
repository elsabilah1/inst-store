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
    const data = await Order.find({
      userId: req.query.userId ?? undefined,
    })

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send('Something went wrong.')
  }
})

handler.post(async (req, res) => {
  try {
    const { _id: userId, cart_id, orders, payment } = req.body
    const cartData: any = await Cart.findById(cart_id)

    const order = await Order.create({
      userId: cartData.userId,
      cartItems: cartData.cartItems,
      total: cartData.total,
      paymentMethod: payment.payment_type ?? 'transfer va',
      paymentInfo: payment,
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

    await Cart.findByIdAndUpdate(cart_id, {
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
