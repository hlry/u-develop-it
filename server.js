const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the election database.');
});

// return all data in the candidates table
db.all(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// GET a single candidate
db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// Delete a candidate
db.run(`DELETE FROM candidates WHERE id = ?`, 1, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result, this, this.changes);
});

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

// start the Express.js server on port 3001 after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

