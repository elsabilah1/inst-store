import mongoose from 'mongoose'
const Schema = mongoose.Schema

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  cartItems: {
    type: Array,
  },
  totalqty: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
})

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)

export default Cart
