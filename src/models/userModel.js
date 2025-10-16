import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  nickname:{
        type:String,
        required:[true,"please provide a nickname"]
    },
  username:{
    type:String,
    required:[true,"Please provide a email"],
    unique:true,
  },
  email:{
    type:String,
    required:[true,"Please provide an email"],
    unique:true,
  },
  password:{
    type:String,
    required:[true,"Please provide a password"]
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
  forgotPasswordToken:String,
  forgotPasswordTokenExpiry:Date,
  verifyToken:String,
  verifyTokenExpiry:Date,
})
const User = mongoose.models.users || mongoose.model("User",userSchema);

export default User;