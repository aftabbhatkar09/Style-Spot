import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User's name is required"],
    },
    email: {
      type: String,
      required: [true, "User's email is required"],
      unique: [true, "User's email must be unique"],
    },
    password: {
      type: String,
      required: [true, "User's password is required"],
    },
    isAdmin: {
      type: Boolean,
      required: [true, "User's admin status is required"],
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
