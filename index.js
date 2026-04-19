require('dotenv').config()
const express = require('express');
const { Client } = require('pg');
const app = express();
const PORT = 3000;
app.use(express.json());


const pgc = new Client(process.env.DATABASE_URL);
pgc.connect();

app.get("/" , (req, res) => {
    res.json({
        message: "Server is up and running!!!"
    })
})

app.get("/users" , async (req, res) => {
    const response = await pgc.query("SELECT * FROM users;");
    res.json(response.rows);
})

app.post("/add" , async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sqlQuery = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    const response = await pgc.query(sqlQuery);
    res.json(response);
})


app.listen(PORT, () => {
    console.log(`backend is up at http://localhost:${PORT}`)
})
