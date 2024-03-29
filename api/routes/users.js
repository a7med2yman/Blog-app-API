const {verifyToken , verifyTokenAndAuthorization , verifyTokenAndAdmin} = require('./verifyToken')
const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt');

//UPDATE
router.put('/:id' , verifyTokenAndAuthorization ,  async (req , res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password , salt)
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id , {$set : req.body } ,{new : true })
            res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE 
router.delete('/:id' , verifyTokenAndAuthorization ,  async (req , res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(user){
            try{
                await Post.deleteMany({username : user.username })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json('user has been deleted');
            }catch(err){
                res.status(500).json(err)
            }
        }
    }catch(err){res.status(404).json('user is not found')}
})

//Get USER 
router.get('/:id' , verifyTokenAndAuthorization ,  async ( req ,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const { password , ...others}= user._doc ;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router