import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  department:{type: String, required: true},
  city: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Using export default instead of module.exports
export default mongoose.model('Address', addressSchema);
