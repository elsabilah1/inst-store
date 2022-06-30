import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  cartItems: {
    type: Array,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentInfo: {
    type: Object,
    required: true,
  },
  status: {
    title: 'process order',
    content: '',
  },
})

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order
