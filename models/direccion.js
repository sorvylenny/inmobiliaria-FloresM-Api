import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  numberRef: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  department: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.Mixed, required: false },
  updatedBy: { type: mongoose.Schema.Types.Mixed, required: false },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  closet: { type: Number, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, red: 'OwnerDetails' }
}, { timestamps: true });


export default mongoose.model('Address', addressSchema);
