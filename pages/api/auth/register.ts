import connectDB from '@/lib/db'
import Cart from '@/lib/models/Cart'
import User from '@/lib/models/User'
import getFormData from '@/utils/getFormData'
import { hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import nc from 'next-connect'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  try {
    const fData = await getFormData(req)
    const { name, username, email, phone, address, password } = fData.fields
    const hashPass = await hash(password, 10)
    const imageUrl = process.env.EMPTY_AVATAR_URL
    const imageId = process.env.EMPTY_AVATAR_ID

    if (req.query.role === '0') {
      const newUser = await User.create({
        name,
        username,
        email,
        phone,
        address,
        imageUrl,
        imageId,
        password: hashPass,
        role: 0,
      })

      const cart = await Cart.create({ userId: newUser._id })
      await User.findByIdAndUpdate(newUser._id, { cartId: cart._id })

      return res.status(201).send({ message: 'Account created successfully.' })
    } else {
      const session = await getSession({ req })

      if (session?.role === 1) {
        console.log('hit')

        await User.create({
          name,
          username,
          email,
          phone,
          address,
          imageUrl,
          imageId,
          password: hashPass,
          role: req.query.role,
        })

        return res
          .status(201)
          .send({ message: 'Account created successfully.' })
      }

      return res.status(400).send({ message: 'Unauthorized' })
    }
  } catch (error: any) {
    console.log(error)

    res.status(404).send({ ...error, message: 'Account already registered.' })
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default connectDB(handler)
