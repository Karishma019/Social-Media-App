import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not valid email`,
    },
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
  id: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
