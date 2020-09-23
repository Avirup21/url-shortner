const mongoose=require('mongoose')

const Schema=mongoose.Schema
const shortnerSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    originalUrl: {
        type : String,
        required : true
    },
    hashedUrl : {
        type : String
    },
    // hash:{
    //     type:String
    // },
    created_at:{
        type:Date,
        default:Date.now
    },
    clicks:[{
        // clickDateTime:{
        //     type:Date.now
        // },

        ipAddress:{
            type:String
        },
        browser:{
            type:String
        },
        platform:{
            type:String
        },
        isMobile:{
            type:String
        },
        isDesktop:{
            type:String
        }
    }]
})
const Shortner=mongoose.model('Shortner',shortnerSchema)


module.exports=Shortner