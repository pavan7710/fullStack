const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/User')




router.post('/signup' , [
    check('firstname' , "Name is required").notEmpty(),
    check('email' , "Please include a valid email").isEmail(),
    check("password" , "please include a password with six or more characters").isLength({min : 6})
] , async(req ,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {firstname , email ,password , phonenumber } = req.body

    try{

        let user = await User.findOne({email})

        if (user){
            return res.status(400).json({
                errors : [{msg : "User already exists"}]
            })
        }

        user = new User({
            firstname , email ,password , phonenumber
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password , salt)

        console.log(password)

        await user.save()

        res.json({
            firstname , email , phonenumber
        })

    }catch (err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

module.exports = router