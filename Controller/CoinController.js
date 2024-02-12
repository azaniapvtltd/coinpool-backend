import CoinModel from "../Model/CoinModel.js"
import UserModel from "../Model/UserModel.js"


export const coinCreate = async (req, res) => {

    try {
        const newCoin = new CoinModel(req.body)
        const createCoin = await newCoin.save()

        if (createCoin) {
            res.status(201).json({ "msg": "created" })
        } else {
            res.status(501).json({ "msg": "server err not created" })
        }
    } catch (error) {
        res.status(501).json({ "msg": "server err" })

    }

}

export const getCoin = async (req, res) => {
    try {
        const coinData = await CoinModel.findOne({ status: false })
        if (coinData) {
            res.status(200).json({ "msg": "success", coinData })

        } else {
            res.status(404).json({ "msg": "item not found" })

        }
    } catch (error) {

    }
}

// get game status
export const getgameStatus = async (req, res) => {
    try {
        const coinData = await CoinModel.findOne({ _id: req.params.id })
        if (coinData) {
            res.status(200).json({ "msg": "success", coinData })

        } else {
            res.status(404).json({ "msg": "item not found" })

        }
    } catch (error) {

    }
}

export const updateCoin = async (req, res) => {
  
    try {
        const coin = await CoinModel.findOne({ _id: req.params.id })
        if (coin) {
            const update = await CoinModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )

            if (update) {
                res.status(200).json({ "msg": "updated SuccessFully" })
            } else {
                res.status(200).json({ "msg": "can't update" })
            }
        }
    } catch (error) {
        res.status(200).json({ "msg": "can't update", error })

    }

}



// winner list 
export const winnerList = async(req,res)=>{
    try {
        // find game
        const game = await CoinModel.findOne({_id:req.params.id})
        if(game.winner === "black"){
            const userIdAr = game?.black?.map(obj => obj.userId)
            const userList = await UserModel.find({_id:{$in:userIdAr}})
            res.status(200).json({ "msg": "success",userList })
        }
    } catch (error) {
        res.status(200).json({ "msg": "can't find", error })
    }
}

export const AllGame = async(req,res)=>{
    try {
        const game = await CoinModel.find()
        if(game){
            res.status(200).json({ "msg": "success",game })
        }
    } catch (error) {
        res.status(200).json({ "msg": "can't find", error })
        
    }
}