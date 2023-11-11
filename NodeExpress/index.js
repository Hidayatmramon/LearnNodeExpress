const express = require("express");
const cors = require('cors');
const mysql = require("mysql2");
const bookRoute = require("./routes/book");
const authorRoute = require("./routes/author");
const authRoute = require("./routes/auth");
const dbConfig = require("./config/database");
const pool = mysql.createPool(dbConfig)
const authenticateJWT = require('./middleware/auth') 

pool.on('error', (err) => {
    console.log(err);
})

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
         
app.use(cors());

app.get('/controllerparameter/:username/:jurusan/:rombel', (req, res) => {
    res.json(req.params)
})

app.get("/contohparams", (req,res) => {
    res.json(req.query);
})

app.get("/", (req, res) => {
  res.send("Hello World!");
  res.end();
});

app.use('/auth', authRoute);
app.use("/book", authenticateJWT, bookRoute);
app.use("/author", authorRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT} ...`);
});
