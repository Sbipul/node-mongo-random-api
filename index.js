const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 7000;
// middlewares
app.use(cors());
app.use(express.json());


const usersRoute = require('./routes/v1/user.route')



// routes
app.use('/api/v1/user',usersRoute)












console.log('database connected')

app.get("/", (req, res) => {
  res.send("WELCOME TO ASSIGNMENT");
});

app.listen(port, () => {
  console.log("port is running on port", port);
});
