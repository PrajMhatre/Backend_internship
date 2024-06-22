const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect } = require('./db');
const router = require('./Routes/index');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());



app.get("/",(req,res)=>{
  res.send("Welcome to my API");
})
app.use("/api", router)
connect();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
