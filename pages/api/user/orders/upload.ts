import connectDB from '@/lib/db';
import v2 from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
const cloudinary = v2.v2;


cloudinary.config({
    cloud_name: 'dk6ifbred',
    api_key: '569364457859222',
    api_secret: 'kzP7N79zdTdBeGMNsrO79lHbXqM',
    secure: true
});
const apiSecret = cloudinary.config().api_secret;
const handler = nc<NextApiRequest, NextApiResponse>()

handler.get((req, res) => {
    try {
        const timestamp = Math.round((new Date).getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
            folder: 'signed_upload_demo_form'
        }, apiSecret);

        res.status(200).send({ signature, timestamp, cloud_name: cloudinary.config().cloud_name, api_key: cloudinary.config().api_key });
    } catch (error) {
        res.status(500).send('Something went wrong.')
    }
})

// handler.post(async (req, res) => {
//   try {
//     const { _id: userId, cartId, address, payment } = req.body
//     const cartData: any = await Cart.findById(cartId)

//     const order: any = await Order.create({
//       userId: cartData.userId,
//       cart: cartData,
//       total: cartData.total,
//       address: address,
//       paymentMethod: payment.payment_type ?? payment,
//       paymentInfo: payment ?? {},
//       status: { title: 'process', content: '' },
//     })

//     await User.findByIdAndUpdate(userId, {
//       $push: {
//         orders: order._id,
//       },
//     })

//     cartData.cartItems.map(
//       async (item: any) =>
//         await Product.findByIdAndUpdate(item._id, {
//           $inc: {
//             stock: -item.quantity,
//             sold: item.quantity,
//           },
//         })
//     )

//     await Cart.findByIdAndUpdate(cartId, {
//       cartItems: [],
//       totalqty: 0,
//       total: 0,
//     })

//     res.status(201).send('Place order successfully.')
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('Something went wrong.')
//   }
// })

export default connectDB(handler)
