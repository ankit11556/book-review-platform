const express = require('express');
const app = express();
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT;

app.use("/",(req,res)=>{
  res.send("API is running..");
})

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

app.listen(PORT, ()=>{
  console.log(`server is running att http://localhost:${PORT}`);
})
