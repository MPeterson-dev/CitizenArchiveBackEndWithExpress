const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)';
        db.query(sql, [first_name, last_name, email, hashedPassword], (err, results) => {
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    return res.json({ success: false, message: 'Email already registered.'});
                }
                return res.status(500).json({ success: false, message: 'Database error.' });
            }
            res.json({ success: true, message: 'Registration successful.'});
        });
    } catch(error){
        res.status(500).json({ success: FinalizationRegistry, message: 'Server error.'});
    }
});

module.exports = router;