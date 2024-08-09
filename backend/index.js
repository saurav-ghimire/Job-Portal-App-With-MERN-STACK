import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express();
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
dotenv.config({});

connectDB()
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:3000/',
    credentials:true
}
app.use(cors(corsOptions))

app.get('/', (req,res) => {
  return res.json({
    success : true,
    msg : 'I am the route'
  })
})

app.listen(process.env.PORT || 4000, ()=>{
  console.log(`Server running at PORT : ${process.env.PORT}`);
})