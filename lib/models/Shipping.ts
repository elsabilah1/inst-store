import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ShippingSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

const Shipping =
  mongoose.models.Shipping || mongoose.model('Shipping', ShippingSchema)

export default Shipping

