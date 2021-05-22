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

// post title and description 

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

// get all user 

app.get('/all' , async (req , res) => {
   try {
       const post = await Post.find()
       return res.json(post)
   } catch (error) {
       console.log(error)
       res.status(500).send(error.errors)
   }
})

// get single user 

app.get('/all/:id' , async (req , res) => {
    try {
        const singleUser = await Post.findById(req.params.id)
        return res.json(singleUser)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.errors)
    }
})
// delete Route 
app.delete('/delete/:id' , async (req , res )=> {
    try{
        await Post.findByIdAndDelete(req.params.id)
        return res.json("User Deleted")
    } catch (error) {
        console.log(error)
        res.status(500).send(error.errors)
    }
})

// update Route 

app.post('/update/:id' , (req , res) => {
    Post.findById(req.params.id)
    .then(data => {
        data.title = req.body.title,
        data.description = req.body.description
        data.save()
        .then(()=> res.json("Exercise Updated"))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

app.listen(port , err => {
    if (err) throw err 
    console.log(`server is running at ${port}`)
})