import mongoose from "mongoose";


const rechargeSchema = mongoose.Schema(
    {
        transId:{
            type:String,required:true
        },
        amount:{
            type:Number,required:true
        },
        amount_added:{
            type:Number,default:0
        },
        status:{
            type:Boolean,
            default:false
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Users"
        }
    }
)

const rechargeModel = mongoose.model("payment_recharge",rechargeSchema);
export default rechargeModel