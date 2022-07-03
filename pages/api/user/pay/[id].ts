const midtransClient = require('midtrans-client')
import connectDB from '@/lib/db'
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

export default connectDB(handler)
