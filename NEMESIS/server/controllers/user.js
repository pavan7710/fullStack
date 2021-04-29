const User = require('../models/User')

exports.getUserById = (req , res , next  , id)=> {
    User.findById(id).exec((err ,user)=> {
        if(err || !user){
            return res.status(400).json({
                error : "No User Was Found in DB"
            })
        }
        req.profile = user 
        next()
    })
}

exports.getUser = (req ,res) => {
    req.profile.password = undefined
    return res.json(req.profile)
}

exports.updateUser = (req , res)=> {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true , userFindAndModify : false},
        (err , user)=> {
            if(err){
                return res.status(400).json({
                    error : "you are not authorized to update this user"
                })
            }
            user.password = undefined
            res.json(user)

        }

    )
}