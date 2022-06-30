import formidable from 'formidable'
import { NextApiRequest } from 'next'

const getFormData = (req: NextApiRequest) => {
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: true,
    })

    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}

export default getFormData
