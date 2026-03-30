require('dotenv').config();
const express = require("express");
const { Client } = require("pg");
const app = express();
const PORT = 3000;
const DB_URL = process.env.DB_URL;
app.use(express.json());

const pgc = new Client(DB_URL)
pgc.connect(); // db connection established!

app.get("/" , async (req,res) => {
    const response = await pgc.query(`SELECT * FROM users;`);
    res.json({
        rowcount: response.rowCount,
        data: response.rows
    });
})

// app.post('/' , async(req,res) => {
//     const response = await pgc.query("DELETE FROM users;");
//     res.json({message: "deleted!"});
// })

app.get("/data", async (req,res) => {
    const response = await pgc.query("SELECT * FROM users;");
    res.json(response.rows);
})

app.post("/add" , async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlQuery = `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`;

    const response = await pgc.query(sqlQuery);
    res.send(response);
})

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
})