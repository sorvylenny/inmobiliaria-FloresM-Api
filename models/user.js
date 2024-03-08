import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: {type: String, required: true},
  password: { type: String, required: true },
  roles: [{ type: String, enum: ['admin', 'empleado'], default: 'empleado' }],
  isActive: { type: Boolean, default: true}
});

export default mongoose.model('User', userSchema);
