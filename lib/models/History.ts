import mongoose from 'mongoose'
const Schema = mongoose.Schema

const historySchema = new Schema(
  {
    trackingNumber: {
      type: Number,
      unique: true,
    },
    shippingService: {
      type: Object,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    image_proof: {
      type: String,
      required: false,
    },
    courier_name_cod: {
      type: String,
      required: false,
    },
    status: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
)

const History =
  mongoose.models.History || mongoose.model('History', historySchema)

export default History
