
import express from 'express'
import { AllGame, coinCreate, getCoin, getgameStatus, updateCoin, winnerList } from '../Controller/CoinController.js'
import { createPaymentList, getAllRecharge, getPrice, priceCreate, updatePrice, updateRecharge, verifyRechargeAndAddCash } from '../Controller/PriceController.js'

const router = express.Router()

router.post("/coin",coinCreate)
router.get("/coin",getCoin)
router.patch("/coin/:id",updateCoin)
// get game using game id
router.get('/game-result/:id',getgameStatus)

// winner list 
router.get('/winner/:id',winnerList)

// admin get all game
router.get('/all_game',AllGame)


// price route
router.post("/price",priceCreate)
router.get("/price",getPrice)
router.patch("/price/:id",updatePrice)


// payment recharge
router.post("/recharge",createPaymentList)
router.get("/recharge",getAllRecharge)
router.patch("/recharge/:id",updateRecharge)

// verify and add cash to user wallet
router.patch('/add_verify/:id',verifyRechargeAndAddCash)


export default router