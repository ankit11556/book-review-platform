const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDb = require('./config/Db.config')

dotenv.config()

app.use(express.json())

const authRoutes = require('./routes/Auth.Routes')

app.use("/api/auth",authRoutes)

app.get("/",(req,res)=>{
  res.send("API is running..");
})

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

const PORT = process.env.PORT;

connectDb().then(()=>{
app.listen(PORT, ()=>{
  console.log(`server is running att http://localhost:${PORT}`);
})
})
