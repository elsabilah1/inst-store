import connectDB from '@/lib/db'
import Product from '@/lib/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    let { category, keyword, sortBy, page, limit } = req.query
    let data = await Product.find()

    // Filtering
    if (keyword !== '' && keyword !== undefined)
      data = data.filter((p: any) => p.name.toLowerCase().includes(keyword))

    if (category !== 'all' && category !== '' && category !== undefined)
      data = data.filter((p: any) => p.category === category)

    // Sorting
    if (sortBy !== '' && sortBy !== undefined) {
      if (sortBy === 'best seller')
        data = data.sort(
          (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
        )

      if (sortBy === 'lowest price')
        data = data.sort(
          (a: { sellingPrice: number }, b: { sellingPrice: number }) =>
            a.sellingPrice - b.sellingPrice
        )

      if (sortBy === 'highest price')
        data = data.sort(
          (a: { sellingPrice: number }, b: { sellingPrice: number }) =>
            b.sellingPrice - a.sellingPrice
        )

      if (sortBy === 'a-z')
        data = data.sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        )

      if (sortBy === 'z-a')
        data = data.sort((a: { name: string }, b: { name: string }) =>
          b.name.localeCompare(a.name)
        )
    }

    // Paginating
    page = page ? page.toString() : '1'
    limit = limit ? limit.toString() : '10'

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

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

    return res.status(200).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
