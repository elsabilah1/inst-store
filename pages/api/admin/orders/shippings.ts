import connectDB from '@/lib/db'
import Shipping from '@/lib/models/Shipping'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (_, res) => {
  try {
    const data = await Shipping.find()
    res.status(200).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

handler.post(async (req, res) => {
  try {
    const { name } = req.body

    const data = await Shipping.create({ name })
    res.status(201).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
