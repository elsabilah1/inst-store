import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: {
      type: String,
      required: true,
    },
    cart: {
      type: Object,
    },
    total: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentInfo: {
      type: Object,
    },
    status: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order
