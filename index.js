const express=require('express')
const app=express()
const router=require('./config/routes')
const useragent = require('express-useragent');
const configureDB=require('./config/database')
const port=3055

configureDB()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('url app')  
})
app.use(useragent.express());
app.use(router)

app.listen(port,()=>{
    console.log('Server runing on port',port)
})
