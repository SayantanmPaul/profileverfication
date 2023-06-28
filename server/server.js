import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connect from './database/connection.js';
import router from './router/route.js';

const app= express();

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
// block unauthorized stack
app.disable('x-powered-by')

const port= 8080
// for http get request
app.get('/', (req, res)=>{
    res.status(201).json("home get request")
})

// api routes
app.use('/api', router)

// start server when the database is connected
connect().then(()=>{
    try{
        app.listen(port, ()=>{
            console.log('server connected to: ', port);
        })
    }catch(error){
        console.log('connection failed');
    }
}).catch(error=>{
    console.log('invalid database connection!');
})
