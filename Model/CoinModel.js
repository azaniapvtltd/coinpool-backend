import mongoose from "mongoose";
const userReq = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    })


const CoinSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        start_time: {
            type: String,
            required: true,
        },
        end_time: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        winner: {
            type: String,
            default:"no winner"
        },
        status: {
            type: Boolean,
            default:false
        },
        red: [userReq],
        black: [userReq],
        green: [userReq],
        active: {
            type: Boolean,
            default: false,
        },
        wallet: {
            type: Number,
            default: 0,
        },

    },

    { timestamps: true }
)

const CoinModel = mongoose.model("coin", CoinSchema);
export default CoinModel