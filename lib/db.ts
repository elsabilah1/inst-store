import mongoose from 'mongoose'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const connectDB =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.DB_URI!)
    }

    return handler(req, res)
  }

export default connectDB
