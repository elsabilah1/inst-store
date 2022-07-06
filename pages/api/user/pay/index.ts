const midtransClient = require('midtrans-client')
import connectDB from '@/lib/db'
import Cart from '@/lib/models/Cart'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MT_SERVERKEY,
})

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const data = await snap.transaction.status(req.query.id)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send('Something went wrong.')
  }
})

handler.post(async (req, res) => {
  try {
    const { name, email, phone, cartId } = req.body
    const cartData = await Cart.findById(cartId)
    const first_name = name.split(' ')[0]
    const last_name = name.split(' ')[name.split(' ').length - 1]

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: Date.now(),
        gross_amount: cartData.total,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
      },
    })

    res.status(201).send({ transaction })
  } catch (error) {
    console.log(error)
    res.status(500).send('Something went wrong.')
  }
})

export default connectDB(handler)
