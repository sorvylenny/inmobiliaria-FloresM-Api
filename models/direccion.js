import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  department: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.Mixed, required: false },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.Mixed, required: false },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  closet: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Using export default instead of module.exports
export default mongoose.model('Address', addressSchema);
