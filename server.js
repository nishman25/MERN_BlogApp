const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog.model');
const dotenv = require('dotenv').config();
const PORT = 5000;

// to resolve cors errors
app.use(cors());
app.use(express.json());

app.post('/create-blog', async (req,res)=>{
    try{
        const data = req.body;
        const blog = new Blog(data);
        const response = await blog.save();
        console.log(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
})

// testing endpoint 
// app.get('/', (req,res)=> {
//    res.send("Server started on PORT" +' '+ PORT);
// });

mongoose.connect(process.env.DB_URI).then(()=>{
    //console.log(result);
    app.listen(PORT, ()=>{
        console.log(`Server is listening on PORT: ${PORT}`);
    })
}).catch(err=>{
    console.log(err);
})




