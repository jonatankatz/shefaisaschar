require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors")
const bodyParser = require('body-parser')
const app = express();
const server = http.Server(app);
const socketHandler = socket(server);
const dbConnection = require("./DB/db");
const port = process.env.PORT || 4000
const routes =require("./routes")




app.listen(port, () => { console.log(`now listening to ${port}`) })
app.use(cors())
app.use(bodyParser.json())
dbConnection()


app.use("/",routes)

