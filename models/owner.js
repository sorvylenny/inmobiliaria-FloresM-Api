import mongoose from 'mongoose';

const ownerDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const OwnerDetails = mongoose.model('OwnerDetails', ownerDetailsSchema);

export default OwnerDetails;
