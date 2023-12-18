// const express=require("express");
// const router=express.Router();
// const Order=require("../models/Orders");
// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0,0,{Order_date:req.body.order_date})
//     console.log("1231242343242354",req.body.email)

    
//     let eId = await Order.findOne({ 'email': req.body.email })    
//     console.log(eId)
//     if (eId===null) {
//         try {
//             console.log(data)
//             console.log("1231242343242354",req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data:[data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 { $push:{order_data: data} }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// })

// module.exports=router;
const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    try {
        const data = req.body.order_data;
        const orderDate = req.body.order_date;
        const userEmail = req.body.email;

        const existingOrder = await Order.findOne({ email: userEmail });

        if (!existingOrder) {
            
            await Order.create({
                email: userEmail,
                order_data: [{ Order_date: orderDate }, ...data],
            });
        } else {
            
            existingOrder.order_data.push({ Order_date: orderDate }, ...data);
            await existingOrder.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});
router.post('/myorderData', async (req, res) =>{
try{
let myData=await Order.findOne({'email':req.body.email})
res.json({orderData:myData})
}catch(err){
    res.send(err);
    console.log(err);
}
})
module.exports = router;

