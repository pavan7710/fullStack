const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()


app.use(express.json())


//DB connection 

mongoose.connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("DB connected")
})


//Routes 

app.use('/api' , require('./routes/api/user'))
app.use('/api' , require('./routes/api/auth'))


const port = 8000

app.listen(port , (err) =>{
    if (err) throw err 
    console.log(`port is running at ${port}`)
})