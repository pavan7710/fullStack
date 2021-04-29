const jwt = require("jsonwebtoken")

module.exports = function(req , res , next) {
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({msg : "NO token authorization denied"})
    }

    // verify token 

    try {
        jwt.verify(token , process.env.SCERET , (err , decoded)=> {
            if(err){
                return res.status(400).json({
                    msg : "TOken is not valid"
                })
            } else {
                console.log(decoded)
                console.log(decoded.user)
                req.user =decoded.user
                next()
            }
        })
    } catch (err){
        console .log(err)
        res.status(500).json({msg : "Server error"})
    }
}