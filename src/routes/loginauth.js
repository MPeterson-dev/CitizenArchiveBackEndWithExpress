const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, results) => {
        if(err) {
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
        if(results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.json({ success: false, message: 'Invalid credentials.' });
        }
    });
});

module.exports = router;