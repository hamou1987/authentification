const express=require('express')
const User = require('../Model/User')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')

const userRouter = express.Router()

userRouter.post('/SignUp',async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const found = await User.findOne({email})
        if(found){ 
            return res.status(400).send({errors:[{msg:'already exist'}]})
        }
        const newUser = new User(req.body)
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)
        newUser.password = hashedPassword
        const payload = {id: newUser._id}
        let token = jwt.sign(payload, process.env.privateKey) 
        newUser.save()
        res.status(200).send({msg:'success',newUser,token})
    } catch (error) {
        res.status(500).send({errors:[{msg:'could not rgister'}]})
    }
})
userRouter.post('/SignIn',async(req,res)=>{
    try {
        const {email,password} = req.body
        const found = await User.findOne({email})
        if(!found){
            return res.status(400).send({errors:[{msg:'mail doesnt  exist'}]})
        }
        const match = await bcrypt.compare(password, found.password)
        if(!match){return res.status(400).send({errors:[{msg:'wrong password'}]})}
        const payload = {id : found._id}
        var token = jwt.sign(payload, process.env.privateKey)
        res.status(200).send({msg:'logged in ',found,token})

    } catch (error) {
        res.status(500).send({errors:[{msg:'could not logged in'}]})
        
    }
})
module.exports = userRouter