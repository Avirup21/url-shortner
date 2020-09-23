const Shortner=require('../models/shortner.js')
var sh = require("shorthash");
var useragent=require('express-useragent')
 
const shortnersController={}

shortnersController.list=(req,res)=>{
    Shortner.find()
    .then((shortner)=>{
        res.json(shortner)
    })
    .catch((err)=>{
        res.json(err)
    })
}

// shortnersController.show = (req, res) => {
//     const id = req.params.id
//     // const name=req.params.name
//     // Product.findOne({name:name})//When we want to return an obj
//     Shortner.findById(id)
//         .then((shortner) => {
//             if (shortner) {
//                 res.json(shortner)
//             } else {
//                 res.json({})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }
// shortnersController.findByName=(req,res)=>{
//     const name=req.params.name
//     //find-array filter,findOne-array find
//     Shortner.findOne({name:name})
//       .then((shortner)=>{
//           if(shortner){
//               res.json(shortner)
//           }
//           else{
//               res.json({})
//           }
//       })
//       .catch((err)=>{
//           res.json(err)
//       })
// }

shortnersController.create = (req, res) => {
    const body = req.body
    console.log(sh.unique(body.originalUrl));
    const hashedUrl=sh.unique(body.originalUrl)
    // const hash=`https://localhost:3000/${hashedUrl}`​
    
    const url = {
        originalUrl:body.originalUrl,
        title:body.title,
        created_at:body.created_at,
        hashedUrl:hashedUrl,
        // hash:hash
    };
    const shortner = new Shortner(url)
    shortner.save()
        .then((shortner) => {
            console.log(shortner)
        // res.redirect(url.originalUrl)
            res.json(shortner)
        })
        .catch((err) => {
            res.json(err)
        })
}
shortnersController.redirect=(req,res)=>{
    const hashedUrl=req.params.hash
    // const hashedUrl=sh.unique(body.originalUrl)
    // console.log(hashedUrl)
    
    const click={
        ipAddress:req.ip,
        browser:req.useragent.browser,
        platform:req.useragent.platform,
        isMobile:req.useragent.isMobile,
        isDesktop:req.useragent.isDesktop
    }
    // console.log(req)
    console.log(click)
   
    // Shortner.findOne({hashedUrl})

    Shortner.findOneAndUpdate({ hashedUrl }, { $push: { clicks: click}})
    .then((url) => {
        if(url) {
            res.redirect(url.originalUrl)
        } else { 
            res.json({ })
        }
    })
    // // console.log(url)
    // .then((code)=>{
    //     console.log(code)
    //     Shortner.findOneAndUpdate({_id:code._id},{$push:{clicks:click}})
    //     .then(()=>{
    //         if(code){
    //             return res.redirect(code.originalUrl)
    //         }
    //         else{
    //             res.status(404).json('Invalid')
    //         }
    //     })
       
    // })
    // .catch((err)=>{
    //     res.json(err)
    // })
}

// shortnersController.update = (req, res) => {
//     const id = req.params.id
//     const body = req.body
//     Shortner.findByIdAndUpdate(id, body, { new: true, runValidators: true })
//         .then((shortner) => {
//             if (shortner) {
//                 res.json(shortner)
//             } else {
//                 res.json({})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

// shortnersController.destroy = (req, res) => {
//     const id = req.params.id
//     Shortner.findByIdAndDelete(id)
//         .then((shortner) => {
//             if (shortner) {
//                 res.json(shortner)
//             } else {
//                 res.json({})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }
module.exports = shortnersController