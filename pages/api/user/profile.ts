import connectDB from '@/lib/db'
import User from '@/lib/models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const user = await User.findById(req.query.id)
    res.status(200).send({ user })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
