const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDb = require('./config/Db.config');
const cors = require('cors')

dotenv.config();

app.use(cors({
  origin: process.env.CLIENT_URI,
  credentials: true
}))
app.use(express.json());

const authRoutes = require('./routes/Auth.Routes');
const bookRoutes = require('./routes/Book.Routes');
const reviewRoutes = require('./routes/Review.Routes');

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/review", reviewRoutes)

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
