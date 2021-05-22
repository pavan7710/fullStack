const express = require("express")
const app = express()
const cors = require("cors")
const port = 9000
const connectDB = require('./config/db')
const Post = require('./models/Post')

/// connect Data base 

connectDB()


// intial middlewares
app.use(express())
app.use(cors())
app.use(express.json())


app.post('/' , async (req ,res)=> {

    const {title , description} = req.body
//    console.log(req.body)
   try {
    const user = new Post({
        title,
        description
    })

    await user.save()
   } catch (error) {
       console.log(error)
       res.status(500).send(error.errors)
       // res.status(500).send('Server Error)
   }
   res.send('Data added Successfully')
})



app.get('/all' , async (req , res) => {
   try {
       const post = await Post.find()
       return res.json(post)
   } catch (error) {
       console.log(error)
       res.status(500).send(error.errors)
   }
})


app.listen(port , err => {
    if (err) throw err 
    console.log(`server is running at ${port}`)
})