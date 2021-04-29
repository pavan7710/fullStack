const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { check, validationResult } = require("express-validator")


router.post('/signin' , [
    check("email" , "please include a valid email").isEmail(),
    check("password" , "password is required").exists()
] , async(req , res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email , password} = req.body

    try {
        let user = await User.findOne({email})

        if (!user){
            return res.status(400).json({
                errors : [{msg : "Invalid Credentials"}]
            })
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(400).json({
                errors : [{msg : "Invalid Credentials"}]
            })
        }

        const payload = {
            user : {
                id : user._id
            }
        }

        jwt.sign(payload , process.env.SCERET , {expiresIn : "5 days"} , (err ,token)=> {
            if (err) throw err 
            res.json({token})
        } )
    }catch(err) {
        console.log(err)
        res.status(500).send("Server error")
    }
})

module.exports = router