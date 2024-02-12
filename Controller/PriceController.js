import rechargeModel from "../Model/PaymentModel.js"
import PriceModel from "../Model/PriceModel.js"
import UserModel from "../Model/UserModel.js"


export const priceCreate = async (req, res) => {

    try {
        const newCoin = new PriceModel(req.body)
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

export const getPrice = async (req, res) => {
    try {
        const price = await PriceModel.find()
        if (price) {
            res.status(200).json({ "msg": "success", price })

        } else {
            res.status(404).json({ "msg": "item not found" })

        }
    } catch (error) {

    }
}

export const updatePrice = async (req, res) => {
   
    try {
        const price = await PriceModel.findOne({ _id: req.params.id })
        if (price) {
            const update = await PriceModel.findOneAndUpdate(
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



// payemnt create by user
export const createPaymentList = async(req,res)=>{
    try {
        const recharge = new rechargeModel(req.body)
        const createCoin = await recharge.save()

        if (createCoin) {
            res.status(201).json({ "msg": "created" })
        } else {
            res.status(501).json({ "msg": "server err not created" })
        }
    } catch (error) {
        res.status(200).json({ "msg": "can't update", error })
    }
}


export const getAllRecharge = async (req, res) => {
    try {
        const price = await rechargeModel.find()
        if (price) {
            res.status(200).json({ "msg": "success", price })

        } else {
            res.status(404).json({ "msg": "item not found" })

        }
    } catch (error) {

    }
}

export const updateRecharge = async (req, res) => {
   
    try {
        const price = await rechargeModel.findOne({ _id: req.params.id })
        if (price) {
            const update = await PriceModel.findOneAndUpdate(
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


// add cash to user wallet 

export const verifyRechargeAndAddCash = async(req,res)=>{
    const id = req.params.id // recharge id 
  
    try {
        const recharge = await rechargeModel.findOne({_id:id}).populate("userId")
        if(recharge){

            const update = await rechargeModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: {status:true} },
                { new: true }
            )

            if(update){

                const money = recharge.amount + recharge.userId.wallet
                const updateWallet = await UserModel.findByIdAndUpdate(
                    recharge.userId._id,
                    { $set: { wallet: money } },{ new: true }
                )
                if (updateWallet) {
                    const update = await rechargeModel.findOneAndUpdate(
                        { _id: req.params.id },
                        { $set: {amount:0,amount_added:recharge.amount} },
                        { new: true }
                    )
                    res.status(200).json({ "msg": "updated SuccessFully" })
                } else {
                    res.status(200).json({ "msg": "can't update" })
                }
            }


        }
        
        
    } catch (error) {
        res.status(200).json({ "msg": "can't update", error })
        
    }
}