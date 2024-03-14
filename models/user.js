import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: {type: String, required: true},
  document: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return ['CC', 'CE', 'PPT', 'PAS', 'NIT', 'OTRO'].includes(value.split(' ')[0]) || /^\d+$/.test(value);
      },
      message: 'Formato de documento incorrecto'
    }
  },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: ['admin', 'empleado'], default: 'empleado' }],
  isActive: { type: Boolean, default: true}
});

export default mongoose.model('User', userSchema);
