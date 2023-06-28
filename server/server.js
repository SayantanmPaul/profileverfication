const express= require('express');
const cors= require('cors')
const morgan=require('morgan')

const app= express();

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')

const port= 8080


app.get('/', (req, res)=>{
    res.status(201).json("home get request")
})

app.listen(port, ()=>{
    console.log('server connected to: ', port);
})