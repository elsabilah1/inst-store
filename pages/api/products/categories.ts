import connectDB from '@/lib/db'
import Category from '@/lib/models/Category'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (_, res) => {
  try {
    const data = await Category.find()
    res.status(200).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
