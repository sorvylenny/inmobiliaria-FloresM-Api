import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: String, enum: ['admin', 'empleado'], default: 'empleado' }
});

export default mongoose.model('User', userSchema);
