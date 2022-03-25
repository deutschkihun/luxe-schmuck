import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const cartSchema = mongoose.Schema(
  {
    productname: {type: String, required: true},
    qty: {type: Number, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    product: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'Product'
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cart: [cartSchema],

  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
