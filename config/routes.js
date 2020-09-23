const express=require('express')
const router=express.Router()

const shortnersController=require('../app/controllers/shortnersController')

router.get('/api/urls',shortnersController.list)
router.post('/api/urls',shortnersController.create)
router.get('/api/:hash',shortnersController.redirect)
// router.get('/api/counter/:id',shortnersController.show)
// router.put('/api/counter/:id',shortnersController.update)
// router.delete('/api/counter/:id',shortnersController.destroy)

module.exports=router