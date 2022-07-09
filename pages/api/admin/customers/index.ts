import connectDB from '@/lib/db'
import User from '@/lib/models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const customers = await User.find({ role: 0 })
    res.status(200).send({ customers })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
