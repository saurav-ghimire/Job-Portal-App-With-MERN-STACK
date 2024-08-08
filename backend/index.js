import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
  const corsOptions = {
    origin:'http://localhost:3000/',
    credentials:true
}
app.use(cors(corsOptions))


const PORT = 4000;
app.listen(PORT || 4000, ()=>{
  console.log(`Server running at PORT : ${PORT}`);
})